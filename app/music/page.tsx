"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";

const mockMusic = [
  {
    _id: "1",
    title: "Lovely Chaos",
    coverImage: "/mni-artwork-sample.png",
    duration: "3:42",
    category: "single",
  },
  {
    _id: "2",
    title: "Moonlight Dreams",
    coverImage: "/mni-artwork-sample.png",
    duration: "4:15",
    category: "album",
  },
  {
    _id: "3",
    title: "City Lights",
    coverImage: "/mni-artwork-sample.png",
    duration: "3:28",
    category: "single",
  },
  {
    _id: "4",
    title: "Midnight Melody",
    coverImage: "/mni-artwork-sample.png",
    duration: "5:02",
    category: "album",
  },
  {
    _id: "5",
    title: "Sunrise Vibe",
    coverImage: "/mni-artwork-sample.png",
    duration: "3:55",
    category: "ep",
  },
  {
    _id: "6",
    title: "Urban Soul",
    coverImage: "/mni-artwork-sample.png",
    duration: "4:20",
    category: "single",
  },
];

export default function MusicPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <main className="min-h-screen bg-black text-white">
      <motion.header
        initial={mounted ? { opacity: 0, y: -20 } : {}}
        animate={mounted ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="border-b border-white/10 px-6 py-8 md:px-12 md:py-12"
      >
        <motion.h1
          initial={mounted ? { opacity: 0 } : {}}
          animate={mounted ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-4xl font-light tracking-wide md:text-6xl"
        >
          Music
        </motion.h1>
        <motion.p
          initial={mounted ? { opacity: 0 } : {}}
          animate={mounted ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-4 text-white/70"
        >
          Sounds from the chaotic yet lovely universe
        </motion.p>
      </motion.header>

      <section className="px-6 py-12 md:px-12 md:py-16">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {mockMusic.map((music, index) => (
            <motion.div
              key={music._id}
              initial={mounted ? { opacity: 0, y: 50 } : {}}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <div className="relative aspect-square overflow-hidden border border-white/10 bg-gray-900">
                <Image
                  src={music.coverImage}
                  alt={music.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute right-4 top-4 border border-white/20 bg-black/80 px-3 py-1 text-xs">
                  {music.category}
                </div>
              </div>
              <div className="mt-3">
                <h3 className="text-base font-light">{music.title}</h3>
                <p className="mt-1 text-sm text-gray-500">{music.duration}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
}
