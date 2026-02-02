"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export default function LandingPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div ref={containerRef} className="bg-black text-white">
      {/* Hero Section */}
      <motion.section
        style={mounted ? { opacity, scale } : {}}
        className="min-h-screen flex flex-col items-center justify-center px-6 sm:px-8 md:px-12"
      >
        <motion.div
          initial={mounted ? { opacity: 0, y: 20 } : false}
          animate={mounted ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center max-w-4xl"
        >
          {/* Logo/Brand */}
          <motion.h1
            initial={mounted ? { opacity: 0, y: -20 } : false}
            animate={mounted ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-3xl sm:text-4xl md:text-5xl font-light tracking-wider mb-12 uppercase"
          >
            MNI
          </motion.h1>

          {/* Main Tagline */}
          <motion.p
            initial={mounted ? { opacity: 0 } : false}
            animate={mounted ? { opacity: 1 } : {}}
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

          {/* Coming Soon Badge - Changed to Explore Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            whileHover={{ scale: 1.05 }}
            className="inline-block"
          >
            <Link href="/artworks">
              <div className="border border-white px-8 py-3 text-sm sm:text-base tracking-widest font-light hover:bg-white hover:text-black transition-all duration-300 cursor-pointer">
                EXPLORE ARTWORKS
              </div>
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Featured Artworks Section */}
      <section className="px-6 sm:px-8 md:px-12 py-20 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-light mb-4">
              Featured Works
            </h2>
            <p className="text-gray-400 font-light">
              A glimpse into the chaotic creativity
            </p>
          </motion.div>

          {/* Artworks Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {[
              {
                title: "Chaotic Dreams",
                slug: "chaotic-dreams",
                image: "/mni-artwork-sample.png",
              },
              {
                title: "Black Briar Skater",
                slug: "black-briar-skater",
                image: "/mni-artwork-sample.png",
              },
              {
                title: "Curious Cat",
                slug: "curious-cat",
                image: "/mni-artwork-sample.png",
              },
            ].map((artwork, index) => (
              <motion.div
                key={artwork.slug}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group"
              >
                <Link href={`/artworks/${artwork.slug}`}>
                  <div className="relative aspect-square overflow-hidden bg-gray-900 border border-white/10 hover:border-white/30 transition-all duration-300">
                    <Image
                      src={artwork.image}
                      alt={artwork.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/70 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <h3 className="text-xl font-light">{artwork.title}</h3>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* View All Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <Link href="/artworks">
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="border border-white px-8 py-3 text-sm tracking-widest hover:bg-white hover:text-black transition-all duration-300"
              >
                VIEW ALL ARTWORKS
              </motion.button>
            </Link>
          </motion.div>
        </div>
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
