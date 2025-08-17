"use client";
import { useState } from "react";

export default function Page() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<null | "ok" | "error" | "loading">(null);
  const [msg, setMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setMsg("");

    try {
      const res = await fetch("/api/join", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong");
      setStatus("ok");
      setMsg("You're on the list. We'll be in touch soon.");
      setEmail("");
    } catch (err: any) {
      setStatus("error");
      setMsg(err.message || "Failed to join waitlist.");
    }
  }

  return (
    <main>
      <h1 style={{ fontSize: 36, lineHeight: 1.2, marginBottom: 16 }}>Make Work. Make it Better.</h1>
      <p style={{ opacity: 0.8, marginBottom: 24 }}>
        A conversation-first app for artists and editors. No likes. No view counts. Just evolving ideas.
      </p>
      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: 12, marginTop: 12 }}>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          style={{ flex: 1, padding: '12px 14px', borderRadius: 8, border: '1px solid #333', background: '#111', color: '#fff' }}
        />
        <button
          type="submit"
          disabled={status === "loading"}
          style={{ padding: '12px 18px', borderRadius: 8, background: '#fff', color: '#000', fontWeight: 600 }}
        >
          {status === "loading" ? "Adding…" : "Join Waitlist"}
        </button>
      </form>
      {status && (
        <p style={{ marginTop: 12, opacity: 0.9, color: status === "error" ? '#ff8a8a' : '#9effa3' }}>
          {msg}
        </p>
      )}

      <div style={{ marginTop: 48, opacity: 0.7, fontSize: 14 }}>
        <p>Env check:</p>
        <ul>
          <li>NEXT_PUBLIC_SUPABASE_URL: {process.env.NEXT_PUBLIC_SUPABASE_URL ? "✅ set" : "❌ missing"}</li>
          <li>NEXT_PUBLIC_SUPABASE_ANON_KEY: {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? "✅ set" : "❌ missing"}</li>
        </ul>
      </div>
    </main>
  );
}