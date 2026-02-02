"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { notFound } from "next/navigation";

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
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    createdAt: "2026-01-28",
    story:
      "이 뮤직비디오는 혼돈 속에서도 아름다움을 찾아내는 여정을 시각적으로 표현했습니다. 흑백과 컬러를 교차하며 감정의 대비를 보여줍니다.",
  },
  {
    _id: "2",
    slug: "behind-the-scenes",
    title: "Behind The Scenes - Studio Session",
    thumbnail: "/mni-artwork-sample.png",
    description: "스튜디오 녹음 비하인드 영상",
    category: "behind",
    duration: "8:15",
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
    createdAt: "2026-01-20",
  },
];

export default function VideoDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const video = mockVideos.find((v) => v.slug === params.slug);

  if (!video) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Back Button */}
      <motion.div
        initial={mounted ? { opacity: 0, y: -20 } : {}}
        animate={mounted ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="border-b border-white/10 px-6 py-6 md:px-12"
      >
        <Link
          href="/videos"
          className="group inline-flex items-center gap-2 text-sm text-white/70 transition-colors hover:text-white"
        >
          <motion.span
            className="transition-transform group-hover:-translate-x-1"
            whileHover={{ x: -4 }}
          >
            ←
          </motion.span>
          BACK TO VIDEOS
        </Link>
      </motion.div>

      {/* Content */}
      <div className="mx-auto max-w-6xl px-6 py-12 md:px-12 md:py-16">
        {/* Video Player */}
        <motion.div
          initial={mounted ? { opacity: 0, y: 30 } : {}}
          animate={mounted ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <div className="relative aspect-video overflow-hidden rounded-lg border border-white/10 bg-black">
            {video.videoUrl ? (
              <iframe
                src={video.videoUrl}
                title={video.title}
                className="h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <Image
                src={video.thumbnail}
                alt={video.title}
                fill
                className="object-contain"
              />
            )}
          </div>
        </motion.div>

        {/* Video Info */}
        <motion.div
          initial={mounted ? { opacity: 0, y: 20 } : {}}
          animate={mounted ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-6"
        >
          {/* Category & Duration */}
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-block rounded-full border border-white/30 px-4 py-1.5 text-xs uppercase tracking-wider">
              {video.category}
            </span>
            <div className="flex items-center gap-2 text-sm text-white/70">
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" />
              </svg>
              <span>{video.duration}</span>
            </div>
            <div className="text-sm text-white/50">
              {new Date(video.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
          </div>

          {/* Title */}
          <h1 className="text-3xl font-light tracking-wide md:text-4xl">
            {video.title}
          </h1>

          {/* Description */}
          <p className="text-lg leading-relaxed text-white/90">
            {video.description}
          </p>

          {/* Story (if available) */}
          {video.story && (
            <div className="mt-8 rounded-lg border border-white/10 bg-white/5 p-6">
              <h3 className="mb-3 text-sm font-medium uppercase tracking-wider text-white/70">
                Behind The Scenes
              </h3>
              <p className="leading-relaxed text-white/80">{video.story}</p>
            </div>
          )}
        </motion.div>
      </div>

      {/* Footer */}
      <motion.footer
        initial={mounted ? { opacity: 0 } : {}}
        animate={mounted ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="border-t border-white/10 px-6 py-8 text-center text-sm text-white/50"
      >
        <p>© 2026 MNI Archive. All rights reserved.</p>
      </motion.footer>
    </main>
  );
}
