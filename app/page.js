import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  ClipboardList,
  Link2,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { redirect } from "next/navigation";
import Link from "next/link";

import { auth } from "@/lib/auth/server";

const workflow = [
  {
    title: "Create the interview",
    text: "Add the role, duration, interview type, and a short job context.",
    icon: ClipboardList,
  },
  {
    title: "Share one link",
    text: "Send candidates a clean interview link without scheduling friction.",
    icon: Link2,
  },
  {
    title: "Review feedback",
    text: "Get structured summaries, scores, and recommendation signals.",
    icon: BarChart3,
  },
];

const signals = [
  "Role-specific AI questions",
  "Voice-first candidate interview",
  "Candidate history and feedback",
  "Fast hiring review dashboard",
];

export const dynamic = "force-dynamic";

export default async function Home() {
  const { data: session } = await auth.getSession();

  if (session?.user) {
    redirect("/dashboard");
  }

  return (
    <main className="min-h-screen bg-[#e7ecf5] text-gray-950">
      <section className="sticky top-0 z-50 border-b border-[#d3dbea] bg-[#dfe6f2]/90 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-6 py-5 sm:px-8">
          <header className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-black tracking-tight">
              BOLOBOSS
            </Link>
            <Link href="/auth">
              <Button className="bg-[#2E318F] text-white hover:bg-[#242773]">
                Sign in
              </Button>
            </Link>
          </header>
        </div>
      </section>

      <section className="hero-gradient px-6 py-16 sm:px-8 lg:py-24">
        <div className="mx-auto max-w-5xl">
          <div className="text-left">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#c6d1e4] bg-[#f8fafc] px-4 py-2 text-sm font-semibold text-[#2E318F] shadow-sm">
              <Sparkles className="h-4 w-4" />
              AI interviews for focused hiring
            </div>
            <h1 className="max-w-4xl text-5xl font-black leading-tight tracking-tight sm:text-6xl lg:text-7xl">
              Create interviews, share links, review candidates faster.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-700">
              BoloBoss helps teams generate role-specific AI interviews and turn
              each candidate conversation into structured feedback your team can
              actually compare.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/auth">
                <Button className="h-12 bg-[#2E318F] px-6 text-white hover:bg-[#242773]">
                  Start interviewing
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section id="workflow" className="px-6 pb-20 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="font-bold uppercase tracking-wide text-[#2E318F]">
                Workflow
              </p>
              <h2 className="mt-3 max-w-2xl text-4xl font-black tracking-tight">
                A simple flow for creating and reviewing interviews.
              </h2>
            </div>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {workflow.map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-[#cbd5e8] bg-[#f8fafc] p-6 shadow-[0_12px_30px_rgba(15,23,42,0.08)]"
              >
                <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-xl bg-[#eef2ff] text-[#2E318F] ring-1 ring-[#d8def0]">
                  <item.icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-black">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-gray-600">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="review" className="bg-[#dfe6f2] px-6 py-20 sm:px-8">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="font-bold uppercase tracking-wide text-[#2E318F]">
              Review
            </p>
            <h2 className="mt-3 text-4xl font-black tracking-tight">
              Keep hiring decisions readable.
            </h2>
            <p className="mt-5 text-lg leading-8 text-gray-700">
              Instead of scattered notes, each interview becomes a report with
              candidate context, scores, and review signals.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {signals.map((signal) => (
              <div
                key={signal}
                className="flex items-center gap-3 rounded-xl border border-[#c6d1e4] bg-[#f8fafc] p-4 font-semibold shadow-sm"
              >
                <CheckCircle2 className="h-5 w-5 text-[#2E318F]" />
                {signal}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="start" className="px-6 py-20 sm:px-8">
        <div className="mx-auto max-w-4xl rounded-2xl border border-[#c6d1e4] bg-[#f8fafc] p-8 text-center shadow-[0_18px_45px_rgba(15,23,42,0.1)]">
          <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[#eef2ff] text-[#2E318F]">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <h2 className="text-4xl font-black tracking-tight">
            Build your next interview in minutes.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-gray-600">
            Create the role, generate questions, send a link, and review the
            candidate after the call.
          </p>
          <Link href="/auth" className="mt-8 inline-flex">
            <Button className="h-12 bg-[#2E318F] px-7 text-white hover:bg-[#242773]">
              Get started
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>
    </main>
  );
}
