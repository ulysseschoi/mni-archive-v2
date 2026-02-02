"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";

const mockVideos = [
  {
    _id: "1",
    title: "Lovely Chaos - Official MV",
    thumbnail: "/mni-artwork-sample.png",
    duration: "3:42",
    category: "music video",
  },
  {
    _id: "2",
    title: "Behind The Scenes",
    thumbnail: "/mni-artwork-sample.png",
    duration: "8:15",
    category: "behind",
  },
  {
    _id: "3",
    title: "Live Performance 2026",
    thumbnail: "/mni-artwork-sample.png",
    duration: "45:20",
    category: "live",
  },
  {
    _id: "4",
    title: "Sketch Diary Ep1",
    thumbnail: "/mni-artwork-sample.png",
    duration: "12:34",
    category: "vlog",
  },
  {
    _id: "5",
    title: "Making of Album",
    thumbnail: "/mni-artwork-sample.png",
    duration: "25:10",
    category: "documentary",
  },
  {
    _id: "6",
    title: "Artist Interview 2026",
    thumbnail: "/mni-artwork-sample.png",
    duration: "15:45",
    category: "interview",
  },
];

export default function VideosPage() {
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
          Videos
        </motion.h1>
        <motion.p
          initial={mounted ? { opacity: 0 } : {}}
          animate={mounted ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-4 text-white/70"
        >
          Visual stories from the creative journey
        </motion.p>
      </motion.header>

      <section className="px-6 py-12 md:px-12 md:py-16">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {mockVideos.map((video, index) => (
            <motion.div
              key={video._id}
              initial={mounted ? { opacity: 0, y: 50 } : {}}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <div className="relative aspect-video overflow-hidden border border-white/10 bg-gray-900">
                <Image
                  src={video.thumbnail}
                  alt={video.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute right-4 top-4 border border-white/20 bg-black/80 px-3 py-1 text-xs">
                  {video.category}
                </div>
                <div className="absolute bottom-4 right-4 bg-black/80 px-2 py-1 text-xs">
                  {video.duration}
                </div>
              </div>
              <div className="mt-3">
                <h3 className="text-base font-light">{video.title}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
}
