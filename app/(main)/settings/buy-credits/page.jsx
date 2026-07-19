"use client";

import { useEffect, useMemo, useState } from "react";
import Script from "next/script";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useUser } from "@/app/provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  ArrowLeft,
  CheckCircle2,
  CreditCard,
  Loader2Icon,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

const creditPacks = [
  {
    credits: 5,
    label: "Starter",
    description: "Good for quick candidate screening.",
  },
  {
    credits: 15,
    label: "Team",
    description: "Best for shortlisting multiple roles.",
    popular: true,
  },
  {
    credits: 30,
    label: "Hiring Sprint",
    description: "For active campaigns and repeated hiring.",
  },
];

const pricePerCredit = 100;

export default function BuyCredits() {
  const [loading, setLoading] = useState(false);
  const [scriptReady, setScriptReady] = useState(false);
  const { user, setUser } = useUser();
  const [credits, setCredits] = useState();
  const [selectedCredits, setSelectedCredits] = useState(15);
  const [customCredits, setCustomCredits] = useState("");
  const router = useRouter();

  useEffect(() => {
    setCredits(user?.credits);
  }, [user]);

  const creditsToBuy = useMemo(() => {
    if (selectedCredits === "custom") {
      return Number(customCredits);
    }

    return selectedCredits;
  }, [customCredits, selectedCredits]);

  const amount = creditsToBuy > 0 ? creditsToBuy * pricePerCredit : 0;
  const newBalance = (credits ?? 0) + (creditsToBuy || 0);

  const buyCredits = async () => {
    try {
      if (!scriptReady || !window.Razorpay) {
        toast("Payment system is still loading. Try again in a moment.");
        return;
      }

      if (!creditsToBuy || creditsToBuy <= 0) {
        toast("Please select a valid credit amount");
        return;
      }

      setLoading(true);

      const res = await fetch("/api/razorpay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount }),
      });

      const data = await res.json();

      if (!data.id) {
        toast("Failed to create payment order");
        setLoading(false);
        return;
      }

      const paymentObject = new window.Razorpay({
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: data.amount,
        currency: data.currency,
        name: "BoloBoss Credits",
        description: `${creditsToBuy} interview credits`,
        order_id: data.id,
        handler: async function () {
          toast("Payment successful");
          const creditResponse = await fetch("/api/users", {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: user?.email,
              creditDelta: creditsToBuy,
            }),
          });
          const creditData = await creditResponse.json();
          setCredits(creditData.user?.credits);
          setUser?.(creditData.user);
          router.push("/settings");
        },
        prefill: {
          name: user?.name || "",
          email: user?.email || "",
        },
        theme: {
          color: "#2E318F",
        },
      });

      paymentObject.open();
      setLoading(false);

      paymentObject.on("payment.failed", function (response) {
        setLoading(false);
        toast("Payment failed: " + response.error.description);
      });
    } catch (err) {
      toast("Something went wrong. Try again.");
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="mx-auto grid w-full max-w-5xl gap-5">
        <Skeleton className="h-36 rounded-2xl bg-[#dfe6f2]" />
        <Skeleton className="h-80 rounded-2xl bg-[#dfe6f2]" />
      </div>
    );
  }

  return (
    <>
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        onLoad={() => setScriptReady(true)}
      />
      <div className="mx-auto grid w-full max-w-6xl gap-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <button
              type="button"
              onClick={() => router.push("/settings")}
              className="mb-3 flex items-center gap-2 text-sm font-semibold text-[#2E318F]"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to settings
            </button>
            <p className="text-sm font-bold uppercase tracking-wide text-[#2E318F]">
              Billing
            </p>
            <h1 className="mt-1 text-3xl font-black">Buy credits</h1>
          </div>
          <div className="rounded-xl border border-[#cbd5e8] bg-[#f8fafc] px-5 py-3 shadow-sm">
            <p className="text-sm text-gray-500">Current balance</p>
            <p className="text-2xl font-black">{credits ?? 0} credits</p>
          </div>
        </div>

        <section className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-2xl border border-[#cbd5e8] bg-[#f8fafc] p-6 shadow-[0_14px_35px_rgba(15,23,42,0.08)]">
            <h2 className="text-xl font-black">Choose a pack</h2>
            <p className="mt-1 text-sm text-gray-600">
              One credit creates one AI interview. Credits never expire.
            </p>

            <div className="mt-5 grid gap-4 md:grid-cols-3">
              {creditPacks.map((pack) => {
                const active = selectedCredits === pack.credits;

                return (
                  <button
                    key={pack.label}
                    type="button"
                    onClick={() => setSelectedCredits(pack.credits)}
                    className={`relative rounded-xl border p-4 text-left transition hover:-translate-y-0.5 ${
                      active
                        ? "border-[#2E318F] bg-[#eef2ff] shadow-[0_12px_28px_rgba(46,49,143,0.14)]"
                        : "border-[#d8def0] bg-[#eef3fb] hover:border-[#b8c4da]"
                    }`}
                  >
                    {pack.popular && (
                      <span className="absolute right-3 top-3 rounded-full bg-[#2E318F] px-2 py-1 text-xs font-bold text-white">
                        Popular
                      </span>
                    )}
                    <p className="text-sm font-bold text-[#2E318F]">
                      {pack.label}
                    </p>
                    <p className="mt-3 text-3xl font-black">{pack.credits}</p>
                    <p className="text-sm text-gray-500">credits</p>
                    <p className="mt-3 text-sm text-gray-600">
                      {pack.description}
                    </p>
                    <p className="mt-4 font-bold">
                      Rs. {pack.credits * pricePerCredit}
                    </p>
                  </button>
                );
              })}
            </div>

            <div className="mt-5 rounded-xl border border-[#d8def0] bg-[#eef3fb] p-4">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
                <div className="flex-1">
                  <label className="text-sm font-bold">Custom credits</label>
                  <Input
                    value={customCredits}
                    onChange={(e) => {
                      setSelectedCredits("custom");
                      setCustomCredits(e.target.value);
                    }}
                    type="number"
                    min="1"
                    placeholder="Enter credit quantity"
                    className="mt-2 bg-[#f8fafc]"
                  />
                </div>
                <Button
                  type="button"
                  variant="outline"
                  className="border-[#cbd5e8] bg-[#f8fafc]"
                  onClick={() => setSelectedCredits("custom")}
                >
                  Use custom
                </Button>
              </div>
            </div>
          </div>

          <aside className="rounded-2xl border border-[#cbd5e8] bg-[#f8fafc] p-6 shadow-[0_14px_35px_rgba(15,23,42,0.08)]">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-[#eef2ff] p-3 text-[#2E318F]">
                <CreditCard className="h-6 w-6" />
              </div>
              <div>
                <h2 className="text-xl font-black">Order summary</h2>
                <p className="text-sm text-gray-600">Secure Razorpay checkout</p>
              </div>
            </div>

            <div className="mt-6 space-y-3 rounded-xl border border-[#d8def0] bg-[#eef3fb] p-4">
              <div className="flex justify-between text-sm">
                <span>Credits selected</span>
                <span className="font-bold">{creditsToBuy || 0}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Price per credit</span>
                <span className="font-bold">Rs. {pricePerCredit}</span>
              </div>
              <div className="flex justify-between border-t border-[#d8def0] pt-3 text-lg font-black">
                <span>Total</span>
                <span>Rs. {amount}</span>
              </div>
            </div>

            <div className="mt-5 rounded-xl border border-[#d8def0] bg-[#eef3fb] p-4">
              <p className="text-sm text-gray-500">Balance after purchase</p>
              <p className="mt-1 text-2xl font-black">{newBalance} credits</p>
            </div>

            <Button
              onClick={buyCredits}
              className="mt-5 w-full bg-[#2E318F] text-white hover:bg-[#242773]"
              disabled={loading || !creditsToBuy || creditsToBuy <= 0}
            >
              {loading ? (
                <Loader2Icon className="h-4 w-4 animate-spin" />
              ) : (
                <Sparkles className="h-4 w-4" />
              )}
              {loading ? "Opening checkout..." : "Proceed to payment"}
            </Button>

            <div className="mt-5 space-y-3 text-sm text-gray-600">
              <p className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-[#2E318F]" />
                Payments are processed through Razorpay.
              </p>
              <p className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-[#2E318F]" />
                Credits are added after successful payment.
              </p>
            </div>
          </aside>
        </section>
      </div>
    </>
  );
}
