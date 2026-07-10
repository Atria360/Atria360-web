"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LockKeyhole } from "lucide-react";
import { signIn } from "@/app/actions/admin";

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");
    const res = await signIn(email, password);
    if (res.ok) {
      router.push("/admin");
      router.refresh();
    } else {
      setError(res.error ?? "Login failed");
      setBusy(false);
    }
  }

  return (
    <div className="min-h-screen hero-bg flex items-center justify-center px-6">
      <div className="w-full max-w-md bg-white rounded-[24px] shadow-2xl p-8 sm:p-10 relative z-10">
        <div className="w-14 h-14 bg-primary rounded-2xl flex items-center justify-center text-white mx-auto mb-6">
          <LockKeyhole className="w-7 h-7" />
        </div>
        <h1 className="text-2xl font-bold text-primary text-center mb-2">Atria360 Admin</h1>
        <p className="text-gray-500 text-center mb-8">Sign in to manage your website</p>
        <form onSubmit={onSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-5 py-3.5 rounded-xl border border-gray-200 focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20"
              placeholder="admin@atria360.com"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-5 py-3.5 rounded-xl border border-gray-200 focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20"
              placeholder="••••••••"
            />
          </div>
          {error && <p className="text-accent font-semibold text-sm">{error}</p>}
          <button
            type="submit"
            disabled={busy}
            className="w-full py-4 bg-primary text-white font-bold rounded-xl hover:bg-[#003a40] transition-colors disabled:opacity-60"
          >
            {busy ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
