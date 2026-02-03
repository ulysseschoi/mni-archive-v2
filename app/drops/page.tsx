"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

// Mock data - 실제로는 Sanity/Supabase에서 가져올 데이터
const upcomingDrop = {
  id: 1,
  title: "MNI ARCHIVE #01",
  subtitle: "The First Collection",
  description: "미노이의 손그림이 의류가 되다. 세상에 단 100벌만 존재하는 한정판.",
  dropDate: new Date("2026-02-15T19:00:00"), // KST 7PM
  image: "/artworks/b-house.png",
  limitedQuantity: 100,
  price: "₩89,000",
};

const pastDrops = [
  {
    id: 2,
    title: "PRE-LAUNCH ARCHIVE",
    date: "2026.01.28",
    status: "SOLD OUT",
    quantity: "50/50",
    image: "/artworks/cat-friend.png",
  },
];

export default function DropsPage() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [isDropLive, setIsDropLive] = useState(false);

  // Countdown timer logic
  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = upcomingDrop.dropDate.getTime() - now.getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
        setIsDropLive(false);
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        setIsDropLive(true);
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  // Email notification signup
  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // TODO: Supabase에 이메일 저장
      const response = await fetch("/api/drops/notify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, dropId: upcomingDrop.id }),
      });

      if (response.ok) {
        setSubmitStatus("success");
        setEmail("");
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus("idle"), 3000);
    }
  };

  return (
    <main className="min-h-screen bg-black text-white pt-24 pb-16 px-6">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-7xl font-light tracking-wider mb-4">
            DROPS
          </h1>
          <p className="text-lg md:text-xl text-gray-400 font-light tracking-wide">
            Limited Edition · First Come First Served
          </p>
        </motion.div>

        {/* Upcoming Drop - Hero Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-24"
        >
          <div className="relative border border-white/10 overflow-hidden">
            {/* Status Badge */}
            <div className="absolute top-6 right-6 z-10">
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className={`px-4 py-2 ${
                  isDropLive
                    ? "bg-red-500 text-white"
                    : "bg-white/10 text-white backdrop-blur-sm"
                } text-xs font-bold tracking-widest`}
              >
                {isDropLive ? "🔴 LIVE NOW" : "COMING SOON"}
              </motion.div>
            </div>

            <div className="grid md:grid-cols-2 gap-0">
              {/* Left: Image */}
              <div className="relative aspect-square md:aspect-auto">
                <img
                  src={upcomingDrop.image}
                  alt={upcomingDrop.title}
                  className="w-full h-full object-cover"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              </div>

              {/* Right: Info */}
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <h2 className="text-3xl md:text-5xl font-bold tracking-wider mb-4">
                  {upcomingDrop.title}
                </h2>
                <p className="text-xl md:text-2xl font-light text-gray-400 mb-6">
                  {upcomingDrop.subtitle}
                </p>
                <p className="text-base md:text-lg font-light text-gray-300 mb-8 leading-relaxed">
                  {upcomingDrop.description}
                </p>

                {/* Limited Quantity */}
                <div className="mb-8">
                  <p className="text-sm text-gray-500 mb-2 tracking-wider">LIMITED TO</p>
                  <p className="text-3xl font-bold text-white">
                    {upcomingDrop.limitedQuantity}{" "}
                    <span className="text-xl font-light text-gray-400">pieces</span>
                  </p>
                </div>

                {/* Price */}
                <div className="mb-8">
                  <p className="text-sm text-gray-500 mb-2 tracking-wider">PRICE</p>
                  <p className="text-3xl font-bold text-white">{upcomingDrop.price}</p>
                </div>

                {/* Countdown Timer */}
                {!isDropLive && (
                  <div className="mb-8">
                    <p className="text-sm text-gray-500 mb-4 tracking-wider">DROPS IN</p>
                    <div className="grid grid-cols-4 gap-4">
                      {[
                        { label: "DAYS", value: timeLeft.days },
                        { label: "HOURS", value: timeLeft.hours },
                        { label: "MINS", value: timeLeft.minutes },
                        { label: "SECS", value: timeLeft.seconds },
                      ].map((item) => (
                        <div
                          key={item.label}
                          className="text-center border border-white/10 p-4"
                        >
                          <div className="text-3xl md:text-4xl font-bold mb-1">
                            {String(item.value).padStart(2, "0")}
                          </div>
                          <div className="text-xs text-gray-500 tracking-wider">
                            {item.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* CTA Button */}
                {isDropLive ? (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-white text-black py-4 font-bold text-lg tracking-wider hover:bg-gray-200 transition-colors"
                  >
                    SHOP NOW
                  </motion.button>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full border border-white/30 text-white py-4 font-bold text-lg tracking-wider hover:bg-white/10 transition-colors"
                    disabled
                  >
                    NOT YET AVAILABLE
                  </motion.button>
                )}
              </div>
            </div>
          </div>
        </motion.section>

        {/* Email Notification Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-24"
        >
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-2xl md:text-3xl font-light tracking-wider mb-4">
              Get Notified
            </h3>
            <p className="text-gray-400 font-light mb-8">
              드롭 시작 30분 전에 이메일로 알려드립니다. 놓치지 마세요.
            </p>

            <form onSubmit={handleEmailSubmit} className="flex gap-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                disabled={isSubmitting}
                className="flex-1 bg-black border border-white/30 px-6 py-4 text-white placeholder-gray-600 focus:outline-none focus:border-white/60 transition-colors disabled:opacity-50"
              />
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={isSubmitting}
                className="px-8 py-4 bg-white text-black font-bold tracking-wider hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "..." : "NOTIFY ME"}
              </motion.button>
            </form>

            {/* Status Messages */}
            {submitStatus === "success" && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 text-green-400 font-light"
              >
                ✓ 알림 신청 완료! 드롭 시작 시 이메일로 알려드릴게요.
              </motion.p>
            )}
            {submitStatus === "error" && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 text-red-400 font-light"
              >
                ✗ 오류가 발생했습니다. 다시 시도해주세요.
              </motion.p>
            )}
          </div>
        </motion.section>

        {/* Past Drops Archive - HIDDEN FOR FUTURE USE */}
        {/* Uncomment when ready to show past drops */}
        {/* 
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <h3 className="text-2xl md:text-3xl font-light tracking-wider mb-8 text-center">
            Past Drops
          </h3>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pastDrops.map((drop, index) => (
              <motion.div
                key={drop.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + index * 0.1 }}
                className="border border-white/10 overflow-hidden group cursor-pointer"
              >
                <div className="relative aspect-square overflow-hidden">
                  <img
                    src={drop.image}
                    alt={drop.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="text-lg font-bold tracking-wider mb-1">
                        {drop.title}
                      </h4>
                      <p className="text-sm text-gray-500">{drop.date}</p>
                    </div>
                    <span className="text-xs font-bold text-red-400 tracking-wider">
                      {drop.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-400">{drop.quantity} sold</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>
        */}
      </div>
    </main>
  );
}
