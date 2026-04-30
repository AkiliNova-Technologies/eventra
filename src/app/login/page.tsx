"use client";

import Link from "next/link";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";

function GoogleIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24">
      <path
        fill="currentColor"
        d="M21.35 11.1h-9.18v2.98h5.31c-.23 1.53-1.61 4.49-5.31 4.49-3.2 0-5.81-2.65-5.81-5.92s2.61-5.92 5.81-5.92c1.82 0 3.04.78 3.74 1.45l2.55-2.46C16.82 4.19 14.7 3.25 12.17 3.25 6.97 3.25 2.75 7.47 2.75 12.67s4.22 9.42 9.42 9.42c5.44 0 9.05-3.82 9.05-9.2 0-.62-.07-1.09-.17-1.79z"
      />
    </svg>
  );
}

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <main className="min-h-screen bg-[#0d141d] text-white">
      <section className="flex min-h-screen items-center justify-center px-6 py-20">
        <Card className="w-full max-w-md border-white/10 bg-white/[0.04] text-white backdrop-blur-xl">
          <CardContent className="p-8">
            <Link href="/" className="text-2xl font-bold">
              Eventra
            </Link>

            <h1 className="mt-8 text-3xl font-bold">Welcome back</h1>
            <p className="mt-2 text-sm text-slate-400">
              Log in to continue discovering and booking events.
            </p>

            <div className="mt-8 grid gap-3">
              <Button
                variant="outline"
                className="h-12 border-white/10 bg-white/[0.03] text-white hover:bg-white/[0.08] hover:text-white"
              >
                <GoogleIcon />
                Continue with Google
              </Button>
            </div>

            <div className="my-8 flex items-center gap-4">
              <div className="h-px flex-1 bg-white/10" />
              <span className="text-xs uppercase tracking-widest text-slate-500">
                or
              </span>
              <div className="h-px flex-1 bg-white/10" />
            </div>

            <div className="space-y-5">
              <div>
                <label className="text-xs font-bold uppercase tracking-widest text-slate-400">
                  Email Address
                </label>
                <div className="relative mt-2">
                  <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                  <Input
                    type="email"
                    placeholder="you@example.com"
                    className="h-12 border-white/10 bg-[#0d141d] pl-10 text-white"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-400">
                    Password
                  </label>
                  <Link
                    href="#"
                    className="text-xs text-violet-300 hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>

                <div className="relative mt-2">
                  <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />

                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="h-12 border-white/10 bg-[#0d141d] pl-10 pr-10 text-white"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              <Button className="w-full bg-violet-500 py-6 hover:bg-violet-400">
                Log In
              </Button>
            </div>

            <p className="mt-6 text-center text-sm text-slate-400">
              New to Eventra?{" "}
              <Link href="/signup" className="text-violet-300 hover:underline">
                Create an account
              </Link>
            </p>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
