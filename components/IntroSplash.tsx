"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface IntroSplashProps {
  onComplete: () => void;
}

export default function IntroSplash({ onComplete }: IntroSplashProps) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    // Timing matching reference site:
    // Step 0: Mee (0s - 2s)
    // Step 1: mni acv (2s - 4s)
    // Step 2: MNI ARCHIVE (4s - 5.5s)
    // Step 3: START ! (5.5s+)

    const timers = [
      setTimeout(() => setStep(1), 2000),   // Mee → mni acv (2s)
      setTimeout(() => setStep(2), 4000),   // mni acv → MNI ARCHIVE (2s)
      setTimeout(() => setStep(3), 5500),   // + START ! (1.5s)
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
          {/* Step 0: mee */}
          {step === 0 && (
            <motion.h1
              key="mee"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-5xl font-light tracking-wide text-black"
            >
              mee
            </motion.h1>
          )}

          {/* Step 1: mni acv */}
          {step === 1 && (
            <motion.h1
              key="mni-acv"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="text-5xl md:text-7xl font-light tracking-wide text-black"
            >
              mni acv
            </motion.h1>
          )}

          {/* Step 2: MNI ARCHIVE */}
          {step === 2 && (
            <motion.h1
              key="mni-archive"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="text-4xl sm:text-5xl font-bold tracking-[0.3em] text-black uppercase"
            >
              MNI ARCHIVE
            </motion.h1>
          )}

          {/* Step 3: MNI ARCHIVE + START ! */}
          {step === 3 && (
            <div key="final" className="space-y-20">
              <motion.h1
                initial={{ opacity: 1, y: 0 }}
                animate={{ opacity: 1, y: -30 }}
                transition={{ 
                  duration: 1.2,
                  ease: [0.19, 1, 0.22, 1],
                  y: { duration: 1.2, ease: [0.19, 1, 0.22, 1] }
                }}
                className="text-4xl sm:text-5xl font-bold tracking-[0.3em] text-black uppercase"
              >
                MNI ARCHIVE
              </motion.h1>

              <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ 
                  duration: 1.2,
                  ease: [0.19, 1, 0.22, 1], // Custom bezier for buttery smooth entrance
                  opacity: { duration: 1.0, ease: "easeOut" },
                  scale: { duration: 1.2, ease: [0.19, 1, 0.22, 1] }
                }}
                onClick={onComplete}
                whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                whileTap={{ scale: 0.95 }}
                className="text-xl sm:text-2xl font-light tracking-wide text-black hover:text-gray-400 transition-colors duration-300 cursor-pointer"
              >
                START !
              </motion.button>
            </div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
