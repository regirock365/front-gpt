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
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="text-center p-24">
        <h1>FrontGPT</h1>
        <p>Using OpenAI GPT-3 to help you draft responses and more in Front</p>
      </main>
    </>
  );
}
