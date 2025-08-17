import { createAdminClient } from "../../lib/supabase";
import { createAdminClient } from "@/lib/supabase";

export async function POST(request: Request) {
  try {
    const { email, extra } = await request.json();
    if (!email || typeof email !== "string") {
      return NextResponse.json({ error: "Valid email required." }, { status: 400 });
    }
    const supabase = createAdminClient();
    const { error } = await supabase.from("waitlist").insert({
      email: email.trim().toLowerCase(),
      extra: extra ?? {}
    });
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json({ ok: true });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || "Unknown error" }, { status: 500 });
  }
}
