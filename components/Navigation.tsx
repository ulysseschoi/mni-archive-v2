"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const navItems = [
  { name: "Home", path: "/" },
  { name: "Artworks", path: "/artworks" },
  { name: "Music", path: "/music" },
  { name: "Videos", path: "/videos" },
  { name: "Writings", path: "/writings" },
];

export default function Navigation() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <motion.nav
      initial={mounted ? { opacity: 0, y: -20 } : {}}
      animate={mounted ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className="fixed top-0 z-50 w-full border-b border-white/10 bg-black/80 backdrop-blur-sm"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-12">
        {/* Logo */}
        <Link
          href="/"
          className="text-xl font-light tracking-wider transition-colors hover:text-white/80"
        >
          MNI
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => {
            const isActive =
              pathname === item.path ||
              (item.path !== "/" && pathname.startsWith(item.path));

            return (
              <li key={item.path}>
                <Link
                  href={item.path}
                  className={`relative text-sm font-light tracking-wide transition-colors ${
                    isActive ? "text-white" : "text-white/60 hover:text-white"
                  }`}
                >
                  {item.name}
                  {isActive && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute -bottom-1 left-0 h-px w-full bg-white"
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Mobile Menu Button */}
        <button
          className="text-white md:hidden"
          onClick={() => {
            const menu = document.getElementById("mobile-menu");
            if (menu) {
              menu.classList.toggle("hidden");
            }
          }}
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      <div id="mobile-menu" className="hidden border-t border-white/10 md:hidden">
        <ul className="space-y-1 px-6 py-4">
          {navItems.map((item) => {
            const isActive =
              pathname === item.path ||
              (item.path !== "/" && pathname.startsWith(item.path));

            return (
              <li key={item.path}>
                <Link
                  href={item.path}
                  className={`block py-2 text-sm font-light tracking-wide transition-colors ${
                    isActive ? "text-white" : "text-white/60"
                  }`}
                >
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </motion.nav>
  );
}
