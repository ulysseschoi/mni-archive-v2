"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import VideoCard from "@/components/VideoCard";

const mockVideos = [
  {
    _id: "1",
    slug: "lovely-chaos-mv",
    title: "Lovely Chaos - Official MV",
    thumbnail: "/mni-artwork-sample.png",
    description: "Official music video for Lovely Chaos",
    category: "Music Video",
    duration: "3:45",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    createdAt: "2026-01-28",
  },
  {
    _id: "2",
    slug: "behind-the-scenes",
    title: "Behind the Scenes",
    thumbnail: "/mni-artwork-sample.png",
    description: "Making of the album",
    category: "Documentary",
    duration: "12:30",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    createdAt: "2026-01-25",
  },
  {
    _id: "3",
    slug: "live-performance-2026",
    title: "Live Performance 2026",
    thumbnail: "/mni-artwork-sample.png",
    description: "Live show highlights",
    category: "Live",
    duration: "45:00",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    createdAt: "2026-01-20",
  },
  {
    _id: "4",
    slug: "sketch-diary-ep1",
    title: "Sketch Diary EP1",
    thumbnail: "/mni-artwork-sample.png",
    description: "Daily life and creative process",
    category: "Vlog",
    duration: "8:15",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    createdAt: "2026-01-15",
  },
  {
    _id: "5",
    slug: "making-of-album",
    title: "Making of Album",
    thumbnail: "/mni-artwork-sample.png",
    description: "Studio sessions and production",
    category: "Documentary",
    duration: "20:00",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    createdAt: "2026-01-10",
  },
  {
    _id: "6",
    slug: "interview-2026",
    title: "Interview 2026",
    thumbnail: "/mni-artwork-sample.png",
    description: "Talking about music and life",
    category: "Interview",
    duration: "15:30",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    createdAt: "2026-01-05",
  },
];

export default function VideosPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Link
            href="/"
            className="inline-block mb-8 text-sm hover:opacity-60 transition-opacity"
          >
            ← BACK TO HOME
          </Link>
          <h1 className="text-5xl sm:text-6xl font-bold mb-4">Videos</h1>
          <p className="text-gray-400 text-lg mb-12">
            Music videos, documentaries, and more
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockVideos.map((video, index) => (
            <VideoCard key={video._id} video={video} index={index} />
          ))}
        </div>

        <div className="text-center text-gray-500 text-sm mt-16">
          © 2026 MNI Archive
        </div>
      </div>
    </div>
  );
}
