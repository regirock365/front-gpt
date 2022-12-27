This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Webhook Endpoint

`api/front-gpt` is the target webhook you would [point to in a Front rule](https://help.front.com/t/x129yt/how-to-enable-and-use-the-webhooks-integration). I've created a rule that gets triggered whenever a new comment is added with the body starting with "gpt-".

The endpoint responds to a few commands:

### gpt-response

"gpt-response" is the command to generate a draft response in a conversation. Any text after "gpt-response" is used as an instruction or consideration in generating the response. So, for example, I could write "gpt-response I'm no longer interested in attending the event, but I want to thank them for considering me".

### gpt-snooze

A natural language snooze, the "gpt-snooze" is for those times you would have had to manually snooze the conversation to a date/time not in Fronts default suggestions. Click "Day & Time", scroll to and select the date, select the time, then confirm. Yuck.

Now you can just type "gpt-snooze the first Monday of Feb next year", et voilà. It's Feb 6 2023, in case you were wondering.

### gpt-hello

"gpt-hello" is a command that introduces FrontGPT.

### gpt-help

As the name suggests, "gpt-help" is the help command. It lists all the available commands, with a brief description and example. Simples.

## Possible Issues

You will need to set the environment variables `FRONT_API_TOKEN`, `FRONT_API_SECRET` and `OPENAI_API_KEY`.

If you find that you are unable to successfully request the comments in the conversation, make sure you have checked the "Allow access to my individual resources via the API" setting for the relevant user. This issue took me a while to diagnose, so hopefully I've saved you some time.
