"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

// Simple mock data without dynamic routes
const mockArtworks = [
  {
    _id: "1",
    title: "Chaotic Dreams",
    image: "/mni-artwork-sample.png",
    description: "A spontaneous doodle capturing the chaotic yet lovely essence of everyday dreams.",
    category: "doodle",
  },
  {
    _id: "2",
    title: "Black Briar Skater",
    image: "/mni-artwork-sample.png",
    description: "A happy skateboarder living their best life. Simple lines, pure vibes.",
    category: "character",
  },
  {
    _id: "3",
    title: "Curious Cat",
    image: "/mni-artwork-sample.png",
    description: "A cat with big eyes wondering about the universe.",
    category: "doodle",
  },
  {
    _id: "4",
    title: "House B",
    image: "/mni-artwork-sample.png",
    description: "A simple house with a big 'B'. Maybe it stands for 'Beautiful' or 'Brave'.",
    category: "sketch",
  },
  {
    _id: "5",
    title: "Urban Building",
    image: "/mni-artwork-sample.png",
    description: "A tall building with windows. Each window tells a story we'll never know.",
    category: "sketch",
  },
  {
    _id: "6",
    title: "Mystery Box",
    image: "/mni-artwork-sample.png",
    description: "An open box with wild lines coming out. Is it chaos? Is it creativity? Yes.",
    category: "illustration",
  },
];

export default function ArtworksPage() {
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
        <motion.h1
          initial={mounted ? { opacity: 0 } : {}}
          animate={mounted ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-4xl font-light tracking-wide md:text-6xl"
        >
          Artworks
        </motion.h1>
        <motion.p
          initial={mounted ? { opacity: 0 } : {}}
          animate={mounted ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-4 text-white/70"
        >
          Visual creations from the chaotic yet lovely universe
        </motion.p>
      </motion.header>

      {/* Artworks Grid */}
      <section className="px-6 py-12 md:px-12 md:py-16">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {mockArtworks.map((artwork, index) => (
            <motion.div
              key={artwork._id}
              initial={mounted ? { opacity: 0, y: 50 } : {}}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              {/* Image Container */}
              <div className="relative aspect-square overflow-hidden border border-white/10 bg-gray-900 transition-all duration-300 hover:border-white/30">
                <Image
                  src={artwork.image}
                  alt={artwork.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                
                {/* Category Badge */}
                {artwork.category && (
                  <div className="absolute right-4 top-4 border border-white/20 bg-black/80 px-3 py-1 text-xs tracking-wider">
                    {artwork.category}
                  </div>
                )}
              </div>

              {/* Title & Description */}
              <div className="mt-3">
                <h3 className="text-base font-light">{artwork.title}</h3>
                {artwork.description && (
                  <p className="mt-1 text-sm text-gray-500 line-clamp-2">
                    {artwork.description}
                  </p>
                )}
              </div>
            </motion.div>
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
