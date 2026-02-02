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

// Mock data
const mockArtworks = [
  {
    _id: "1",
    title: "Chaotic Dreams",
    slug: { current: "chaotic-dreams" },
    image: "/mni-artwork-sample.png",
    description:
      "A spontaneous doodle capturing the chaotic yet lovely essence of everyday dreams. Drawn in one sitting with no regrets.",
    category: "doodle",
    createdAt: "2026-01-28",
    featured: true,
  },
  {
    _id: "2",
    title: "Black Briar Skater",
    slug: { current: "black-briar-skater" },
    image: "/mni-artwork-sample.png",
    description:
      "A happy skateboarder living their best life. Simple lines, pure vibes.",
    category: "character",
    createdAt: "2026-01-25",
    featured: false,
  },
  {
    _id: "3",
    title: "Curious Cat",
    slug: { current: "curious-cat" },
    image: "/mni-artwork-sample.png",
    description:
      "A cat with big eyes wondering about the universe. Aren't we all?",
    category: "doodle",
    createdAt: "2026-01-22",
    featured: true,
  },
  {
    _id: "4",
    title: "House B",
    slug: { current: "house-b" },
    image: "/mni-artwork-sample.png",
    description:
      "A simple house with a big 'B'. Maybe it stands for 'Beautiful' or 'Brave'. You decide.",
    category: "sketch",
    createdAt: "2026-01-20",
    featured: false,
  },
  {
    _id: "5",
    title: "Urban Building",
    slug: { current: "urban-building" },
    image: "/mni-artwork-sample.png",
    description:
      "A tall building with windows. Each window tells a story we'll never know.",
    category: "sketch",
    createdAt: "2026-01-18",
    featured: false,
  },
  {
    _id: "6",
    title: "Mystery Box",
    slug: { current: "mystery-box" },
    image: "/mni-artwork-sample.png",
    description:
      "An open box with wild lines coming out. Is it chaos? Is it creativity? Yes.",
    category: "illustration",
    createdAt: "2026-01-15",
    featured: true,
  },
];

export default function ArtworksClient() {
  const [mounted, setMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Use mock data (Sanity can be integrated later via client-side fetch)
  const artworks = mockArtworks;
  const usingSanity = false;

  useEffect(() => {
    setMounted(true);
  }, []);

  // Get unique categories
  const categories = [
    "all",
    ...Array.from(new Set(artworks.map((a) => a.category).filter(Boolean))),
  ];

  // Filter artworks
  const filteredArtworks = artworks.filter((artwork) => {
    const matchesSearch =
      artwork.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      artwork.description?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === "all" || artwork.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  // Pagination
  const totalPages = Math.ceil(filteredArtworks.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedArtworks = filteredArtworks.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory]);

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

          {/* Search and Filter Section */}
          <motion.div
            initial={mounted ? { opacity: 0, y: 20 } : false}
            animate={mounted ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-8 space-y-4"
          >
            {/* Search Bar */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search artworks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 pl-12 text-white placeholder-white/50 backdrop-blur-sm transition-all focus:border-white/30 focus:outline-none focus:ring-2 focus:ring-white/20"
              />
              <svg
                className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-white/50"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 transition-colors hover:text-white"
                >
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              )}
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`rounded-full px-4 py-2 text-sm font-light tracking-wide transition-all ${
                    selectedCategory === category
                      ? "bg-white text-black"
                      : "border border-white/30 text-white hover:border-white/50 hover:bg-white/10"
                  }`}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>

            {/* Results Count */}
            <p className="text-sm text-white/50">
              {filteredArtworks.length} {filteredArtworks.length === 1 ? "artwork" : "artworks"} found
            </p>
          </motion.div>
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
            {paginatedArtworks.map((artwork, index) => {
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
        {filteredArtworks.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="py-20 text-center"
          >
            <svg
              className="mx-auto mb-4 h-16 w-16 text-white/20"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p className="text-lg text-gray-500">
              {searchQuery || selectedCategory !== "all"
                ? "No artworks match your search criteria."
                : "No artworks yet. Check back soon!"}
            </p>
            {(searchQuery || selectedCategory !== "all") && (
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("all");
                }}
                className="mt-4 rounded-full border border-white/30 px-6 py-2 text-sm transition-colors hover:bg-white/10"
              >
                Clear filters
              </button>
            )}
          </motion.div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-12 flex items-center justify-center gap-2"
          >
            {/* Previous Button */}
            <button
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="rounded-lg border border-white/30 px-4 py-2 text-sm transition-all hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-30"
            >
              ← Previous
            </button>

            {/* Page Numbers */}
            <div className="flex gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`h-10 w-10 rounded-lg text-sm transition-all ${
                      currentPage === page
                        ? "bg-white text-black"
                        : "border border-white/30 hover:bg-white/10"
                    }`}
                  >
                    {page}
                  </button>
                )
              )}
            </div>

            {/* Next Button */}
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(totalPages, prev + 1))
              }
              disabled={currentPage === totalPages}
              className="rounded-lg border border-white/30 px-4 py-2 text-sm transition-all hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-30"
            >
              Next →
            </button>
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
