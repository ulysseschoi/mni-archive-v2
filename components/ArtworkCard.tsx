"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Lightbox from "./Lightbox";

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
  const [lightboxOpen, setLightboxOpen] = useState(false);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        className="group"
      >
        {/* Image Container - Click opens Lightbox */}
        <div
          onClick={() => setLightboxOpen(true)}
          className="relative aspect-square cursor-pointer overflow-hidden border border-white/10 bg-gray-900 transition-all duration-300 hover:border-white/30"
        >
          {/* Image */}
          <div className="relative h-full w-full">
            <Image
              src={image}
              alt={title}
              fill
              className="object-contain transition-transform duration-500 group-hover:scale-105"
            />
          </div>

          {/* Overlay */}
          <div className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-all duration-300 group-hover:bg-black/70 group-hover:opacity-100">
            <div className="px-6 text-center">
              <div className="mb-4 flex justify-center">
                <svg
                  className="h-8 w-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-light">{title}</h3>
              {description && (
                <p className="line-clamp-3 text-sm text-gray-300">
                  {description}
                </p>
              )}
            </div>
          </div>

          {/* Category Badge */}
          {category && (
            <div className="absolute right-4 top-4 border border-white/20 bg-black/80 px-3 py-1 text-xs tracking-wider">
              {category}
            </div>
          )}
        </div>

        {/* Title & Link (visible on mobile) */}
        <div className="mt-3 lg:hidden">
          <h3 className="text-base font-light">{title}</h3>
          {category && (
            <p className="mt-1 text-xs uppercase tracking-wider text-gray-500">
              {category}
            </p>
          )}
          <Link
            href={`/artworks/${slug}`}
            className="mt-2 inline-block text-sm text-white/70 underline transition-colors hover:text-white"
          >
            View Details →
          </Link>
        </div>
      </motion.div>

      {/* Lightbox */}
      <Lightbox
        isOpen={lightboxOpen}
        image={image}
        title={title}
        description={description}
        onClose={() => setLightboxOpen(false)}
      />
    </>
  );
}
