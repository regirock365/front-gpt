This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Webhook Endpoint

`api/front-gpt` is the target webhook you would [point to in a Front rule](https://help.front.com/t/x129yt/how-to-enable-and-use-the-webhooks-integration). I've created a rule that gets triggered whenever a new comment is added with the body starting with "gpt-response". I then send it to the webhook, where the comment is parsed and a response is generated.

Any text after "gpt-response" is used as an instruction or consideration in generating the response. So, for example, I could write "gpt-response I'm no longer interested in attending the event, but I want to thank them for considering me".

## Possible Issues

You will need to set the environment variables `FRONT_API_TOKEN`, `FRONT_API_SECRET` and `OPENAI_API_KEY`.

If you find that you are unable to successfully request the comments in the conversation, make sure you have checked the "Allow access to my individual resources via the API" setting for the relevant user. This issue took me a while to diagnose, so hopefully I've saved you some time.
