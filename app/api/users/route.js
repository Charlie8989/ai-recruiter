import { eq, sql } from "drizzle-orm";
import { NextResponse } from "next/server";

import { db } from "@/src/db";
import { users } from "@/src/db/schema";
import { mapUser } from "@/src/db/mappers";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get("email");

  if (!email) {
    return NextResponse.json({ error: "email is required" }, { status: 400 });
  }

  const rows = await db.select().from(users).where(eq(users.email, email)).limit(1);

  return NextResponse.json({ user: mapUser(rows[0]) });
}

export async function POST(request) {
  const body = await request.json();

  if (!body.email) {
    return NextResponse.json({ error: "email is required" }, { status: 400 });
  }

  const [row] = await db
    .insert(users)
    .values({
      name: body.name,
      email: body.email,
      picture: body.picture,
    })
    .onConflictDoUpdate({
      target: users.email,
      set: {
        name: body.name,
        picture: body.picture,
      },
    })
    .returning();

  return NextResponse.json({ user: mapUser(row) });
}

export async function PATCH(request) {
  const body = await request.json();

  if (!body.email) {
    return NextResponse.json({ error: "email is required" }, { status: 400 });
  }

  const update = {};

  if (typeof body.credits === "number") {
    update.credits = body.credits;
  } else if (typeof body.creditDelta === "number") {
    update.credits = sql`${users.credits} + ${body.creditDelta}`;
  } else {
    return NextResponse.json(
      { error: "credits or creditDelta is required" },
      { status: 400 }
    );
  }

  const [row] = await db
    .update(users)
    .set(update)
    .where(eq(users.email, body.email))
    .returning();

  return NextResponse.json({ user: mapUser(row) });
}
