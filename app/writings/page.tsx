"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import WritingCard from "@/components/WritingCard";

const mockWritings = [
  {
    _id: "1",
    slug: "thoughts-on-creativity",
    title: "Thoughts on Creativity",
    excerpt: "Some random thoughts about the creative process and finding inspiration in everyday chaos.",
    coverImage: "/mni-artwork-sample.png",
    category: "Essay",
    publishedAt: "2026-01-28",
  },
  {
    _id: "2",
    slug: "midnight-poetry",
    title: "Midnight Poetry",
    excerpt: "Late night verses written under the stars.",
    coverImage: "/mni-artwork-sample.png",
    category: "Poetry",
    publishedAt: "2026-01-25",
  },
  {
    _id: "3",
    slug: "my-creative-journey",
    title: "My Creative Journey",
    excerpt: "A reflection on the path that led me here.",
    coverImage: "/mni-artwork-sample.png",
    category: "Personal",
    publishedAt: "2026-01-20",
  },
  {
    _id: "4",
    slug: "chaos-and-beauty",
    title: "Chaos and Beauty",
    excerpt: "Finding beauty in the chaotic moments of life.",
    coverImage: "/mni-artwork-sample.png",
    category: "Essay",
    publishedAt: "2026-01-15",
  },
  {
    _id: "5",
    slug: "letters-to-myself",
    title: "Letters to Myself",
    excerpt: "Notes and reminders for future me.",
    coverImage: "/mni-artwork-sample.png",
    category: "Personal",
    publishedAt: "2026-01-10",
  },
  {
    _id: "6",
    slug: "art-and-life",
    title: "Art and Life",
    excerpt: "Exploring the intersection of art and everyday existence.",
    coverImage: "/mni-artwork-sample.png",
    category: "Essay",
    publishedAt: "2026-01-05",
  },
];

export default function WritingsPage() {
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
          <h1 className="text-5xl sm:text-6xl font-bold mb-4">Writings</h1>
          <p className="text-gray-400 text-lg mb-12">
            Essays, poetry, and thoughts
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockWritings.map((writing, index) => (
            <WritingCard key={writing._id} writing={writing} index={index} />
          ))}
        </div>

        <div className="text-center text-gray-500 text-sm mt-16">
          © 2026 MNI Archive
        </div>
      </div>
    </div>
  );
}
