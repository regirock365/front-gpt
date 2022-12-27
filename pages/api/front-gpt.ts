import crypto from "crypto";
import { NextApiRequest, NextApiResponse } from "next";
import {
  FrontSearchMessagesReturn,
  FrontWebhookPayload,
  GPT3Data,
} from "../../lib/types";

import { extractMainEmailText, sortByFn } from "../../lib/util";

// A Next.js API route for Front webhooks

export type Data = { success: boolean };

export default async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  try {
    // validate the request
    const signature = req.headers["x-front-signature"] as string;
    const hash = crypto
      .createHmac("sha1", process.env.FRONT_API_SECRET ?? "")
      .update(JSON.stringify(req.body))
      .digest("base64");

    if (!crypto.timingSafeEqual(Buffer.from(hash), Buffer.from(signature))) {
      throw new Error("Bad signature");
    }

    const body: FrontWebhookPayload = req.body;

    // make sure it's a comment
    if (body.type !== "comment") {
      throw new Error("Not a comment");
    }

    //   get the conversation id
    const conversationId = body.conversation.id;

    console.log("conversationId", conversationId);

    // check what the command was
    const comment: string = body.target.data.body;
    const command = comment.split(" ")[0];

    console.log("posted_at", body.target.data.posted_at);
    console.log("command", command);

    if (command === "gpt-response") {
      // get the instructions, if any
      let instructions: string | undefined = comment
        .replace("gpt-response", "")
        .trim();

      console.log("instructions", instructions);

      // get all messages in the conversation
      let conversation_messages: FrontSearchMessagesReturn = await fetch(
        `https://api2.frontapp.com/conversations/${encodeURIComponent(
          conversationId
        )}/messages`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${process.env.FRONT_API_TOKEN}`,
          },
        }
      )
        .then((response) => response.json())
        .catch((err) => console.error(err));

      const messages = sortByFn(
        conversation_messages._results,
        (result) => result.created_at
      )
        .filter((result) => result.type === "email")
        .filter((result) => result.draft_mode !== "private")
        .map((result) => {
          // just select the main text, filtering out the signature, etc.
          const text = extractMainEmailText(result.text);

          return {
            id: result.id,
            text,
            name:
              result.recipients.find((recipient) => recipient.role === "from")
                ?.name ||
              result.recipients.find((recipient) => recipient.role === "from")
                ?.handle ||
              "Unknown",
          };
        });

      // create the prompt
      const prompt = `Assistant is a large language model trained by OpenAI.
  
  Assistant is designed to be able to assist with a wide range of tasks, from answering simple questions to providing in-depth explanations and discussions on a wide range of topics. As a language model, Assistant is able to generate human-like text based on the input it receives, allowing it to engage in natural-sounding conversations and provide responses that are coherent and relevant to the topic at hand.
  
  Assistant is constantly learning and improving, and its capabilities are constantly evolving. It is able to process and understand large amounts of text, and can use this knowledge to provide accurate and informative responses to a wide range of questions. Additionally, Assistant is able to generate its own text based on the input it receives, allowing it to engage in discussions and provide explanations and descriptions on a wide range of topics.
  
  Overall, Assistant is a powerful tool that can help with a wide range of tasks and provide valuable insights and information on a wide range of topics. Whether you need help with a specific question or just want to have a conversation about a particular topic, Assistant is here to assist.
  
  <-user->
  help me, Hemedi, write a response email, given the following thread. Note, [name] signifies a new email in the thread and {note} signifies instructions or considerations for the response email.
  ${messages
    .map(
      (message) => `[${message.name}]
  ${message.text}
  
  `
    )
    .join("")}
  ${instructions ? `{${instructions}}` : ""}
  
  <-assistant->`;

      //   send the messages to GPT-3
      let gpt_data: GPT3Data = await fetch(
        `https://api.openai.com/v1/completions`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          },
          body: JSON.stringify({
            model: "text-davinci-003",
            prompt,
            max_tokens: 256,
            temperature: 0.7,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
            // stop: ["\n"],
          }),
        }
      )
        .then((response) => response.json())
        .catch((err) => console.error(err));

      //   parse the response from GPT-3
      const gpt_response =
        gpt_data.error ??
        gpt_data.choices[0].text
          .split("\n")
          .filter((line) => line.length > 0)
          .map((line) => line.trim())
          .join("\n");

      // add comment to conversation with the message ids
      let data = await fetch(
        `https://api2.frontapp.com/conversations/${encodeURIComponent(
          conversationId
        )}/comments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${process.env.FRONT_API_TOKEN}`,
          },
          body: JSON.stringify({
            body: `FrontGPT Responded:\n\n${gpt_response}`,
          }),
        }
      )
        .then((response) => response.json())
        .catch((err) => console.error(err));
    } else if (command === "gpt-hello") {
      // add comment to the conversation introducing the bot
      let data = await fetch(
        `https://api2.frontapp.com/conversations/${encodeURIComponent(
          conversationId
        )}/comments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${process.env.FRONT_API_TOKEN}`,
          },
          body: JSON.stringify({
            body: `Hello! I'm FrontGPT, a bot that uses GPT-3 to help you out in Front. To get started, just type \`gpt-response\` in a comment and I'll get to work!`,
          }),
        }
      )
        .then((response) => response.json())
        .catch((err) => console.error(err));
    } else if (command === "gpt-help") {
      // add comment to the conversation with the help message
      let data = await fetch(
        `https://api2.frontapp.com/conversations/${encodeURIComponent(
          conversationId
        )}/comments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${process.env.FRONT_API_TOKEN}`,
          },
          body: JSON.stringify({
            body: `FrontGPT Help:\n\nTo get started, just type \`gpt-response\` in a comment and I'll get to work!`,
          }),
        }
      )
        .then((response) => response.json())
        .catch((err) => console.error(err));
    } else if (command === "gpt-snooze") {
      // get the snooze time instructions, if any
      let snoozeTime = comment.replace("gpt-snooze", "").trim();

      // if no snooze time was provided, use the default
      if (!snoozeTime) {
        snoozeTime = "in 5 minutes";
      }

      // transform the snooze time into a date/time string using GPT-3
      let gpt_data: GPT3Data = await fetch(
        `https://api.openai.com/v1/completions`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          },
          body: JSON.stringify({
            model: "text-davinci-003",
            prompt: `The date string for the current date/time is ${new Date().toISOString()}. Given the snooze input "${snoozeTime}", the appropriate string is`,
            max_tokens: 256,
            temperature: 0,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
            stop: ["\n"],
          }),
        }
      )
        .then((response) => response.json())
        .catch((err) => console.error(err));

      // parse the response from GPT-3
      const gpt_response = gpt_data.error
        ? undefined
        : gpt_data.choices[0].text
            .trim() // remove leading/trailing whitespace
            .replace(/\.$/, "") // remove trailing period
            .replace(/"/g, ""); // remove quotes

      // abort if there was an error, or the string is not a valid date
      if (!gpt_response || isNaN(Date.parse(gpt_response))) {
        let data = await fetch(
          `https://api2.frontapp.com/conversations/${encodeURIComponent(
            conversationId
          )}/comments`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: `Bearer ${process.env.FRONT_API_TOKEN}`,
            },
            body: JSON.stringify({
              body: `FrontGPT could not parse the snooze time. Please try again.`,
            }),
          }
        )
          .then((response) => response.json())
          .catch((err) => console.error(err));
      } else {
        // add comment to the conversation with the snooze message
        let data = await fetch(
          `https://api2.frontapp.com/conversations/${encodeURIComponent(
            conversationId
          )}/comments`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: `Bearer ${process.env.FRONT_API_TOKEN}`,
            },
            body: JSON.stringify({
              body: `FrontGPT will snooze this conversation until ${gpt_response}.`,
            }),
          }
        )
          .then((response) => response.json())
          .catch((err) => console.error(err));

        // @ts-ignore
        console.log("participants", body.conversation.participants);
        console.log("recipient", body.conversation.recipient);

        // snooze the conversation
        const teammate_id =
          body.conversation.tags[0]._links.related.owner
            .match(/\/\w+$/g)?.[0]
            .replace(/\//g, "") || "";

        let snooze_data = await fetch(
          `https://api2.frontapp.com/conversations/${encodeURIComponent(
            conversationId
          )}/reminders`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: `Bearer ${process.env.FRONT_API_TOKEN}`,
            },
            body: JSON.stringify({
              // this is a hack to get the teammate ID
              // I'm not sure why the API doesn't return it
              teammate_id:
                body.conversation.tags[0]._links.related.owner
                  .match(/\/\w+$/g)?.[0]
                  .replace(/\//g, "") || "",
              scheduled_at: Date.parse(gpt_response) / 1000,
            }),
          }
        )
          .then((response) => response.json())
          .catch((err) => console.error(err));

        console.log("teammate_id", teammate_id);
        console.log("snooze_data", snooze_data);
      }
    }

    res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);

    res.status(500).json({ success: false });
  }
};
