import Razorpay from "razorpay";
import { NextResponse, NextRequest } from "next/server";

const razorpay = new Razorpay({
  key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET_KEY,
});

export async function POST(req) {
  try {
    const { amount } = await req.json();
    if (!amount)
      return NextResponse.json({ error: "Amount missing" }, { status: 400 });
    
    const options = {
      amount: amount * 100,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    console.log("Razorpay Order Created:", order);
    return NextResponse.json(order);
  } catch (err) {
    console.error("Razorpay error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
