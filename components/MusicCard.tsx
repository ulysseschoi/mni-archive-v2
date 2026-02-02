"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

interface MusicCardProps {
  music: {
    _id: string;
    slug: string;
    title: string;
    coverImage: string;
    duration?: string;
    category?: string;
  };
  index: number;
}

export default function MusicCard({ music, index }: MusicCardProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <Link href={`/music/${music.slug}`}>
      <motion.div
        initial={mounted ? { opacity: 0, y: 20 } : {}}
        animate={mounted ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        whileHover={{ scale: 1.05 }}
        className="group relative aspect-square overflow-hidden rounded-lg border border-white/10 bg-black"
      >
        {/* Cover Image */}
        <Image
          src={music.coverImage}
          alt={music.title}
          fill
          className="object-contain transition-transform duration-300 group-hover:scale-110"
        />

        {/* Overlay on Hover */}
        <div className="absolute inset-0 bg-black/80 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <div className="flex h-full flex-col items-center justify-center gap-4 p-6 text-center">
            <h3 className="text-xl font-light">{music.title}</h3>
            {music.duration && (
              <p className="text-sm text-white/70">{music.duration}</p>
            )}
            {music.category && (
              <span className="rounded-full border border-white/30 px-3 py-1 text-xs uppercase tracking-wider">
                {music.category}
              </span>
            )}
            <div className="mt-2 flex items-center gap-2 text-sm text-white/70">
              <svg
                className="h-5 w-5"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
              </svg>
              <span>Play Track</span>
            </div>
          </div>
        </div>

        {/* Category Badge */}
        {music.category && (
          <div className="absolute left-3 top-3 z-10">
            <span className="rounded-full border border-white/30 bg-black/50 px-3 py-1 text-xs uppercase tracking-wider backdrop-blur-sm">
              {music.category}
            </span>
          </div>
        )}
      </motion.div>

      {/* Title Below (Mobile View) */}
      <motion.p
        initial={mounted ? { opacity: 0 } : {}}
        animate={mounted ? { opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
        className="mt-3 text-center text-sm font-light md:hidden"
      >
        {music.title}
      </motion.p>
    </Link>
  );
}
