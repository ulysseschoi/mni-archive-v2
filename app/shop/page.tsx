"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function ShopPage() {
  return (
    <main className="min-h-screen bg-black text-white pt-24 pb-16 px-6">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-7xl font-light tracking-wider mb-4">
            SHOP
          </h1>
          <p className="text-lg md:text-xl text-gray-400 font-light tracking-wide">
            Wearable Artwork · Limited Edition Only
          </p>
        </motion.div>

        {/* Coming Soon */}
        <div className="text-center py-20">
          <p className="text-2xl font-light mb-4">COMING SOON</p>
          <p className="text-gray-500 mb-8">
            Shopify integration in progress
          </p>
          <div className="max-w-2xl mx-auto text-left space-y-4 text-gray-600 text-sm">
            <p>✅ Shopify Storefront API client configured</p>
            <p>✅ GraphQL queries ready</p>
            <p>✅ TypeScript types defined</p>
            <p>⏳ Shop pages ready (see SHOPIFY_SETUP.md)</p>
            <p>⏳ Product detail modal pending</p>
            <p>⏳ Cart functionality pending</p>
          </div>
        </div>
      </div>
    </main>
  );
}
