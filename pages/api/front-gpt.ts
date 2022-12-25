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
    }

    res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);

    res.status(500).json({ success: false });
  }
};
