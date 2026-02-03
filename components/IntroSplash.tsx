"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface IntroSplashProps {
  onComplete: () => void;
}

export default function IntroSplash({ onComplete }: IntroSplashProps) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    // Step 0: Mee (0s)
    // Step 1: Hide Mee, Show mni acv (1.5s)
    // Step 2: Hide mni acv, Show MNI ARCHIVE (3s)
    // Step 3: Show START ! (4.5s)

    const timers = [
      setTimeout(() => setStep(1), 1500),  // Hide Mee, Show mni acv
      setTimeout(() => setStep(2), 3000),  // Hide mni acv, Show MNI ARCHIVE
      setTimeout(() => setStep(3), 4500),  // Show START !
    ];

    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-white"
    >
      <div className="text-center">
        <AnimatePresence mode="wait">
          {/* Step 0-1: Mee */}
          {step === 0 && (
            <motion.h1
              key="mee"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="text-6xl md:text-8xl font-light tracking-wider text-black"
            >
              Mee
            </motion.h1>
          )}

          {/* Step 1-2: mni acv */}
          {step === 1 && (
            <motion.h1
              key="mni-acv"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="text-6xl md:text-8xl font-light tracking-wider text-black"
            >
              mni acv
            </motion.h1>
          )}

          {/* Step 2-3: MNI ARCHIVE */}
          {step === 2 && (
            <motion.h1
              key="mni-archive"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="text-6xl md:text-8xl font-light tracking-wider text-black uppercase"
            >
              MNI ARCHIVE
            </motion.h1>
          )}

          {/* Step 3: MNI ARCHIVE remains, START ! appears below */}
          {step === 3 && (
            <div key="final">
              <motion.h1
                initial={{ opacity: 1 }}
                animate={{ opacity: 1 }}
                className="text-6xl md:text-8xl font-light tracking-wider text-black uppercase mb-12"
              >
                MNI ARCHIVE
              </motion.h1>

              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                onClick={onComplete}
                className="text-2xl md:text-3xl font-light tracking-wider text-black hover:text-gray-400 transition-colors duration-300"
              >
                Start !
              </motion.button>
            </div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
