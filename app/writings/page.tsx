"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import WritingCard from "@/components/WritingCard";
import { useState, useEffect } from "react";

// Mock data
const mockWritings = [
  {
    _id: "1",
    slug: "thoughts-on-creativity",
    title: "Thoughts on Creativity",
    excerpt:
      "창의성에 대한 생각들. 완벽하지 않아도 괜찮다는 것, 혼돈 속에서도 아름다움을 찾을 수 있다는 것에 대하여.",
    content: `창의성은 완벽함이 아니라 용기에서 시작된다고 생각해요...`,
    publishedAt: "2026-01-28",
    category: "essay",
    readTime: "5 min read",
  },
  {
    _id: "2",
    slug: "midnight-poetry",
    title: "Midnight Poetry",
    excerpt:
      "한밤중에 쓴 시. 달빛 아래서 펼쳐지는 생각의 조각들을 모았습니다.",
    content: `In the quiet of the night\nWhere shadows dance with light...`,
    publishedAt: "2026-01-25",
    category: "poetry",
    readTime: "3 min read",
  },
  {
    _id: "3",
    slug: "my-creative-journey",
    title: "My Creative Journey",
    excerpt:
      "음악과 그림, 그리고 글쓰기를 통해 나를 표현하기까지의 여정을 돌아봅니다.",
    content: `Every artist has a journey...`,
    publishedAt: "2026-01-20",
    category: "personal",
    readTime: "8 min read",
  },
  {
    _id: "4",
    slug: "chaos-and-beauty",
    title: "Chaos and Beauty",
    excerpt: "혼돈과 아름다움은 공존할 수 있을까? 일상 속에서 발견한 작은 깨달음.",
    publishedAt: "2026-01-15",
    category: "essay",
    readTime: "6 min read",
  },
  {
    _id: "5",
    slug: "letters-to-myself",
    title: "Letters to Myself",
    excerpt: "과거의 나에게 쓰는 편지. 지나온 시간들을 돌아보며.",
    publishedAt: "2026-01-10",
    category: "personal",
    readTime: "4 min read",
  },
  {
    _id: "6",
    slug: "art-and-life",
    title: "Art and Life",
    excerpt: "예술과 삶은 어떻게 연결되어 있을까? 창작과 일상의 경계에서.",
    publishedAt: "2026-01-05",
    category: "essay",
    readTime: "7 min read",
  },
];

export default function WritingsPage() {
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
          Writings
        </motion.h1>
        <motion.p
          initial={mounted ? { opacity: 0 } : {}}
          animate={mounted ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-4 text-white/70"
        >
          Thoughts, poems, and stories from the creative mind
        </motion.p>
      </motion.header>

      {/* Writings Grid */}
      <section className="px-6 py-12 md:px-12 md:py-16">
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:gap-8">
          {mockWritings.map((writing, index) => (
            <WritingCard key={writing._id} writing={writing} index={index} />
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
