"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";

interface WritingCardProps {
  writing: {
    _id: string;
    slug: string;
    title: string;
    excerpt?: string;
    publishedAt: string;
    category?: string;
    readTime?: string;
  };
  index: number;
}

export default function WritingCard({ writing, index }: WritingCardProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <Link href={`/writings/${writing.slug}`}>
      <motion.article
        initial={mounted ? { opacity: 0, y: 20 } : {}}
        animate={mounted ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        whileHover={{ scale: 1.02 }}
        className="group relative overflow-hidden rounded-lg border border-white/10 bg-black p-8 transition-all hover:border-white/30 hover:bg-white/5"
      >
        {/* Category Badge */}
        {writing.category && (
          <div className="mb-4">
            <span className="inline-block rounded-full border border-white/30 px-3 py-1 text-xs uppercase tracking-wider">
              {writing.category}
            </span>
          </div>
        )}

        {/* Title */}
        <h3 className="mb-3 text-xl font-light leading-tight tracking-wide transition-colors group-hover:text-white/90 md:text-2xl">
          {writing.title}
        </h3>

        {/* Excerpt */}
        {writing.excerpt && (
          <p className="mb-4 line-clamp-3 text-white/70">{writing.excerpt}</p>
        )}

        {/* Meta Info */}
        <div className="flex items-center gap-4 text-sm text-white/50">
          <time>
            {new Date(writing.publishedAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </time>
          {writing.readTime && (
            <>
              <span>·</span>
              <span>{writing.readTime}</span>
            </>
          )}
        </div>

        {/* Read More Arrow */}
        <motion.div
          className="absolute bottom-8 right-8 text-white/50 transition-all group-hover:text-white"
          whileHover={{ x: 4 }}
        >
          →
        </motion.div>
      </motion.article>
    </Link>
  );
}
