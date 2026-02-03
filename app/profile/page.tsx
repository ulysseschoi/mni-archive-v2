"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

interface Profile {
  id: string;
  full_name: string;
  email: string;
  membership_tier: string;
  created_at: string;
}

interface Order {
  id: string;
  created_at: string;
  total_amount: number;
  status: string;
  items: any[];
}

export default function ProfilePage() {
  const { user, loading: authLoading, signOut } = useAuth();
  const router = useRouter();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"info" | "orders" | "membership">("info");

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/auth");
      return;
    }

    if (user) {
      loadProfileData();
    }
  }, [user, authLoading, router]);

  const loadProfileData = async () => {
    try {
      // Load profile
      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user?.id)
        .single();

      if (profileError) throw profileError;
      setProfile(profileData);

      // Load orders (mock data for now)
      // TODO: Replace with real Shopify order data
      const mockOrders: Order[] = [
        {
          id: "1",
          created_at: "2026-02-01T10:00:00Z",
          total_amount: 89000,
          status: "delivered",
          items: [{ title: "MNI ARCHIVE #01 TEE", quantity: 1 }],
        },
      ];
      setOrders(mockOrders);
    } catch (error) {
      console.error("Error loading profile:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
  };

  if (authLoading || loading) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center pt-24">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-white/20 border-t-white mb-4"></div>
          <p className="text-gray-400 font-light tracking-wide">로딩 중...</p>
        </div>
      </main>
    );
  }

  if (!user || !profile) {
    return null;
  }

  return (
    <main className="min-h-screen bg-black text-white pt-24 pb-16 px-6">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-light tracking-wider mb-4">
                MY PROFILE
              </h1>
              <p className="text-lg text-gray-400 font-light">
                {profile.full_name || "Guest"}
              </p>
              <p className="text-sm text-gray-500">{profile.email}</p>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSignOut}
              className="px-6 py-2 border border-white/20 text-sm font-light tracking-wider hover:bg-white/5 transition-colors"
            >
              로그아웃
            </motion.button>
          </div>

          {/* Tabs */}
          <div className="flex gap-8 border-b border-white/10">
            {[
              { id: "info", label: "기본 정보" },
              { id: "orders", label: "주문 내역" },
              { id: "membership", label: "멤버십" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`pb-4 text-sm font-light tracking-wide transition-colors relative ${
                  activeTab === tab.id ? "text-white" : "text-gray-500 hover:text-gray-300"
                }`}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-px bg-white"
                    transition={{ duration: 0.3 }}
                  />
                )}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {activeTab === "info" && (
            <div className="grid md:grid-cols-2 gap-6">
              <div className="border border-white/10 p-6">
                <h3 className="text-lg font-light tracking-wide mb-4">계정 정보</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">이름</p>
                    <p className="text-white">{profile.full_name || "미설정"}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">이메일</p>
                    <p className="text-white">{profile.email}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">가입일</p>
                    <p className="text-white">
                      {new Date(profile.created_at).toLocaleDateString("ko-KR")}
                    </p>
                  </div>
                </div>
              </div>

              <div className="border border-white/10 p-6">
                <h3 className="text-lg font-light tracking-wide mb-4">통계</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">총 주문 수</p>
                    <p className="text-2xl font-bold">{orders.length}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">총 구매 금액</p>
                    <p className="text-2xl font-bold">
                      ₩{orders.reduce((sum, order) => sum + order.total_amount, 0).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "orders" && (
            <div>
              {orders.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-400 font-light mb-4">주문 내역이 없습니다</p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => router.push("/shop")}
                    className="px-8 py-3 bg-white text-black font-bold tracking-wider hover:bg-gray-200 transition-colors"
                  >
                    쇼핑하러 가기
                  </motion.button>
                </div>
              ) : (
                <div className="space-y-4">
                  {orders.map((order) => (
                    <motion.div
                      key={order.id}
                      whileHover={{ scale: 1.01 }}
                      className="border border-white/10 p-6 hover:bg-white/5 transition-colors"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <p className="text-sm text-gray-500 mb-1">
                            주문일: {new Date(order.created_at).toLocaleDateString("ko-KR")}
                          </p>
                          <p className="text-xs text-gray-600">주문번호: {order.id}</p>
                        </div>
                        <span
                          className={`text-xs font-bold tracking-wider ${
                            order.status === "delivered"
                              ? "text-green-400"
                              : order.status === "shipped"
                              ? "text-blue-400"
                              : "text-gray-400"
                          }`}
                        >
                          {order.status === "delivered"
                            ? "배송 완료"
                            : order.status === "shipped"
                            ? "배송 중"
                            : "준비 중"}
                        </span>
                      </div>

                      <div className="space-y-2 mb-4">
                        {order.items.map((item, idx) => (
                          <p key={idx} className="text-white font-light">
                            {item.title} x {item.quantity}
                          </p>
                        ))}
                      </div>

                      <p className="text-lg font-bold">₩{order.total_amount.toLocaleString()}</p>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === "membership" && (
            <div className="max-w-2xl">
              <div className="border border-white/10 p-8 mb-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-light tracking-wide mb-2">
                      {profile.membership_tier || "BASIC"} MEMBER
                    </h3>
                    <p className="text-sm text-gray-400">현재 멤버십 등급</p>
                  </div>
                  <div className="text-4xl">
                    {profile.membership_tier === "premium" ? "⭐" : "🌟"}
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <p className="text-sm text-gray-400">다음 등급까지</p>
                    <p className="text-sm font-bold">구매 금액 ₩100,000 남음</p>
                  </div>
                  <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: "30%" }}
                      transition={{ duration: 1, delay: 0.3 }}
                      className="h-full bg-white"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-lg font-light tracking-wide mb-4">멤버십 혜택</h4>
                <div className="border border-white/10 p-4">
                  <p className="text-sm text-gray-400 mb-2">✓ 조기 드롭 접근</p>
                  <p className="text-xs text-gray-600">
                    한정판 드롭 30분 전 먼저 구매 가능
                  </p>
                </div>
                <div className="border border-white/10 p-4">
                  <p className="text-sm text-gray-400 mb-2">✓ 무료 배송</p>
                  <p className="text-xs text-gray-600">모든 주문 무료 배송</p>
                </div>
                <div className="border border-white/10 p-4 opacity-50">
                  <p className="text-sm text-gray-400 mb-2">🔒 특별 할인</p>
                  <p className="text-xs text-gray-600">
                    PREMIUM 등급에서 10% 추가 할인
                  </p>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </main>
  );
}
