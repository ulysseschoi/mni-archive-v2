"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

// Mock data
const mockArtworks: Record<string, any> = {
  "chaotic-dreams": {
    title: "Chaotic Dreams",
    image: "/mni-artwork-sample.png",
    description: "A spontaneous doodle capturing the chaotic yet lovely essence of everyday dreams. Drawn in one sitting with no regrets. This piece represents the beautiful mess that is creativity – unplanned, unfiltered, and unapologetically chaotic.",
    category: "doodle",
    createdAt: "2026-01-28",
    featured: true,
  },
  "black-briar-skater": {
    title: "Black Briar Skater",
    image: "/mni-artwork-sample.png",
    description: "A happy skateboarder living their best life. Simple lines, pure vibes. This character reminds us to find joy in movement and freedom in simplicity.",
    category: "character",
    createdAt: "2026-01-25",
  },
  "curious-cat": {
    title: "Curious Cat",
    image: "/mni-artwork-sample.png",
    description: "A cat with big eyes wondering about the universe. Aren't we all just curious cats trying to make sense of the world? This piece celebrates curiosity and wonder.",
    category: "doodle",
    createdAt: "2026-01-22",
  },
  "house-b": {
    title: "House B",
    image: "/mni-artwork-sample.png",
    description: "A simple house with a big 'B'. Maybe it stands for 'Beautiful' or 'Brave'. You decide what B means to you. Home is where the heart is, after all.",
    category: "sketch",
    createdAt: "2026-01-20",
  },
  "urban-building": {
    title: "Urban Building",
    image: "/mni-artwork-sample.png",
    description: "A tall building with windows. Each window tells a story we'll never know. Urban life captured in simple lines – complex yet familiar.",
    category: "sketch",
    createdAt: "2026-01-18",
  },
  "mystery-box": {
    title: "Mystery Box",
    image: "/mni-artwork-sample.png",
    description: "An open box with wild lines coming out. Is it chaos? Is it creativity? Yes. This represents the unpredictable nature of inspiration – you never know what comes out when you open yourself up to creativity.",
    category: "illustration",
    createdAt: "2026-01-15",
  },
};

export default function ArtworkDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const slug = params.slug as string;
  const artwork = mockArtworks[slug];

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!artwork) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-light mb-4">Artwork Not Found</h1>
          <button
            onClick={() => router.push("/artworks")}
            className="text-sm tracking-widest hover:text-gray-400 transition-colors"
          >
            ← BACK TO ARTWORKS
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <motion.nav
        initial={mounted ? { opacity: 0, y: -20 } : false}
        animate={mounted ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="border-b border-white/10"
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12 py-6">
          <button
            onClick={() => router.push("/artworks")}
            className="text-sm tracking-widest hover:text-gray-400 transition-colors"
          >
            ← BACK TO ARTWORKS
          </button>
        </div>
      </motion.nav>

      {/* Content */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Image */}
          <motion.div
            initial={mounted ? { opacity: 0, x: -50 } : false}
            animate={mounted ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative aspect-square"
          >
            <div className="relative w-full h-full border border-white/10">
              <Image
                src={artwork.image}
                alt={artwork.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          </motion.div>

          {/* Details */}
          <motion.div
            initial={mounted ? { opacity: 0, x: 50 } : false}
            animate={mounted ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col justify-center"
          >
            {/* Category Badge */}
            {artwork.category && (
              <motion.div
                initial={mounted ? { opacity: 0, y: 20 } : false}
                animate={mounted ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="inline-block mb-6"
              >
                <span className="text-xs tracking-widest uppercase text-gray-500 border border-white/20 px-4 py-2">
                  {artwork.category}
                </span>
              </motion.div>
            )}

            {/* Title */}
            <motion.h1
              initial={mounted ? { opacity: 0, y: 20 } : false}
              animate={mounted ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-4xl sm:text-5xl md:text-6xl font-light tracking-wide mb-6"
            >
              {artwork.title}
            </motion.h1>

            {/* Date */}
            <motion.p
              initial={mounted ? { opacity: 0 } : false}
              animate={mounted ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-sm text-gray-500 tracking-wider mb-8"
            >
              {new Date(artwork.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </motion.p>

            {/* Description */}
            <motion.div
              initial={mounted ? { opacity: 0, y: 20 } : false}
              animate={mounted ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="space-y-4"
            >
              <p className="text-lg text-gray-300 font-light leading-relaxed">
                {artwork.description}
              </p>
            </motion.div>

            {/* Actions */}
            <motion.div
              initial={mounted ? { opacity: 0, y: 20 } : false}
              animate={mounted ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="mt-12 flex gap-4"
            >
              <button
                onClick={() => router.push("/artworks")}
                className="border border-white px-8 py-3 text-sm tracking-widest hover:bg-white hover:text-black transition-all duration-300"
              >
                VIEW ALL ARTWORKS
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="border-t border-white/10 py-12 text-center text-sm text-gray-500 mt-20"
      >
        <p className="font-light tracking-wide">
          © 2026 MNI Archive. All rights reserved.
        </p>
      </motion.footer>
    </div>
  );
}
