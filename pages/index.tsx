import { Check, CheckSquare, Github, Square } from "@styled-icons/bootstrap";
import Head from "next/head";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]">
        <svg
          className="relative left-[calc(50%-11rem)] -z-10 h-[21.1875rem] max-w-none -translate-x-1/2 rotate-[30deg] sm:left-[calc(50%-30rem)] sm:h-[42.375rem]"
          viewBox="0 0 1155 678"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="url(#45de2b6b-92d5-4d68-a6a0-9b9b2abad533)"
            fillOpacity=".3"
            d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
          />
          <defs>
            <linearGradient
              id="45de2b6b-92d5-4d68-a6a0-9b9b2abad533"
              x1="1155.49"
              x2="-78.208"
              y1=".177"
              y2="474.645"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#2563eb"></stop>
              <stop offset="1" stopColor="#ff1c5e"></stop>
            </linearGradient>
          </defs>
        </svg>
      </div>
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

      <main className="relative isolate flex flex-1 flex-col items-center justify-center py-24 px-6 sm:px-12 md:py-48">
        <h1 className="flex items-center justify-center gap-1 text-6xl md:text-8xl lg:text-9xl">
          FrontGPT
          <img src="/favicon.svg" alt="" className="h-12 md:h-20 lg:h-24" />
        </h1>
        <p className="mt-2 text-center text-2xl font-medium text-gray-600 md:text-3xl lg:text-5xl">
          Your GPT-4 Powered Assistant in{" "}
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
        <ul className="mt-16 flex flex-col gap-4 text-xl text-gray-800">
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

        <div className="thop-[calc(100%-13rem)] sm:tojp-[calc(100%-30rem)] absolute inset-x-0 bottom-0 -z-10 transform-gpu overflow-hidden blur-3xl">
          <svg
            className="relative left-[calc(50%+3rem)] h-[21.1875rem] max-w-none -translate-x-1/2 sm:left-[calc(50%+36rem)] sm:h-[42.375rem]"
            viewBox="0 0 1155 678"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="url(#ecb5b0c9-546c-4772-8c71-4d3f06d544bc)"
              fillOpacity=".3"
              d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
            />
            <defs>
              <linearGradient
                id="ecb5b0c9-546c-4772-8c71-4d3f06d544bc"
                x1="1155.49"
                x2="-78.208"
                y1=".177"
                y2="474.645"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#2563eb"></stop>
                <stop offset="1" stopColor="#ff1c5e"></stop>
              </linearGradient>
            </defs>
          </svg>
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
