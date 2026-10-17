import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function GET(request: Request) {
  if (
    request.headers.get("authorization") !== `Bearer ${process.env.CRON_SECRET}`
  ) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY ||
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    );

    const d = await supabase
      .from("resumes")
      .select("id", { head: true })
      .limit(1);

    return NextResponse.json({ success: true, message: "Ping completed" });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
