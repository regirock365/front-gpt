import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>
          FrontGPT Using OpenAI GPT-3 to help you draft responses and more in
          Front
        </title>
        <meta
          name="description"
          content="Using OpenAI GPT-3 to help you draft responses and more in Front"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <main className="text-center p-24">
        <h1 className="flex items-center gap-2 justify-center">
          FrontGPT
          <img src="/favicon.svg" alt="" className="h-10" />
        </h1>
        <p>Using OpenAI GPT-3 to help you draft responses and more in Front</p>
      </main>
    </>
  );
}
