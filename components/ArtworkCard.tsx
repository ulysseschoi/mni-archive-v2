"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

interface ArtworkCardProps {
  title: string;
  slug: string;
  image: string;
  description?: string;
  category?: string;
  index?: number;
}

export default function ArtworkCard({
  title,
  slug,
  image,
  description,
  category,
  index = 0,
}: ArtworkCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group"
    >
      <Link href={`/artworks/${slug}`}>
        <div className="relative aspect-square overflow-hidden bg-gray-900 border border-white/10 hover:border-white/30 transition-all duration-300">
          {/* Image */}
          <div className="relative w-full h-full">
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/70 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
            <div className="text-center px-6">
              <h3 className="text-xl font-light mb-2">{title}</h3>
              {description && (
                <p className="text-sm text-gray-300 line-clamp-3">
                  {description}
                </p>
              )}
            </div>
          </div>

          {/* Category Badge */}
          {category && (
            <div className="absolute top-4 right-4 bg-black/80 px-3 py-1 text-xs tracking-wider border border-white/20">
              {category}
            </div>
          )}
        </div>

        {/* Title (visible on mobile) */}
        <div className="mt-3 lg:hidden">
          <h3 className="text-base font-light">{title}</h3>
          {category && (
            <p className="text-xs text-gray-500 mt-1 uppercase tracking-wider">
              {category}
            </p>
          )}
        </div>
      </Link>
    </motion.div>
  );
}
