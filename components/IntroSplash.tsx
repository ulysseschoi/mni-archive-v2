"use client";

import { motion } from "framer-motion";

interface IntroSplashProps {
  onComplete: () => void;
}

export default function IntroSplash({ onComplete }: IntroSplashProps) {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black text-white"
    >
      <div className="text-center max-w-4xl px-6">
        {/* Logo */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-3xl sm:text-4xl md:text-5xl font-light tracking-[0.3em] mb-12 uppercase"
        >
          MNI
        </motion.h1>

        {/* Main Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg sm:text-xl md:text-2xl font-light leading-relaxed mb-8"
        >
          The chaotic yet lovely universe of Meenoi.
          <br />
          Welcome to the first archive.
        </motion.p>

        {/* START Button */}
        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onComplete}
          className="mt-12 px-12 py-4 text-sm font-light tracking-[0.2em] uppercase border border-white/30 text-white hover:bg-white hover:text-black transition-all duration-300"
        >
          <motion.span
            animate={{
              opacity: [1, 0.6, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            START !
          </motion.span>
        </motion.button>
      </div>
    </motion.div>
  );
}
