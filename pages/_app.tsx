import "../styles/globals.css";
import type { AppProps } from "next/app";
import Meta from "../components/Meta";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Meta />
      <Component {...pageProps} />
    </>
  );
}
