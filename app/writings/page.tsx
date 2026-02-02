"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const mockWritings = [
  {
    _id: "1",
    title: "Thoughts on Creativity",
    excerpt: "창의성에 대한 생각들. 완벽하지 않아도 괜찮다는 것, 혼돈 속에서도 아름다움을 찾을 수 있다는 것에 대하여.",
    category: "essay",
    readTime: "5 min read",
  },
  {
    _id: "2",
    title: "Midnight Poetry",
    excerpt: "한밤중에 쓴 시. 달빛 아래서 펼쳐지는 생각의 조각들을 모았습니다.",
    category: "poetry",
    readTime: "3 min read",
  },
  {
    _id: "3",
    title: "My Creative Journey",
    excerpt: "음악과 그림, 그리고 글쓰기를 통해 나를 표현하기까지의 여정을 돌아봅니다.",
    category: "personal",
    readTime: "8 min read",
  },
  {
    _id: "4",
    title: "Chaos and Beauty",
    excerpt: "혼돈과 아름다움은 공존할 수 있을까? 일상 속에서 발견한 작은 깨달음.",
    category: "essay",
    readTime: "6 min read",
  },
  {
    _id: "5",
    title: "Letters to Myself",
    excerpt: "과거의 나에게 쓰는 편지. 지나온 시간들을 돌아보며.",
    category: "personal",
    readTime: "4 min read",
  },
  {
    _id: "6",
    title: "Art and Life",
    excerpt: "예술과 삶은 어떻게 연결되어 있을까? 창작과 일상의 경계에서.",
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

      <section className="px-6 py-12 md:px-12 md:py-16">
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:gap-8">
          {mockWritings.map((writing, index) => (
            <motion.div
              key={writing._id}
              initial={mounted ? { opacity: 0, y: 50 } : {}}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group border border-white/10 p-6 transition-all hover:border-white/30"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h3 className="mb-2 text-xl font-light">{writing.title}</h3>
                  <p className="mb-4 text-sm text-gray-400">{writing.excerpt}</p>
                  <div className="flex items-center gap-4 text-xs text-gray-600">
                    <span className="uppercase tracking-wider">{writing.category}</span>
                    <span>•</span>
                    <span>{writing.readTime}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
}
