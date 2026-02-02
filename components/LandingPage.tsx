"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function LandingPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

  return (
    <div ref={containerRef} className="bg-black text-white">
      {/* Hero Section */}
      <motion.section
        style={{ opacity, scale }}
        className="min-h-screen flex flex-col items-center justify-center px-6 sm:px-8 md:px-12"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center max-w-4xl"
        >
          {/* Logo/Brand */}
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-3xl sm:text-4xl md:text-5xl font-light tracking-wider mb-12 uppercase"
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
        </motion.div>
      </motion.section>

      {/* Content Section */}
      <section className="min-h-screen flex items-center justify-center px-6 sm:px-8 md:px-12 py-20">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl text-center"
        >
          {/* Archive Title */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-2xl sm:text-3xl md:text-4xl font-light mb-6"
          >
            mni&apos;s hand-drawn artwork
          </motion.h2>

          {/* Archive Number & Date */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-sm sm:text-base tracking-widest mb-12 text-gray-400"
          >
            #ARCHIVE_01 2026.01.28
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-base sm:text-lg md:text-xl font-light leading-relaxed mb-16 text-gray-300"
          >
            A raw collection of doodles directly from Meenoi&apos;s imagination.
            <br />
            Unfiltered, slightly chaotic, but undeniably cute.
            <br />
            This marks the beginning of the MNI Archive brand journey.
          </motion.p>

          {/* Coming Soon Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            whileHover={{ scale: 1.05 }}
            className="inline-block"
          >
            <div className="border border-white px-8 py-3 text-sm sm:text-base tracking-widest font-light hover:bg-white hover:text-black transition-all duration-300">
              COMING SOON
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="py-12 text-center text-sm text-gray-500"
      >
        <p className="font-light tracking-wide">
          © 2026 MNI Archive. All rights reserved.
        </p>
      </motion.footer>
    </div>
  );
}
