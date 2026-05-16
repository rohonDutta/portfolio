"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function AdminLogin() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Welcome back!");
        router.push("/admin");
        router.refresh();
      } else {
        toast.error(data.error || "Invalid credentials");
      }
    } catch {
      toast.error("Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 relative overflow-hidden">
      {/* Decorative Blobs */}
      <div className="absolute top-0 -left-20 w-80 h-80 bg-accent/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 -right-20 w-80 h-80 bg-secondary/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-sm relative z-10">
        <div className="text-center mb-10">
          <h1 className="font-heading text-4xl font-black tracking-tight">
            RKD<span className="text-accent">!</span>
          </h1>
          <div className="inline-block px-4 py-1 bg-tertiary border-2 border-border rounded-full font-heading font-black text-[10px] uppercase tracking-widest mt-4 -rotate-1 shadow-pop-sm">
            Admin Panel
          </div>
        </div>

        <form onSubmit={handleSubmit} className="card-sticker space-y-6">
          <div>
            <label className="label-playful">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
              className="input-playful"
              placeholder="admin@example.com"
              required
            />
          </div>
          <div>
            <label className="label-playful">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
              className="input-playful"
              placeholder="••••••••"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full group"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <span className="w-5 h-5 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                Signing in...
              </span>
            ) : (
              <>
                Sign In
                <span className="inline-block group-hover:translate-x-1 transition-transform">→</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
