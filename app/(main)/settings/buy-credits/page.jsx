"use client";

import { useState, useEffect } from "react";
import Script from "next/script";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { supabase } from "@/services/supabaseClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function BuyCredits() {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [creditInput, setCreditInput] = useState("");
  const [credits, setCredits] = useState();
  const router = useRouter();

  useEffect(() => {
    const fetchUserAndCredits = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);

      if (user) {
        const { data: Users, error } = await supabase
          .from("Users")
          .select("credits")
          .eq("email", user.user_metadata?.email);
        if (error) console.error(error);
        else setCredits(Users[0].credits);
      }
    };

    fetchUserAndCredits();
  }, []);

  const BuyCredits = async () => {
    try {
      const creditsToBuy = Number(creditInput);

      if (!creditsToBuy || creditsToBuy <= 0) {
        toast("Please enter a valid number of credits");
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
          const { data, error } = await supabase
            .from("Users")
            .update({ credits: credits + creditsToBuy })
            .eq("email", user?.user_metadata?.email)
            .select();

          if (error) console.error(error);
          setCredits(data[0]?.credits);
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

      paymentObject.on("payment.failed", function (response) {
        toast("Payment failed: " + response.error.description);
      });
    } catch (err) {
      toast("Something went wrong. Try again!");
    }
  };

  return (
    <>
      {/* Razorpay checkout script */}
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      <div className="w-full bg-white p-5 rounded-md ">
        <p className="text-lg font-semibold mb-3">Buy credits</p>
        <Input
          value={creditInput}
          onChange={(e) => setCreditInput(e.target.value)}
          placeholder={"Enter number of credits"}
        />

        <Button onClick={BuyCredits} className="w-full mt-5" disabled={loading}>
          {loading ? "Processing..." : "Buy Credits"}
        </Button>
      </div>
      <div className="bg-white p-4 rounded-md mt-4 text-gray-700">
        <h3 className="font-semibold mb-1">Quick Tips</h3>
        <ul className="list-disc ml-5 marker:text-blue-700">
          <li>Each mock interview costs 5 credits.</li>
          <li>You can purchase credits anytime.</li>
          <li>Credits do not expire.</li>
        </ul>
      </div>
      <div className="text-center">
        <p className="font-semibold my-8">Thanks for using BOLOBOSS ❤️</p>
      </div>
    </>
  );
}
