"use client";

import { motion } from "framer-motion";
import ArtworkCard from "@/components/ArtworkCard";
import { useState, useEffect } from "react";

interface Artwork {
  _id: string;
  title: string;
  slug: { current: string } | string;
  image: string | any;
  description?: string;
  category?: string;
  createdAt?: string;
  featured?: boolean;
}

interface ArtworksClientProps {
  artworks: Artwork[];
  usingSanity: boolean;
}

export default function ArtworksClient({
  artworks,
  usingSanity,
}: ArtworksClientProps) {
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
        <div className="mx-auto max-w-7xl px-6 py-12 sm:px-8 md:px-12">
          <div className="flex items-center justify-between">
            <div>
              <motion.a
                href="/"
                initial={mounted ? { opacity: 0, x: -20 } : false}
                animate={mounted ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-sm tracking-widest transition-colors hover:text-gray-400"
              >
                ← BACK TO HOME
              </motion.a>
              <motion.h1
                initial={mounted ? { opacity: 0, y: 20 } : false}
                animate={mounted ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="mb-4 mt-6 text-4xl font-light tracking-wide sm:text-5xl md:text-6xl"
              >
                Artworks
              </motion.h1>
              <motion.p
                initial={mounted ? { opacity: 0 } : false}
                animate={mounted ? { opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-lg font-light text-gray-400"
              >
                A collection of doodles, sketches, and creative chaos.
              </motion.p>
              
              {/* Data Source Indicator */}
              {!usingSanity && (
                <motion.div
                  initial={mounted ? { opacity: 0 } : false}
                  animate={mounted ? { opacity: 1 } : {}}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="mt-4 inline-block rounded-full border border-yellow-500/30 bg-yellow-500/10 px-3 py-1 text-xs text-yellow-500"
                >
                  Using mock data - Configure Sanity to see real content
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </motion.header>

      {/* Artworks Grid */}
      <section className="mx-auto max-w-7xl px-6 py-16 sm:px-8 md:px-12">
        <motion.div
          initial={mounted ? { opacity: 0 } : false}
          animate={mounted ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {artworks.map((artwork, index) => {
              const slug =
                typeof artwork.slug === "string"
                  ? artwork.slug
                  : artwork.slug.current;
              const image =
                typeof artwork.image === "string"
                  ? artwork.image
                  : artwork.image?.asset?.url || "/mni-artwork-sample.png";

              return (
                <ArtworkCard
                  key={artwork._id}
                  title={artwork.title}
                  slug={slug}
                  image={image}
                  description={artwork.description}
                  category={artwork.category}
                  index={index}
                />
              );
            })}
          </div>
        </motion.div>

        {/* Empty State Message */}
        {artworks.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="py-20 text-center"
          >
            <p className="text-lg text-gray-500">
              No artworks yet. Check back soon!
            </p>
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
