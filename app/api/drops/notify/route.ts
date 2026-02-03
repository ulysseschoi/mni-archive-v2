import { NextRequest, NextResponse } from "next/server";

// TODO: Supabase 설정 후 실제 DB 연동
// import { createClient } from "@supabase/supabase-js";

export async function POST(request: NextRequest) {
  try {
    const { email, dropId } = await request.json();

    // Email validation
    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    // TODO: Supabase에 이메일 저장
    // const supabase = createClient(
    //   process.env.SUPABASE_URL!,
    //   process.env.SUPABASE_KEY!
    // );
    //
    // const { data, error } = await supabase
    //   .from("drop_notifications")
    //   .insert([
    //     {
    //       email,
    //       drop_id: dropId,
    //       subscribed_at: new Date().toISOString(),
    //       notified: false,
    //     },
    //   ]);
    //
    // if (error) {
    //   console.error("Supabase error:", error);
    //   return NextResponse.json(
    //     { error: "Failed to save email" },
    //     { status: 500 }
    //   );
    // }

    // Mock success response
    console.log(`[DROP NOTIFICATION] Email: ${email}, Drop ID: ${dropId}`);

    return NextResponse.json(
      {
        success: true,
        message: "Email notification registered successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
