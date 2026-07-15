"use client";

import { FormEvent, useState } from "react";
import { LoaderCircle, LockKeyhole } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function AdminLoginForm() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(event: FormEvent) {
    event.preventDefault();
    setLoading(true); setError("");
    const response = await fetch("/api/admin/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ password }) });
    const result = await response.json();
    if (!response.ok) { setError(result.error || "Could not sign in"); setLoading(false); return; }
    window.location.href = "/en/admin";
  }

  return (
    <form onSubmit={submit} className="w-full max-w-md rounded-[2rem] border border-black/8 bg-white p-7 shadow-[0_30px_100px_rgba(0,0,0,.08)] md:p-10">
      <span className="grid size-12 place-items-center rounded-full bg-[#ead6d6]"><LockKeyhole className="size-5" /></span>
      <h1 className="mt-6 font-serif text-5xl leading-none">Store admin</h1>
      <label className="mt-7 block text-xs font-semibold uppercase tracking-[.15em]">Password</label>
      <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-2" autoFocus required />
      {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
      <Button className="mt-5 w-full" size="lg" disabled={loading}>{loading && <LoaderCircle className="size-4 animate-spin" />} Sign in</Button>
    </form>
  );
}
