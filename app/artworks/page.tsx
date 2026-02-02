"use client";

import { motion } from "framer-motion";
import ArtworkCard from "@/components/ArtworkCard";
import { useState, useEffect } from "react";

// Mock data using the sample image
const mockArtworks = [
  {
    _id: "1",
    title: "Chaotic Dreams",
    slug: "chaotic-dreams",
    image: "/mni-artwork-sample.png",
    description: "A spontaneous doodle capturing the chaotic yet lovely essence of everyday dreams. Drawn in one sitting with no regrets.",
    category: "doodle",
    createdAt: "2026-01-28",
    featured: true,
  },
  {
    _id: "2",
    title: "Black Briar Skater",
    slug: "black-briar-skater",
    image: "/mni-artwork-sample.png",
    description: "A happy skateboarder living their best life. Simple lines, pure vibes.",
    category: "character",
    createdAt: "2026-01-25",
    featured: false,
  },
  {
    _id: "3",
    title: "Curious Cat",
    slug: "curious-cat",
    image: "/mni-artwork-sample.png",
    description: "A cat with big eyes wondering about the universe. Aren't we all?",
    category: "doodle",
    createdAt: "2026-01-22",
    featured: true,
  },
  {
    _id: "4",
    title: "House B",
    slug: "house-b",
    image: "/mni-artwork-sample.png",
    description: "A simple house with a big 'B'. Maybe it stands for 'Beautiful' or 'Brave'. You decide.",
    category: "sketch",
    createdAt: "2026-01-20",
    featured: false,
  },
  {
    _id: "5",
    title: "Urban Building",
    slug: "urban-building",
    image: "/mni-artwork-sample.png",
    description: "A tall building with windows. Each window tells a story we'll never know.",
    category: "sketch",
    createdAt: "2026-01-18",
    featured: false,
  },
  {
    _id: "6",
    title: "Mystery Box",
    slug: "mystery-box",
    image: "/mni-artwork-sample.png",
    description: "An open box with wild lines coming out. Is it chaos? Is it creativity? Yes.",
    category: "illustration",
    createdAt: "2026-01-15",
    featured: true,
  },
];

export default function ArtworksPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <motion.header
        initial={mounted ? { opacity: 0, y: -20 } : false}
        animate={mounted ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="border-b border-white/10"
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12 py-12">
          <div className="flex items-center justify-between">
            <div>
              <motion.a
                href="/"
                initial={mounted ? { opacity: 0, x: -20 } : false}
                animate={mounted ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-sm tracking-widest hover:text-gray-400 transition-colors"
              >
                ← BACK TO HOME
              </motion.a>
              <motion.h1
                initial={mounted ? { opacity: 0, y: 20 } : false}
                animate={mounted ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-4xl sm:text-5xl md:text-6xl font-light tracking-wide mt-6 mb-4"
              >
                Artworks
              </motion.h1>
              <motion.p
                initial={mounted ? { opacity: 0 } : false}
                animate={mounted ? { opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-gray-400 text-lg font-light"
              >
                A collection of doodles, sketches, and creative chaos.
              </motion.p>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Artworks Grid */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12 py-16">
        <motion.div
          initial={mounted ? { opacity: 0 } : false}
          animate={mounted ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {mockArtworks.map((artwork, index) => (
              <ArtworkCard
                key={artwork._id}
                title={artwork.title}
                slug={artwork.slug}
                image={artwork.image}
                description={artwork.description}
                category={artwork.category}
                index={index}
              />
            ))}
          </div>
        </motion.div>

        {/* Empty State Message */}
        {mockArtworks.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <p className="text-gray-500 text-lg">No artworks yet. Check back soon!</p>
          </motion.div>
        )}
      </section>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="border-t border-white/10 py-12 text-center text-sm text-gray-500"
      >
        <p className="font-light tracking-wide">
          © 2026 MNI Archive. All rights reserved.
        </p>
      </motion.footer>
    </div>
  );
}
