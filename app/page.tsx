"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import IntroSplash from "@/components/IntroSplash";

export default function Home() {
  const [showIntro, setShowIntro] = useState(true);

  const handleIntroComplete = () => {
    setShowIntro(false);
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {showIntro && (
          <IntroSplash key="intro" onComplete={handleIntroComplete} />
        )}
      </AnimatePresence>

      {/* Original Home Content */}
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center px-6">
          <h1 className="text-6xl md:text-8xl font-light tracking-wider mb-6">
            MNI
          </h1>
          <p className="text-xl md:text-2xl font-light text-gray-400 tracking-wide">
            The chaotic yet lovely universe of Meenoi
          </p>
          <p className="mt-8 text-sm text-gray-600">
            Welcome to the first archive.
          </p>
        </div>
      </main>
    </>
  );
}
