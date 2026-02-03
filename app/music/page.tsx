"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import MusicCard from "@/components/MusicCard";

// 미노이 입덕 가이드: 필수 뮤직비디오 5선
const mockMusic = [
  {
    _id: "1",
    slug: "salang-salang",
    title: "살랑살랑 (Salang Salang)",
    coverImage: "/music-covers/salang-salang.jpg",
    duration: "3:41",
    category: "Single",
    description: "미노이 님 특유의 간질간질하고 사랑스러운 매력이 극대화된 곡이에요. 파스텔 톤의 영상미가 압권!",
    videoUrl: "https://www.youtube.com/watch?v=CkOJXIH9A_E",
    tags: "#Lovely #Pastel #Spring_Vibe #Signature_Style",
    createdAt: "2021-10-13",
  },
  {
    _id: "2",
    slug: "da-da",
    title: "DA DA! (Feat. pH-1)",
    coverImage: "/music-covers/da-da.jpg",
    duration: "3:01",
    category: "Collaboration",
    description: "힙하고 통통 튀는 Z세대의 표본! pH-1과의 케미도 좋고, 비주얼적으로도 톡톡 튀는 색감이 많아요.",
    videoUrl: "https://www.youtube.com/watch?v=nFVvUZl1zME",
    tags: "#Hip #Collab #Colorful #Trendy",
    createdAt: "2020-09-11",
  },
  {
    _id: "3",
    slug: "wgc",
    title: "우리집 고양이 츄르를 좋아해 (WGC)",
    coverImage: "/music-covers/cat-churu.jpg",
    duration: "3:02",
    category: "Viral Hit",
    description: "미노이 님을 대중에게 각인시킨 전설의 시작! 기타 하나와 목소리만으로 공간을 채우는 아티스트의 본질.",
    videoUrl: "https://www.youtube.com/watch?v=QY6pZFPvP30",
    tags: "#Acoustic #Viral #Cat_Lover #Pure",
    createdAt: "2021-02-21",
  },
  {
    _id: "4",
    slug: "tea-time",
    title: "Tea time (Feat. 10CM)",
    coverImage: "/music-covers/tea-time.jpg",
    duration: "2:59",
    category: "R&B",
    description: "조금 더 차분하고 분위기 있는 미노이 님! 10CM 권정열 님과의 호흡이 돋보이며 따뜻한 톤이 매력적.",
    videoUrl: "https://www.youtube.com/watch?v=TpoPuLwJ1do",
    tags: "#Mood #R&B #Warm #Emotional",
    createdAt: "2022-03-23",
  },
  {
    _id: "5",
    slug: "ticket",
    title: "Ticket",
    coverImage: "/music-covers/ticket.jpg",
    duration: "2:23",
    category: "Latest",
    description: "여행을 떠나는 듯한 설렘과 자유로움이 느껴지는 곡! '미노이의 여정'이라는 테마로 완벽해요.",
    videoUrl: "https://www.youtube.com/watch?v=kaKrjWb4vSo",
    tags: "#Travel #Freedom #Pop #Vlog_Style",
    createdAt: "2023-11-29",
  },
];

export default function MusicPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Link
            href="/"
            className="inline-block mb-8 text-sm hover:opacity-60 transition-opacity"
          >
            ← BACK TO HOME
          </Link>
          <h1 className="text-5xl sm:text-6xl font-bold mb-4">Music</h1>
          <p className="text-gray-400 text-lg mb-12">
            미노이 입덕 가이드: 필수 뮤직비디오 5선
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockMusic.map((music, index) => (
            <MusicCard key={music._id} music={music} index={index} />
          ))}
        </div>

        <div className="text-center text-gray-500 text-sm mt-16">
          © 2026 MNI Archive
        </div>
      </div>
    </div>
  );
}
