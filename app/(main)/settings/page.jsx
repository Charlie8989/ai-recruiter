"use client";

import { useUser } from "@/app/provider";
import { authClient } from "@/lib/auth/client";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Bell,
  CreditCard,
  LogOut,
  Mail,
  ShieldCheck,
  Sparkles,
  UserRound,
} from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const preferenceDefaults = {
  compactCards: false,
};

const settingRows = [
  {
    key: "compactCards",
    title: "Compact dashboard cards",
    description: "Use tighter interview cards on dashboard lists.",
  },
];

const plannedSettings = [
  {
    title: "Email interview reports",
    description: "Automatic report delivery will be available once email service is connected.",
  },
  {
    title: "Candidate completion alerts",
    description: "Real-time alerts will be enabled after notification delivery is configured.",
  },
];

const SettingsPage = () => {
  const { user } = useUser();
  const router = useRouter();
  const credits = user?.credits ?? 0;
  const [preferences, setPreferences] = useState(preferenceDefaults);

  useEffect(() => {
    const saved = window.localStorage.getItem("boloboss-settings");
    if (saved) {
      setPreferences({ ...preferenceDefaults, ...JSON.parse(saved) });
    }
  }, []);

  const savePreference = (key) => {
    const next = { ...preferences, [key]: !preferences[key] };
    setPreferences(next);
    window.localStorage.setItem("boloboss-settings", JSON.stringify(next));
    toast("Settings updated");
  };

  const handleLogout = async () => {
    await authClient.signOut();
    router.push("/");
  };

  if (!user) {
    return (
      <div className="mx-auto grid w-full max-w-5xl gap-5">
        <Skeleton className="h-40 rounded-2xl bg-[#dfe6f2]" />
        <Skeleton className="h-64 rounded-2xl bg-[#dfe6f2]" />
      </div>
    );
  }

  return (
    <div className="mx-auto grid w-full max-w-6xl gap-6">
      <div>
        <p className="text-sm font-bold uppercase tracking-wide text-[#2E318F]">
          Account
        </p>
        <h1 className="mt-1 text-3xl font-black">Settings</h1>
      </div>

      <section className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-2xl border border-[#cbd5e8] bg-[#f8fafc] p-6 shadow-[0_14px_35px_rgba(15,23,42,0.08)]">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <img
                src={
                  user?.picture ||
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTO3YkerCVdYtyi2McC6l-feLDSDl2KDOzFig&s"
                }
                className="h-20 w-20 rounded-full border border-[#cbd5e8] object-cover"
                alt="User profile"
                referrerPolicy="no-referrer"
              />
              <div>
                <h2 className="text-2xl font-black">{user?.name || "User"}</h2>
                <p className="mt-1 flex items-center gap-2 text-sm text-gray-600">
                  <Mail className="h-4 w-4" />
                  {user?.email}
                </p>
              </div>
            </div>
            <Button
              className="border-[#cbd5e8] bg-[#eef3fb] text-gray-950 cursor-pointer hover:bg-[#e7ecf5]"
              variant="outline"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4" />
              Log out
            </Button>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <div className="rounded-xl border border-[#d8def0] bg-[#eef3fb] p-4">
              <UserRound className="mb-3 h-5 w-5 text-[#2E318F]" />
              <p className="text-sm text-gray-500">Account type</p>
              <p className="mt-1 font-bold">Recruiter</p>
            </div>
            <div className="rounded-xl border border-[#d8def0] bg-[#eef3fb] p-4">
              <ShieldCheck className="mb-3 h-5 w-5 text-[#2E318F]" />
              <p className="text-sm text-gray-500">Auth provider</p>
              <p className="mt-1 font-bold">Google</p>
            </div>
            <div className="rounded-xl border border-[#d8def0] bg-[#eef3fb] p-4">
              <Bell className="mb-3 h-5 w-5 text-[#2E318F]" />
              <p className="text-sm text-gray-500">Notifications</p>
              <p className="mt-1 font-bold">Coming soon</p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-[#cbd5e8] bg-[#f8fafc] p-6 shadow-[0_14px_35px_rgba(15,23,42,0.08)]">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-wide text-[#2E318F]">
                Credits
              </p>
              <h2 className="mt-2 text-4xl font-black">{credits}</h2>
              <p className="mt-1 text-sm text-gray-600">
                Each interview creation uses 1 credit.
              </p>
            </div>
            <div className="rounded-xl bg-[#eef2ff] p-3 text-[#2E318F]">
              <CreditCard className="h-6 w-6" />
            </div>
          </div>
          <div className="mt-6 rounded-xl border border-[#d8def0] bg-[#eef3fb] p-4">
            <div className="flex items-center justify-between text-sm">
              <span className="font-semibold">Credit health</span>
              <span className="font-bold text-[#2E318F]">
                {credits > 5 ? "Good" : credits > 0 ? "Low" : "Empty"}
              </span>
            </div>
            <div className="mt-3 h-2 rounded-full bg-[#d8def0]">
              <div
                className="h-2 rounded-full bg-[#2E318F]"
                style={{ width: `${Math.min((credits / 20) * 100, 100)}%` }}
              />
            </div>
          </div>
          <Button
            className="mt-5 w-full bg-[#2E318F] text-white hover:bg-[#242773]"
            onClick={() => router.push("/settings/buy-credits")}
          >
            <Sparkles className="h-4 w-4" />
            Buy credits
          </Button>
        </div>
      </section>

      <section className="rounded-2xl border border-[#cbd5e8] bg-[#f8fafc] p-6 shadow-[0_14px_35px_rgba(15,23,42,0.08)]">
        <div className="mb-5">
          <h2 className="text-xl font-black">Workspace preferences</h2>
          <p className="mt-1 text-sm text-gray-600">
            Available preferences are saved on this device for your dashboard.
          </p>
        </div>
        <div className="divide-y divide-[#d8def0] overflow-hidden rounded-xl border border-[#d8def0] bg-[#eef3fb]">
          {settingRows.map((item) => (
            <div
              key={item.key}
              className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p className="font-bold">{item.title}</p>
                <p className="mt-1 text-sm text-gray-600">{item.description}</p>
              </div>
              <button
                type="button"
                onClick={() => savePreference(item.key)}
                className={`relative h-7 w-12 rounded-full transition ${
                  preferences[item.key] ? "bg-[#2E318F]" : "bg-[#b8c4da]"
                }`}
                aria-pressed={preferences[item.key]}
              >
                <span
                  className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow transition ${
                    preferences[item.key] ? "left-6" : "left-1"
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-[#cbd5e8] bg-[#f8fafc] p-6 shadow-[0_14px_35px_rgba(15,23,42,0.08)]">
        <div className="mb-5">
          <h2 className="text-xl font-black">Upcoming settings</h2>
          <p className="mt-1 text-sm text-gray-600">
            These are visible for clarity, but disabled until the backend services are ready.
          </p>
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          {plannedSettings.map((item) => (
            <div
              key={item.title}
              className="rounded-xl border border-dashed border-[#b8c4da] bg-[#eef3fb] p-4"
            >
              <div className="mb-3 flex items-center justify-between gap-3">
                <p className="font-bold">{item.title}</p>
                <span className="rounded-full bg-[#dfe6f2] px-3 py-1 text-xs font-bold text-gray-600">
                  Coming soon
                </span>
              </div>
              <p className="text-sm leading-6 text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default SettingsPage;
