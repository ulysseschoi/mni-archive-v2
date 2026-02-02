"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import VideoCard from "@/components/VideoCard";
import { useState, useEffect } from "react";

// Mock data
const mockVideos = [
  {
    _id: "1",
    slug: "lovely-chaos-mv",
    title: "Lovely Chaos - Official MV",
    thumbnail: "/mni-artwork-sample.png",
    description: "Lovely Chaos의 공식 뮤직비디오",
    category: "music video",
    duration: "3:42",
    videoUrl: "https://www.youtube.com/watch?v=example1",
    createdAt: "2026-01-28",
  },
  {
    _id: "2",
    slug: "behind-the-scenes",
    title: "Behind The Scenes - Studio Session",
    thumbnail: "/mni-artwork-sample.png",
    description: "스튜디오 녹음 비하인드 영상",
    category: "behind",
    duration: "8:15",
    videoUrl: "https://www.youtube.com/watch?v=example2",
    createdAt: "2026-01-25",
  },
  {
    _id: "3",
    slug: "live-performance-2026",
    title: "Live Performance - Seoul 2026",
    thumbnail: "/mni-artwork-sample.png",
    description: "2026년 서울 공연 실황",
    category: "live",
    duration: "45:20",
    videoUrl: "https://www.youtube.com/watch?v=example3",
    createdAt: "2026-01-20",
  },
  {
    _id: "4",
    slug: "sketch-diary-ep1",
    title: "Sketch Diary - Episode 1",
    thumbnail: "/mni-artwork-sample.png",
    description: "일상 스케치 비디오 다이어리",
    category: "vlog",
    duration: "12:34",
    createdAt: "2026-01-15",
  },
  {
    _id: "5",
    slug: "making-of-album",
    title: "Making of 'Chaotic Dreams' Album",
    thumbnail: "/mni-artwork-sample.png",
    description: "앨범 제작 과정 다큐멘터리",
    category: "documentary",
    duration: "25:10",
    createdAt: "2026-01-10",
  },
  {
    _id: "6",
    slug: "interview-2026",
    title: "Artist Interview - 2026",
    thumbnail: "/mni-artwork-sample.png",
    description: "음악과 작업에 대한 인터뷰",
    category: "interview",
    duration: "15:45",
    createdAt: "2026-01-05",
  },
];

export default function VideosPage() {
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

      {/* Videos Grid */}
      <section className="px-6 py-12 md:px-12 md:py-16">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {mockVideos.map((video, index) => (
            <VideoCard key={video._id} video={video} index={index} />
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
