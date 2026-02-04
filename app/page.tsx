"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import IntroSplash from "@/components/IntroSplash";
import Link from "next/link";

function HomeContent() {
  const searchParams = useSearchParams();
  const [showIntro, setShowIntro] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Check if intro query param is explicitly set
    const introParam = searchParams.get("intro");
    
    if (introParam === "true") {
      // Explicitly requested intro
      setShowIntro(true);
    } else if (introParam === "false") {
      // Explicitly skip intro
      setShowIntro(false);
    } else {
      // No query param - check if first visit
      const hasVisited = sessionStorage.getItem("hasVisitedHome");
      
      if (!hasVisited) {
        // First visit in this session - show intro
        setShowIntro(true);
        sessionStorage.setItem("hasVisitedHome", "true");
      }
    }
  }, [searchParams]);

  const handleIntroComplete = () => {
    setShowIntro(false);
    // Clean up the URL by removing ?intro=true
    window.history.replaceState({}, "", "/");
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {showIntro && (
          <IntroSplash key="intro" onComplete={handleIntroComplete} />
        )}
      </AnimatePresence>

      {/* Original Home Content */}
      {!showIntro && (
        <main className="min-h-screen bg-black text-white flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center px-6"
        >
          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-6xl md:text-8xl font-light tracking-wider mb-6"
          >
            MNI
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl md:text-2xl font-light text-gray-400 tracking-wide mb-12"
          >
            The chaotic yet lovely universe of Meenoi
          </motion.p>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="grid grid-cols-2 md:flex md:flex-wrap justify-center gap-4 max-w-md md:max-w-none mx-auto"
          >
            {[
              { name: "Drops", path: "/drops" },
              { name: "Shop", path: "/shop" },
              { name: "Artworks", path: "/artworks" },
              { name: "Music", path: "/music" },
            ].map((item, index) => (
              <Link key={item.path} href={item.path}>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="w-full md:w-auto px-6 py-3 border border-white/20 font-light tracking-wider hover:bg-white/5 transition-all duration-300"
                >
                  {item.name}
                </motion.button>
              </Link>
            ))}
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-12 text-sm text-gray-600"
          >
            Welcome to the first archive.
          </motion.p>
        </motion.div>
      </main>
      )}
    </>
  );
}

export default function Home() {
  return (
    <Suspense fallback={
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-white/20 border-t-white"></div>
      </main>
    }>
      <HomeContent />
    </Suspense>
  );
}
