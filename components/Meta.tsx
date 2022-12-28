import Head from "next/head";

interface MetaProps {}

const Meta: React.FC<MetaProps> = () => (
  <Head>
    <meta charSet="utf-8" />
    <meta httpEquiv="x-ua-compatible" content="ie=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />

    <title>FrontGPT | Your GPT-3 Powered Assistant in Front</title>

    {/* <!-- Primary Meta Tags --> */}
    <meta name="title" content="FrontGPT" />
    <meta name="description" content="Your GPT-3 Powered Assistant in Front" />
    <link rel="icon" href="/favicon.svg" />
    <meta name="theme-color" content="#ff1c5e" />

    <script
      defer
      data-domain="frontgpt.com"
      src="https://plausible.io/js/script.js"
    />

    {/* <!-- Open Graph / Facebook --> */}
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://www.frontgpt.com/" />
    <meta property="og:title" content="FrontGPT" />
    <meta
      property="og:description"
      content="Your GPT-3 Powered Assistant in Front"
    />
    <meta
      property="og:image"
      content="https://res.cloudinary.com/projectgroceries/image/upload/v1672208359/FrontGPT_Card_Image_bpydxv.png"
    />

    {/* <!-- Twitter --> */}
    <meta property="twitter:card" content="summary_large_image" />
    <meta property="twitter:url" content="https://www.frontgpt.com/" />
    <meta property="twitter:title" content="FrontGPT" />
    <meta
      property="twitter:description"
      content="Your GPT-3 Powered Assistant in Front"
    />
    <meta
      property="twitter:image"
      content="https://res.cloudinary.com/projectgroceries/image/upload/v1672208359/FrontGPT_Card_Image_bpydxv.png"
    />
  </Head>
);

export default Meta;
