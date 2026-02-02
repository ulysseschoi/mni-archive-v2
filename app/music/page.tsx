"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import MusicCard from "@/components/MusicCard";

const mockMusic = [
  {
    _id: "1",
    slug: "lovely-chaos",
    title: "Lovely Chaos",
    coverImage: "/mni-artwork-sample.png",
    duration: "3:45",
    category: "Single",
    description: "A spontaneous track capturing the chaotic yet lovely essence of everyday dreams.",
    lyrics: "Sample lyrics for lovely chaos...",
    createdAt: "2026-01-28",
  },
  {
    _id: "2",
    slug: "moonlight-dreams",
    title: "Moonlight Dreams",
    coverImage: "/mni-artwork-sample.png",
    duration: "4:12",
    category: "Album Track",
    description: "Dreamy melodies under the moonlight.",
    lyrics: "Sample lyrics for moonlight dreams...",
    createdAt: "2026-01-25",
  },
  {
    _id: "3",
    slug: "city-lights",
    title: "City Lights",
    coverImage: "/mni-artwork-sample.png",
    duration: "3:58",
    category: "Single",
    description: "Urban vibes and city nightlife.",
    lyrics: "Sample lyrics for city lights...",
    createdAt: "2026-01-20",
  },
  {
    _id: "4",
    slug: "midnight-melody",
    title: "Midnight Melody",
    coverImage: "/mni-artwork-sample.png",
    duration: "4:30",
    category: "EP",
    description: "Late night melodies for deep thoughts.",
    lyrics: "Sample lyrics for midnight melody...",
    createdAt: "2026-01-15",
  },
  {
    _id: "5",
    slug: "sunrise-vibe",
    title: "Sunrise Vibe",
    coverImage: "/mni-artwork-sample.png",
    duration: "3:22",
    category: "Single",
    description: "Morning energy and positive vibes.",
    lyrics: "Sample lyrics for sunrise vibe...",
    createdAt: "2026-01-10",
  },
  {
    _id: "6",
    slug: "urban-soul",
    title: "Urban Soul",
    coverImage: "/mni-artwork-sample.png",
    duration: "4:05",
    category: "Album Track",
    description: "Soulful sounds from the urban jungle.",
    lyrics: "Sample lyrics for urban soul...",
    createdAt: "2026-01-05",
  },
];

export default function MusicPage() {
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
          <h1 className="text-5xl sm:text-6xl font-bold mb-4">Music</h1>
          <p className="text-gray-400 text-lg mb-12">
            Collection of tracks and melodies
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockMusic.map((music, index) => (
            <MusicCard key={music._id} music={music} index={index} />
          ))}
        </div>

        <div className="text-center text-gray-500 text-sm mt-16">
          © 2026 MNI Archive
        </div>
      </div>
    </div>
  );
}
