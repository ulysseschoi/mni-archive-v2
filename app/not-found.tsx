"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="text-center max-w-2xl"
      >
        {/* 404 Number */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="text-9xl md:text-[12rem] font-light tracking-wider mb-8"
        >
          404
        </motion.h1>

        {/* Main Message */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="text-3xl md:text-4xl font-light tracking-wide mb-4"
        >
          Lost in the archive?
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="text-lg text-gray-400 font-light mb-12 leading-relaxed"
        >
          이 페이지는 존재하지 않거나 이동되었습니다.
          <br />
          아카이브의 다른 작품들을 둘러보세요.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link href="/">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="px-8 py-3 bg-white text-black font-light tracking-wider hover:bg-gray-200 transition-colors duration-300"
            >
              홈으로 돌아가기
            </motion.button>
          </Link>

          <Link href="/artworks">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="px-8 py-3 border border-white/20 font-light tracking-wider hover:bg-white/5 transition-colors duration-300"
            >
              작품 보러가기
            </motion.button>
          </Link>
        </motion.div>

        {/* Decorative Element */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 text-gray-700 text-sm font-light tracking-widest"
        >
          ✦ ✦ ✦
        </motion.div>
      </motion.div>
    </main>
  );
}
