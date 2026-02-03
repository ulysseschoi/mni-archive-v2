"use client";

import { motion } from "framer-motion";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Error boundary caught:", error);
  }, [error]);

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="text-center max-w-2xl"
      >
        {/* Error Icon */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="text-7xl md:text-8xl mb-8"
        >
          ⚠
        </motion.div>

        {/* Main Message */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="text-3xl md:text-5xl font-light tracking-wide mb-4"
        >
          Something went wrong in the void
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="text-lg text-gray-400 font-light mb-12 leading-relaxed"
        >
          예상치 못한 오류가 발생했습니다.
          <br />
          잠시 후 다시 시도해주세요.
        </motion.p>

        {/* Error Details (Development only) */}
        {process.env.NODE_ENV === "development" && error.message && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="mb-8 p-4 border border-red-500/30 bg-red-500/10 text-left"
          >
            <p className="text-sm text-red-400 font-mono break-all">
              {error.message}
            </p>
          </motion.div>
        )}

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <motion.button
            onClick={reset}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="px-8 py-3 bg-white text-black font-light tracking-wider hover:bg-gray-200 transition-colors duration-300"
          >
            다시 시도
          </motion.button>

          <motion.button
            onClick={() => (window.location.href = "/")}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="px-8 py-3 border border-white/20 font-light tracking-wider hover:bg-white/5 transition-colors duration-300"
          >
            홈으로 돌아가기
          </motion.button>
        </motion.div>

        {/* Decorative Element */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 text-gray-700 text-sm font-light tracking-widest"
        >
          ✦ ✦ ✦
        </motion.div>
      </motion.div>
    </main>
  );
}
