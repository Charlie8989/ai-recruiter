import { desc, eq } from "drizzle-orm";
import { NextResponse } from "next/server";

import { db } from "@/src/db";
import { feedback } from "@/src/db/schema";
import { mapFeedback } from "@/src/db/mappers";
import { privateJson } from "@/lib/api-cache";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const interviewID = searchParams.get("interviewID");

  if (!interviewID) {
    return NextResponse.json(
      { error: "interviewID is required" },
      { status: 400 }
    );
  }

  const rows = await db
    .select()
    .from(feedback)
    .where(eq(feedback.interviewid, interviewID))
    .orderBy(desc(feedback.id));

  return privateJson({ feedback: rows.map(mapFeedback) });
}

export async function POST(request) {
  const body = await request.json();

  if (!body.userEmail || !body.interviewID) {
    return NextResponse.json(
      { error: "userEmail and interviewID are required" },
      { status: 400 }
    );
  }

  const [row] = await db
    .insert(feedback)
    .values({
      username: body.userName,
      useremail: body.userEmail,
      interviewid: body.interviewID,
      feedback: body.feedback,
      recommended: body.recommended,
    })
    .returning();

  return NextResponse.json({ feedback: mapFeedback(row) }, { status: 201 });
}
