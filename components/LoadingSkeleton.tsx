import { motion } from "framer-motion";

interface LoadingSkeletonProps {
  variant?: "grid" | "card" | "text" | "profile";
  count?: number;
}

export default function LoadingSkeleton({ variant = "card", count = 6 }: LoadingSkeletonProps) {
  const shimmer = {
    hidden: { x: "-100%" },
    visible: {
      x: "100%",
      transition: {
        repeat: Infinity,
        duration: 1.5,
        ease: "linear",
      },
    },
  };

  // Grid Layout (for artworks, music, etc.)
  if (variant === "grid") {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="relative overflow-hidden">
            {/* Image Skeleton */}
            <div className="aspect-square bg-white/5 mb-4 relative overflow-hidden">
              <motion.div
                variants={shimmer}
                initial="hidden"
                animate="visible"
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
              />
            </div>
            {/* Title Skeleton */}
            <div className="h-6 bg-white/5 mb-2 w-3/4 relative overflow-hidden">
              <motion.div
                variants={shimmer}
                initial="hidden"
                animate="visible"
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
              />
            </div>
            {/* Description Skeleton */}
            <div className="h-4 bg-white/5 w-1/2 relative overflow-hidden">
              <motion.div
                variants={shimmer}
                initial="hidden"
                animate="visible"
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
              />
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Card Layout (for drops, shop)
  if (variant === "card") {
    return (
      <div className="space-y-6">
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="border border-white/10 p-6">
            <div className="flex gap-6">
              {/* Image */}
              <div className="w-32 h-32 bg-white/5 flex-shrink-0 relative overflow-hidden">
                <motion.div
                  variants={shimmer}
                  initial="hidden"
                  animate="visible"
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
                />
              </div>
              {/* Content */}
              <div className="flex-1 space-y-3">
                <div className="h-6 bg-white/5 w-2/3 relative overflow-hidden">
                  <motion.div
                    variants={shimmer}
                    initial="hidden"
                    animate="visible"
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
                  />
                </div>
                <div className="h-4 bg-white/5 w-full relative overflow-hidden">
                  <motion.div
                    variants={shimmer}
                    initial="hidden"
                    animate="visible"
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
                  />
                </div>
                <div className="h-4 bg-white/5 w-3/4 relative overflow-hidden">
                  <motion.div
                    variants={shimmer}
                    initial="hidden"
                    animate="visible"
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Text Layout (for profile, details)
  if (variant === "text") {
    return (
      <div className="space-y-4">
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="space-y-2">
            <div className="h-5 bg-white/5 w-full relative overflow-hidden">
              <motion.div
                variants={shimmer}
                initial="hidden"
                animate="visible"
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
              />
            </div>
            <div className="h-5 bg-white/5 w-4/5 relative overflow-hidden">
              <motion.div
                variants={shimmer}
                initial="hidden"
                animate="visible"
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
              />
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Profile Layout
  if (variant === "profile") {
    return (
      <div className="space-y-8">
        {/* Header Skeleton */}
        <div className="space-y-4">
          <div className="h-12 bg-white/5 w-1/2 relative overflow-hidden">
            <motion.div
              variants={shimmer}
              initial="hidden"
              animate="visible"
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
            />
          </div>
          <div className="h-6 bg-white/5 w-1/3 relative overflow-hidden">
            <motion.div
              variants={shimmer}
              initial="hidden"
              animate="visible"
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
            />
          </div>
        </div>

        {/* Tabs Skeleton */}
        <div className="flex gap-8 border-b border-white/10 pb-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-6 bg-white/5 w-24 relative overflow-hidden">
              <motion.div
                variants={shimmer}
                initial="hidden"
                animate="visible"
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
              />
            </div>
          ))}
        </div>

        {/* Content Skeleton */}
        <div className="grid md:grid-cols-2 gap-6">
          {[1, 2].map((i) => (
            <div key={i} className="border border-white/10 p-6 space-y-4">
              <div className="h-6 bg-white/5 w-1/2 relative overflow-hidden">
                <motion.div
                  variants={shimmer}
                  initial="hidden"
                  animate="visible"
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
                />
              </div>
              {[1, 2, 3].map((j) => (
                <div key={j} className="space-y-2">
                  <div className="h-3 bg-white/5 w-1/4 relative overflow-hidden">
                    <motion.div
                      variants={shimmer}
                      initial="hidden"
                      animate="visible"
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
                    />
                  </div>
                  <div className="h-5 bg-white/5 w-3/4 relative overflow-hidden">
                    <motion.div
                      variants={shimmer}
                      initial="hidden"
                      animate="visible"
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
                    />
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return null;
}
