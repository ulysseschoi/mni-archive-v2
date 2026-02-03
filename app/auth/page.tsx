"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

export default function AuthPage() {
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const { signIn, signUp, signInWithGoogle, signInWithApple } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      if (mode === "signin") {
        const { error } = await signIn(email, password);
        if (error) throw error;
        setSuccess("로그인 성공! 리다이렉팅...");
        setTimeout(() => router.push("/profile"), 1500);
      } else {
        if (!name.trim()) {
          throw new Error("이름을 입력해주세요");
        }
        const { error } = await signUp(email, password, name);
        if (error) throw error;
        setSuccess("회원가입 성공! 이메일을 확인해주세요.");
        setTimeout(() => setMode("signin"), 2000);
      }
    } catch (err: any) {
      setError(err.message || "오류가 발생했습니다");
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = async (provider: "google" | "apple") => {
    setLoading(true);
    setError(null);

    try {
      const { error } =
        provider === "google"
          ? await signInWithGoogle()
          : await signInWithApple();
      if (error) throw error;
    } catch (err: any) {
      setError(err.message || "소셜 로그인에 실패했습니다");
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center px-6 py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-light tracking-wider mb-4">
            {mode === "signin" ? "SIGN IN" : "SIGN UP"}
          </h1>
          <p className="text-gray-400 font-light tracking-wide">
            {mode === "signin"
              ? "미노이 아카이브에 오신 것을 환영합니다"
              : "새로운 여정을 시작하세요"}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6 mb-8">
          {mode === "signup" && (
            <div>
              <label className="block text-sm text-gray-400 mb-2 tracking-wide">
                이름
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required={mode === "signup"}
                disabled={loading}
                placeholder="Your Name"
                className="w-full bg-white/5 border border-white/20 px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-white/60 transition-colors disabled:opacity-50"
              />
            </div>
          )}

          <div>
            <label className="block text-sm text-gray-400 mb-2 tracking-wide">
              이메일
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
              placeholder="your@email.com"
              className="w-full bg-white/5 border border-white/20 px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-white/60 transition-colors disabled:opacity-50"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-2 tracking-wide">
              비밀번호
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
              placeholder="••••••••"
              minLength={6}
              className="w-full bg-white/5 border border-white/20 px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-white/60 transition-colors disabled:opacity-50"
            />
            {mode === "signup" && (
              <p className="text-xs text-gray-500 mt-2">최소 6자 이상</p>
            )}
          </div>

          {/* Error/Success Messages */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-500/10 border border-red-500/30 px-4 py-3 text-red-400 text-sm"
            >
              {error}
            </motion.div>
          )}

          {success && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-green-500/10 border border-green-500/30 px-4 py-3 text-green-400 text-sm"
            >
              {success}
            </motion.div>
          )}

          {/* Submit Button */}
          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: loading ? 1 : 1.02 }}
            whileTap={{ scale: loading ? 1 : 0.98 }}
            className="w-full bg-white text-black py-3 font-bold tracking-wider hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading
              ? "처리 중..."
              : mode === "signin"
              ? "로그인"
              : "회원가입"}
          </motion.button>
        </form>

        {/* Divider */}
        <div className="relative mb-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/10"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-black text-gray-500 tracking-wide">
              또는
            </span>
          </div>
        </div>

        {/* Social Login Buttons */}
        <div className="space-y-4 mb-8">
          <motion.button
            type="button"
            onClick={() => handleSocialLogin("google")}
            disabled={loading}
            whileHover={{ scale: loading ? 1 : 1.02 }}
            whileTap={{ scale: loading ? 1 : 0.98 }}
            className="w-full border border-white/20 py-3 font-light tracking-wider hover:bg-white/5 transition-colors disabled:opacity-50 flex items-center justify-center gap-3"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Google로 계속하기
          </motion.button>

          <motion.button
            type="button"
            onClick={() => handleSocialLogin("apple")}
            disabled={loading}
            whileHover={{ scale: loading ? 1 : 1.02 }}
            whileTap={{ scale: loading ? 1 : 0.98 }}
            className="w-full border border-white/20 py-3 font-light tracking-wider hover:bg-white/5 transition-colors disabled:opacity-50 flex items-center justify-center gap-3"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
            </svg>
            Apple로 계속하기
          </motion.button>
        </div>

        {/* Toggle Mode */}
        <div className="text-center">
          <button
            type="button"
            onClick={() => {
              setMode(mode === "signin" ? "signup" : "signin");
              setError(null);
              setSuccess(null);
            }}
            disabled={loading}
            className="text-sm text-gray-400 hover:text-white transition-colors disabled:opacity-50"
          >
            {mode === "signin" ? (
              <>
                계정이 없으신가요?{" "}
                <span className="underline font-medium">회원가입</span>
              </>
            ) : (
              <>
                이미 계정이 있으신가요?{" "}
                <span className="underline font-medium">로그인</span>
              </>
            )}
          </button>
        </div>
      </motion.div>
    </main>
  );
}
