"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function AuthCallbackPage() {
  const router = useRouter();

  useEffect(() => {
    const handleCallback = async () => {
      const { data, error } = await supabase.auth.getSession();

      if (error) {
        console.error("Auth callback error:", error);
        router.push("/auth?error=callback_failed");
        return;
      }

      if (data.session) {
        // Create profile if doesn't exist (for social login)
        const { data: profile } = await supabase
          .from("profiles")
          .select()
          .eq("id", data.session.user.id)
          .single();

        if (!profile) {
          await supabase.from("profiles").insert({
            id: data.session.user.id,
            full_name: data.session.user.user_metadata.full_name || "",
            email: data.session.user.email,
          });
        }

        router.push("/profile");
      } else {
        router.push("/auth");
      }
    };

    handleCallback();
  }, [router]);

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-white/20 border-t-white mb-4"></div>
        <p className="text-gray-400 font-light tracking-wide">
          로그인 처리 중...
        </p>
      </div>
    </main>
  );
}
