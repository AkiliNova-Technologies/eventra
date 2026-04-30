"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, CheckCircle2, Mail, User } from "lucide-react";

import { categories, type EventCategory } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const steps = ["Profile", "Preferences", "Complete"];

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

export default function SignUpPage() {
  const [step, setStep] = useState(0);
  const [selectedPreferences, setSelectedPreferences] = useState<
    EventCategory[]
  >([]);
  const [profile, setProfile] = useState({
    fullName: "",
    email: "",
    avatar: "",
  });

  function handleGoogleSignup() {
    setProfile({
      fullName: "Albert Watbin",
      email: "albert.watbin@gmail.com",
      avatar: "/images/avatars/google-user.png",
    });

    setStep(1);
  }

  function togglePreference(category: EventCategory) {
    setSelectedPreferences((current) =>
      current.includes(category)
        ? current.filter((item) => item !== category)
        : [...current, category],
    );
  }

  return (
    <main className="min-h-screen bg-[#0d141d] px-6 py-16 text-white">
      <div className="mx-auto max-w-3xl">
        <Link href="/" className="text-2xl font-bold">
          Eventra
        </Link>

        <Card className="mt-10 border-white/10 bg-white/[0.04] text-white backdrop-blur-xl">
          <CardContent className="p-8">
            <div className="mb-8 flex items-center gap-3">
              {steps.map((item, index) => (
                <div key={item} className="flex flex-1 items-center gap-3">
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold ${
                      index <= step
                        ? "bg-violet-500 text-white"
                        : "border border-white/20 text-slate-500"
                    }`}
                  >
                    {index + 1}
                  </div>

                  <span
                    className={`hidden text-sm md:block ${
                      index <= step ? "text-violet-300" : "text-slate-500"
                    }`}
                  >
                    {item}
                  </span>

                  {index < steps.length - 1 && (
                    <div className="h-px flex-1 bg-white/10" />
                  )}
                </div>
              ))}
            </div>

            {step === 0 && (
              <section>
                <h1 className="text-3xl font-bold">Create your account</h1>
                <p className="mt-2 text-slate-400">
                  Start with the basics. We’ll keep this short.
                </p>

                <Button
                  type="button"
                  onClick={handleGoogleSignup}
                  variant="outline"
                  className="mt-8 h-12 w-full border-white/10 bg-white/[0.03] text-white hover:bg-white/[0.08]"
                >
                  <GoogleIcon />
                  Continue with Google
                </Button>

                <div className="my-8 flex items-center gap-4">
                  <div className="h-px flex-1 bg-white/10" />
                  <span className="text-xs uppercase tracking-widest text-slate-500">
                    or
                  </span>
                  <div className="h-px flex-1 bg-white/10" />
                </div>

                <div className="mt-8 grid gap-5 md:grid-cols-2">
                  <div>
                    <label className="text-xs font-bold uppercase tracking-widest text-slate-400">
                      Full Name
                    </label>
                    <div className="relative mt-2">
                      <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                      <Input
                        value={profile.fullName}
                        onChange={(event) =>
                          setProfile({
                            ...profile,
                            fullName: event.target.value,
                          })
                        }
                        placeholder="Albert Watbin"
                        className="h-11 border-white/10 bg-[#0d141d] pl-10 text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold uppercase tracking-widest text-slate-400">
                      Email Address
                    </label>
                    <div className="relative mt-2">
                      <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                      <Input
                        value={profile.email}
                        onChange={(event) =>
                          setProfile({ ...profile, email: event.target.value })
                        }
                        type="email"
                        placeholder="you@example.com"
                        className="h-11 border-white/10 bg-[#0d141d] pl-10 text-white"
                      />
                    </div>
                  </div>
                </div>

                <Button
                  onClick={() => setStep(1)}
                  className="mt-8 h-11 px-8 bg-violet-500 hover:bg-violet-400 float-right"
                >
                  Continue
                </Button>
              </section>
            )}

            {step === 1 && (
              <section>
                <h1 className="text-3xl font-bold">
                  What events interest you?
                </h1>
                <p className="mt-2 text-slate-400">
                  These preferences can later power personalized event
                  recommendations.
                </p>

                <div className="mt-8 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                  {categories.map((category) => {
                    const isSelected = selectedPreferences.includes(category);

                    return (
                      <button
                        key={category}
                        onClick={() => togglePreference(category)}
                        className={`rounded-2xl border p-5 text-left transition ${
                          isSelected
                            ? "border-violet-400/60 bg-violet-500/15"
                            : "border-white/10 bg-white/[0.03] hover:border-violet-400/40"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-semibold">{category}</span>
                          {isSelected && (
                            <CheckCircle2 className="h-5 w-5 text-violet-300" />
                          )}
                        </div>

                        <p className="mt-3 text-sm text-slate-400">
                          Show me more {category.toLowerCase()} events.
                        </p>
                      </button>
                    );
                  })}
                </div>

                <div className="mt-8 flex flex-row flex-between gap-3 float-right">
                  <Button
                    variant="outline"
                    onClick={() => setStep(0)}
                    className="border-white/10 h-11 px-8 bg-white/5 text-white hover:bg-white/10 hover:text-white"
                  >
                    Back
                  </Button>

                  <Button
                    onClick={() => setStep(2)}
                    className="h-11 px-8 bg-violet-500 hover:bg-violet-400"
                  >
                    Finish Setup
                  </Button>
                </div>
              </section>
            )}

            {step === 2 && (
              <section className="text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10">
                  <CheckCircle2 className="h-8 w-8 text-emerald-300" />
                </div>

                <h1 className="mt-6 text-3xl font-bold">You’re all set</h1>
                <p className="mx-auto mt-3 max-w-md text-slate-400">
                  Your preferences have been captured. Eventra can use this to
                  recommend better events when backend personalization is added.
                </p>

                <div className="mt-6 flex flex-wrap justify-center gap-2">
                  {selectedPreferences.map((preference) => (
                    <span
                      key={preference}
                      className="rounded-full border border-violet-400/20 bg-violet-500/10 px-4 py-1.5 text-sm text-violet-300"
                    >
                      {preference}
                    </span>
                  ))}
                </div>

                <Button
                  asChild
                  className="mt-8 h-11 px-8 bg-violet-500 hover:bg-violet-400!"
                >
                  <Link href="/events">Explore Events</Link>
                </Button>
              </section>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
