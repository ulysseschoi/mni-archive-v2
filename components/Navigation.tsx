"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";

const navItems = [
  { name: "Home", path: "/" },
  { name: "Drops", path: "/drops" },
  { name: "Shop", path: "/shop" },
  { name: "Artworks", path: "/artworks" },
  { name: "Music", path: "/music" },
  // Hidden for future use
  // { name: "Videos", path: "/videos" },
  // { name: "Writings", path: "/writings" },
];

export default function Navigation() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, loading } = useAuth();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Close mobile menu when pathname changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

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
          href="/?intro=true"
          className="text-xl font-light tracking-wider link-hover"
        >
          MNI
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <ul className="flex items-center gap-8">
            {navItems.map((item) => {
              const isActive =
                pathname === item.path ||
                (item.path !== "/" && pathname.startsWith(item.path));

              return (
                <li key={item.path}>
                  <Link
                    href={item.path}
                    className={`relative text-sm font-light tracking-wide link-hover ${
                      isActive ? "text-white" : "text-white/60 hover:text-white"
                    }`}
                  >
                    {item.name}
                    {isActive && (
                      <motion.div
                        layoutId="activeNav"
                        className="absolute -bottom-1 left-0 h-px w-full bg-white"
                        transition={{ duration: 0.3, ease: "easeOut" }}
                      />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Auth Button */}
          {!loading && (
            <Link
              href={user ? "/profile" : "/auth"}
              className="text-sm font-light tracking-wide text-white/60 hover:text-white link-hover"
            >
              {user ? "Profile" : "Sign In"}
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="text-white md:hidden"
          onClick={toggleMobileMenu}
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {mobileMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      <motion.div
        initial={false}
        animate={mobileMenuOpen ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="overflow-hidden border-t border-white/10 md:hidden"
      >
        <ul className="space-y-1 px-6 py-4">
          {navItems.map((item) => {
            const isActive =
              pathname === item.path ||
              (item.path !== "/" && pathname.startsWith(item.path));

            return (
              <li key={item.path}>
                <Link
                  href={item.path}
                  onClick={closeMobileMenu}
                  className={`block py-2 text-sm font-light tracking-wide transition-colors ${
                    isActive ? "text-white" : "text-white/60"
                  }`}
                >
                  {item.name}
                </Link>
              </li>
            );
          })}
          {/* Mobile Auth Button */}
          {!loading && (
            <li>
              <Link
                href={user ? "/profile" : "/auth"}
                onClick={closeMobileMenu}
                className="block py-2 text-sm font-light tracking-wide text-white/60"
              >
                {user ? "Profile" : "Sign In"}
              </Link>
            </li>
          )}
        </ul>
      </motion.div>
    </motion.nav>
  );
}
