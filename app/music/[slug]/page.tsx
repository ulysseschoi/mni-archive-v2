"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { notFound } from "next/navigation";

// Mock data
const mockMusic = [
  {
    _id: "1",
    slug: "lovely-chaos",
    title: "Lovely Chaos",
    coverImage: "/mni-artwork-sample.png",
    duration: "3:42",
    category: "single",
    description: "혼돈스럽지만 사랑스러운 멜로디",
    lyrics: `[Verse 1]
In the chaos of my mind
There's a melody I find
Dancing through the twisted lines
Love and chaos intertwined

[Chorus]
It's a lovely chaos, can't you see?
The beautiful mess that's inside of me
Every note, every beat
Makes my heart skip incomplete

[Verse 2]
Colors bleeding through the sound
Lost but somehow I am found
In this rhythm all around
Where my chaos can be crowned`,
    audioFile: "https://example.com/lovely-chaos.mp3",
    createdAt: "2026-01-28",
    story:
      "이 곡은 일상의 혼란 속에서도 아름다움을 찾고자 하는 마음을 담았습니다. 완벽하지 않아도 괜찮다는 메시지를 전달하고 싶었어요.",
  },
  {
    _id: "2",
    slug: "moonlight-dreams",
    title: "Moonlight Dreams",
    coverImage: "/mni-artwork-sample.png",
    duration: "4:15",
    category: "album",
    description: "달빛 아래 펼쳐지는 꿈",
    createdAt: "2026-01-20",
  },
  {
    _id: "3",
    slug: "city-lights",
    title: "City Lights",
    coverImage: "/mni-artwork-sample.png",
    duration: "3:28",
    category: "single",
    description: "도시의 불빛 속 이야기",
    createdAt: "2026-01-15",
  },
];

export default function MusicDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const music = mockMusic.find((m) => m.slug === params.slug);

  if (!music) {
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
          href="/music"
          className="group inline-flex items-center gap-2 text-sm text-white/70 transition-colors hover:text-white"
        >
          <motion.span
            className="transition-transform group-hover:-translate-x-1"
            whileHover={{ x: -4 }}
          >
            ←
          </motion.span>
          BACK TO MUSIC
        </Link>
      </motion.div>

      {/* Content */}
      <div className="mx-auto max-w-6xl px-6 py-12 md:px-12 md:py-16">
        <div className="grid gap-12 lg:grid-cols-2">
          {/* Left: Cover Image */}
          <motion.div
            initial={mounted ? { opacity: 0, x: -30 } : {}}
            animate={mounted ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative aspect-square overflow-hidden rounded-lg border border-white/10"
          >
            <Image
              src={music.coverImage}
              alt={music.title}
              fill
              className="object-contain"
              priority
            />
          </motion.div>

          {/* Right: Details */}
          <motion.div
            initial={mounted ? { opacity: 0, x: 30 } : {}}
            animate={mounted ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="flex flex-col justify-center space-y-6"
          >
            {/* Category Badge */}
            <div>
              <span className="inline-block rounded-full border border-white/30 px-4 py-1.5 text-xs uppercase tracking-wider">
                {music.category}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-4xl font-light tracking-wide md:text-5xl">
              {music.title}
            </h1>

            {/* Duration */}
            <div className="flex items-center gap-2 text-white/70">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" />
              </svg>
              <span>{music.duration}</span>
            </div>

            {/* Description */}
            <p className="text-lg leading-relaxed text-white/90">
              {music.description}
            </p>

            {/* Story (if available) */}
            {music.story && (
              <div className="rounded-lg border border-white/10 bg-white/5 p-6">
                <h3 className="mb-3 text-sm font-medium uppercase tracking-wider text-white/70">
                  Artist's Note
                </h3>
                <p className="leading-relaxed text-white/80">{music.story}</p>
              </div>
            )}

            {/* Release Date */}
            <div className="text-sm text-white/50">
              Released on{" "}
              {new Date(music.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>

            {/* Play Button (Placeholder) */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center justify-center gap-3 rounded-full border border-white/30 bg-white px-8 py-4 text-black transition-all hover:bg-white/90"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
              </svg>
              <span className="font-medium">PLAY TRACK</span>
            </motion.button>
          </motion.div>
        </div>

        {/* Lyrics Section */}
        {music.lyrics && (
          <motion.div
            initial={mounted ? { opacity: 0, y: 30 } : {}}
            animate={mounted ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-16 border-t border-white/10 pt-12"
          >
            <h2 className="mb-8 text-2xl font-light tracking-wide">Lyrics</h2>
            <pre className="whitespace-pre-wrap font-sans leading-loose text-white/80">
              {music.lyrics}
            </pre>
          </motion.div>
        )}
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
