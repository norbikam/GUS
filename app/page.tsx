"use client";

import Image from "next/image";
import HeroSection from "./components/mainVidBg";
import {Button} from "@heroui/button";
import Footer from "./components/footer";
import {useRef} from "react";

export default function Home() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const scrollToNext = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollBy({ top: window.innerHeight-60, behavior: "smooth" });
    }
  }
  return (
    <div className="">
      <HeroSection/>

      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        
        <div className="grid md:grid-cols-2 sm:grid-cols-1 w-full md:px-10 px-8 justify-center items-center font-light bg-gray-200">
          <div className="grid grid-cols-2 w-full gap-4 bg-gray-200 text-black rounded text-center">
            <div className="p-10">1</div>
            <div className="p-10">2</div>
            <div className="p-10">3</div>
            <div className="p-10">4</div>
          </div>
          <div className="w-full grid-col-span-2 bg-gray-200 text-black h-full justify-center flex flex-col gap-4 md:p-10 p-6">
              <h1 className="text-4xl font-light">Najlepsza jakość w najlepszej cenie</h1>
              <p className="text-2xl">Sprawdź nasze polecane urządzenia</p>
              <Button onPress={scrollToNext} className="bg-yellow-500 md:w-1/3 sm:w-full text-xl">Polecane</Button>
          </div>
        </div>

        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <ol className="list-inside list-decimal text-sm/6 text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          <li className="mb-2 tracking-[-.01em]">
            Get started by editing{" "}
            <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-[family-name:var(--font-geist-mono)] font-semibold">
              app/page.tsx
            </code>
            .
          </li>
          <li className="tracking-[-.01em]">
            Save and see your changes instantly.
          </li>
        </ol>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <a
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="dark:invert"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={20}
              height={20}
            />
            Deploy now
          </a>
          <a
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Read our docs
          </a>
        </div>
      </main>
      <Footer />
    </div>
  );
}
