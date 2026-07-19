"use client";

import { useState, useEffect } from "react";
import Script from "next/script";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useUser } from "@/app/provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";

export default function BuyCredits() {
  const [loading, setLoading] = useState(false);
  const { user, setUser } = useUser();
  const [creditInput, setCreditInput] = useState("");
  const [credits, setCredits] = useState();
  const router = useRouter();

  useEffect(() => {
    setCredits(user?.credits);
  }, [user]);

  const BuyCredits = async () => {
    try {
      setLoading(true);
      const creditsToBuy = Number(creditInput);

      if (!creditsToBuy || creditsToBuy <= 0) {
        toast("Please enter a valid number of credits");
        setLoading(false);
        return;
      }

      const amount = creditsToBuy * 100;

      const res = await fetch("/api/razorpay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount }),
      });

      const data = await res.json();

      if (!data.id) {
        toast("Failed to create order");
        setLoading(false);
        return;
      }

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: data.amount,
        currency: data.currency,
        name: "AI Interview Credits",
        description: `${creditsToBuy} credits purchase`,
        order_id: data.id,
        handler: async function (response) {
          toast("Payment Successful!");
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
          name: "Charlie",
          email: "charlie@example.com",
        },
        theme: {
          color: "#4f46e5",
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
      setLoading(false);

      paymentObject.on("payment.failed", function (response) {
        toast("Payment failed: " + response.error.description);
      });
    } catch (err) {
      toast("Something went wrong. Try again!");
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="mx-auto w-[70vw] rounded-xl border border-[#dfe5f2] bg-[#f8fafc] p-5 shadow-[0_14px_30px_rgba(15,23,42,0.06)] sm:w-[50vw]">
        <Skeleton className="mb-4 h-6 w-32 bg-[#e4e9f5]" />
        <Skeleton className="h-12 w-full bg-[#e4e9f5]" />
        <Skeleton className="mt-5 h-10 w-full bg-[#e4e9f5]" />
      </div>
    );
  }

  return (
    <>
      {/* Razorpay checkout script */}
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
        <div className="w-[70vw] mx-auto sm:w-[50vw] bg-[#f8fafc] p-5 rounded-xl border border-[#dfe5f2] shadow-[0_14px_30px_rgba(15,23,42,0.06)]">
          <p className="text-lg font-bold mb-3">Buy credits</p>
          <Input
            value={creditInput}
            onChange={(e) => setCreditInput(e.target.value)}
            placeholder={"Enter number of credits"}
          />

          <Button
            onClick={BuyCredits}
            className="w-full mt-5"
            disabled={loading}
          >
            {loading ? "Processing..." : "Buy Credits"}
          </Button>
        </div>
        <div className="bg-[#f8fafc] mx-auto w-[70vw] sm:w-[50vw] p-4 rounded-xl border border-[#dfe5f2] shadow-[0_14px_30px_rgba(15,23,42,0.04)] mt-4 text-gray-700">
          <h3 className="font-semibold mb-1">Quick Tips</h3>
          <ul className="list-disc ml-5 marker:text-blue-700">
            <li>Each mock interview costs 5 credits.</li>
            <li>You can purchase credits anytime.</li>
            <li>Credits do not expire.</li>
          </ul>
        </div>
        
    </>
  );
}
