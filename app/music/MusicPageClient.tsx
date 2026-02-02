"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import MusicCard from "@/components/MusicCard";
import { useState, useEffect } from "react";

// Mock data - 나중에 Sanity로 교체
const mockMusic = [
  {
    _id: "1",
    slug: "lovely-chaos",
    title: "Lovely Chaos",
    coverImage: "/mni-artwork-sample.png",
    duration: "3:42",
    category: "single",
    description: "혼돈스럽지만 사랑스러운 멜로디",
    lyrics: "In the chaos of my mind...",
    createdAt: "2026-01-28",
  },
  {
    _id: "2",
    slug: "moonlight-dreams",
    title: "Moonlight Dreams",
    coverImage: "/mni-artwork-sample.png",
    duration: "4:15",
    category: "album",
    description: "달빛 아래 펼쳐지는 꿈",
    lyrics: "Under the moonlight...",
    createdAt: "2026-01-20",
  },
  {
    _id: "3",
    slug: "city-lights",
    title: "City Lights",
    coverImage: "/mni-artwork-sample.png",
    duration: "3:28",
    category: "single",
    description: "도시의 불빛 속 이야기",
    lyrics: "City lights are calling...",
    createdAt: "2026-01-15",
  },
  {
    _id: "4",
    slug: "midnight-melody",
    title: "Midnight Melody",
    coverImage: "/mni-artwork-sample.png",
    duration: "5:02",
    category: "album",
    description: "한밤중의 멜로디",
    createdAt: "2026-01-10",
  },
  {
    _id: "5",
    slug: "sunrise-vibe",
    title: "Sunrise Vibe",
    coverImage: "/mni-artwork-sample.png",
    duration: "3:55",
    category: "ep",
    description: "해가 뜨는 순간의 에너지",
    createdAt: "2026-01-05",
  },
  {
    _id: "6",
    slug: "urban-soul",
    title: "Urban Soul",
    coverImage: "/mni-artwork-sample.png",
    duration: "4:20",
    category: "single",
    description: "도시의 영혼을 담은 곡",
    createdAt: "2025-12-28",
  },
];

export default function MusicPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Header */}
      <motion.header
        initial={mounted ? { opacity: 0, y: -20 } : {}}
        animate={mounted ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="border-b border-white/10 px-6 py-8 md:px-12 md:py-12"
      >
        <Link
          href="/"
          className="group mb-8 inline-flex items-center gap-2 text-sm text-white/70 transition-colors hover:text-white"
        >
          <motion.span
            className="transition-transform group-hover:-translate-x-1"
            whileHover={{ x: -4 }}
          >
            ←
          </motion.span>
          BACK TO HOME
        </Link>

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

      {/* Music Grid */}
      <section className="px-6 py-12 md:px-12 md:py-16">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {mockMusic.map((music, index) => (
            <MusicCard key={music._id} music={music} index={index} />
          ))}
        </div>
      </section>

      {/* Footer */}
      <motion.footer
        initial={mounted ? { opacity: 0 } : {}}
        animate={mounted ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="border-t border-white/10 px-6 py-8 text-center text-sm text-white/50"
      >
        <p>© 2026 MNI Archive. All rights reserved.</p>
      </motion.footer>
    </main>
  );
}
