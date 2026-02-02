"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

interface VideoCardProps {
  video: {
    _id: string;
    slug: string;
    title: string;
    thumbnail: string;
    description?: string;
    category?: string;
    duration?: string;
  };
  index: number;
}

export default function VideoCard({ video, index }: VideoCardProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <Link href={`/videos/${video.slug}`}>
      <motion.div
        initial={mounted ? { opacity: 0, y: 20 } : {}}
        animate={mounted ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        whileHover={{ scale: 1.05 }}
        className="group relative aspect-video overflow-hidden rounded-lg border border-white/10 bg-black"
      >
        {/* Thumbnail */}
        <Image
          src={video.thumbnail}
          alt={video.title}
          fill
          className="object-contain transition-transform duration-300 group-hover:scale-110"
        />

        {/* Play Icon Overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            initial={{ scale: 1, opacity: 0.7 }}
            whileHover={{ scale: 1.2, opacity: 1 }}
            className="rounded-full bg-black/70 p-6 backdrop-blur-sm transition-all"
          >
            <svg
              className="h-12 w-12 text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
            </svg>
          </motion.div>
        </div>

        {/* Info Overlay on Hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <h3 className="mb-2 text-lg font-light">{video.title}</h3>
            {video.description && (
              <p className="line-clamp-2 text-sm text-white/70">
                {video.description}
              </p>
            )}
          </div>
        </div>

        {/* Category & Duration Badges */}
        <div className="absolute left-3 top-3 z-10 flex gap-2">
          {video.category && (
            <span className="rounded-full border border-white/30 bg-black/50 px-3 py-1 text-xs uppercase tracking-wider backdrop-blur-sm">
              {video.category}
            </span>
          )}
          {video.duration && (
            <span className="rounded-full bg-black/70 px-3 py-1 text-xs backdrop-blur-sm">
              {video.duration}
            </span>
          )}
        </div>
      </motion.div>

      {/* Title Below (Mobile View) */}
      <motion.p
        initial={mounted ? { opacity: 0 } : {}}
        animate={mounted ? { opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
        className="mt-3 text-center text-sm font-light md:hidden"
      >
        {video.title}
      </motion.p>
    </Link>
  );
}
