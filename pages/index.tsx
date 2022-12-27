import { Github } from "@styled-icons/bootstrap";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <header className="flex justify-between">
        <div className="flex p-2 items-center justify-center">
          <a
            href="https://regirock365.com/"
            className="block rounded-full bg-gradient-to-tr from-yellow-500 via-amber-500 to-red-500 p-0.5"
            target="_blank"
            rel="noreferrer"
          >
            <img
              src="https://pbs.twimg.com/profile_images/1291555016155619329/9uGuMPfy_400x400.jpg"
              alt="Law AI"
              className="h-12 w-12 rounded-full"
            />
          </a>
        </div>

        <div />

        <div />
      </header>

      <main className="flex flex-col items-center justify-center py-24 sm:px-12 md:py-48 md:px-24 px-6 lg:px-48">
        <h1 className="flex items-center gap-1 justify-center text-6xl md:text-7xl">
          FrontGPT
          <img src="/favicon.svg" alt="" className="h-12 md:h-14" />
        </h1>
        <p className="text-2xl mt-2 text-gray-600 font-medium max-w-xl text-center">
          Your GPT-3 Powered Assistant in Front
        </p>
        <div className="flex mt-8 items-center justify-center gap-2">
          <a
            href="https://github.com/regirock365/front-gpt"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-700 hover:scale-110 hover:text-black transition rounded-full text-lg"
          >
            <Github className="w-12" />
          </a>
        </div>
      </main>

      {/* <span className="pointer-events-none absolute left-[-20%] -top-24 hidden h-[640px] w-[640px] rounded-full bg-radial-gradient from-front to-front/0 opacity-[.25] lg:inline-flex" /> */}
      {/* <span className="left-1/2 top-64 pointer-events-none -translate-x-1/2 absolute inline-flex h-[640px] w-[640px] scale-50 rounded-full bg-radial-gradient from-front to-front/0 opacity-[.25] sm:scale-75 lg:scale-100" /> */}
    </>
  );
}
