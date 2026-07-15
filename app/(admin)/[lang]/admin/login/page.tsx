import Link from "next/link";
import { AdminLoginForm } from "@/components/admin-login-form";
import { Logo } from "@/components/logo";

export default function AdminLoginPage() {
  return <main className="min-h-screen bg-[#f7f2ef] px-5 py-8"><div className="mx-auto flex max-w-6xl items-center justify-between"><Link href="/"><Logo /></Link><Link href="/" className="text-sm text-black/50 hover:text-black">Back to site</Link></div><div className="grid min-h-[calc(100vh-7rem)] place-items-center"><AdminLoginForm /></div></main>;
}
