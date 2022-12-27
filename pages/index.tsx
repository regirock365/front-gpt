import { Check, CheckSquare, Github, Square } from "@styled-icons/bootstrap";
import Head from "next/head";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="flex justify-between">
        <div className="flex items-center justify-center p-2">
          <a
            href="https://regirock365.com/"
            className="block rounded-full bg-gradient-to-tr from-yellow-500 via-amber-500 to-red-500 p-0.5"
            target="_blank"
            rel="noreferrer"
          >
            <img
              src="https://pbs.twimg.com/profile_images/1291555016155619329/9uGuMPfy_400x400.jpg"
              alt="regirock365"
              className="h-12 w-12 rounded-full"
            />
          </a>
        </div>

        <div />

        <div />
      </header>

      <main className="flex flex-1 flex-col items-center justify-start py-24 px-6 sm:px-12 md:py-48 md:px-24 lg:px-48">
        <h1 className="flex items-center justify-center gap-1 text-6xl md:text-7xl">
          FrontGPT
          <img src="/favicon.svg" alt="" className="h-12 md:h-14" />
        </h1>
        <p className="mt-2 max-w-xl text-center text-2xl font-medium text-gray-600">
          Your GPT-3 Powered Assistant in{" "}
          <a
            href="https://front.com/"
            target="_blank"
            rel="noreferrer"
            className="text-blue-500 transition hover:underline"
          >
            Front
            <sup className="group">
              *
              <span className="absolute bottom-full -right-28 hidden w-56 rounded bg-gray-900 p-1 text-xs text-white shadow group-hover:block">
                Front is a customer communication platform for teams.
              </span>
            </sup>
          </a>
        </p>

        {/* Feature progress */}
        <ul className="mt-8 flex flex-col gap-4 text-xl text-gray-800">
          <li className="flex items-center gap-2">
            <CheckSquare className="w-8" />
            <p className="">Draft Email Responses</p>
          </li>
          <li className="flex items-center gap-2">
            <CheckSquare className="w-8" />
            <p className="">Natural Language Snooze</p>
          </li>
          <li className="flex items-center gap-2 text-gray-400">
            <Square className="w-8" />
            <p className="">More Soon...</p>
          </li>
        </ul>

        <div className="mt-8 flex items-center justify-center gap-2">
          <a
            href="https://github.com/regirock365/front-gpt"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-full text-2xl text-gray-700 transition hover:scale-105 hover:text-black"
          >
            See on GitHub
            <Github className="w-8" />
          </a>
        </div>
      </main>

      {/* <span className="pointer-events-none absolute left-[-20%] -top-24 hidden h-[640px] w-[640px] rounded-full bg-radial-gradient from-front to-front/0 opacity-[.25] lg:inline-flex" /> */}
      {/* <span className="left-1/2 top-64 pointer-events-none -translate-x-1/2 absolute inline-flex h-[640px] w-[640px] scale-50 rounded-full bg-radial-gradient from-front to-front/0 opacity-[.25] sm:scale-75 lg:scale-100" /> */}

      <footer>
        <div className="flex items-center justify-center gap-2 p-4 text-gray-600">
          <p className="">Made with ❤️ by</p>
          <a
            href="https://twitter.com/regirock365"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 transition hover:underline"
          >
            @regirock365
          </a>
        </div>
      </footer>
    </div>
  );
}
