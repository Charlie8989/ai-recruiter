import { desc, eq, inArray } from "drizzle-orm";
import { NextResponse } from "next/server";

import { db } from "@/src/db";
import { feedback, interview } from "@/src/db/schema";
import { mapFeedback, mapInterview } from "@/src/db/mappers";

function normalizeType(type) {
  if (typeof type === "string") return type;
  if (type === undefined || type === null) return null;
  return JSON.stringify(type);
}

async function feedbackByInterviewIds(interviewIds) {
  if (interviewIds.length === 0) return new Map();

  const rows = await db
    .select()
    .from(feedback)
    .where(inArray(feedback.interviewid, interviewIds));

  return rows.reduce((grouped, row) => {
    const key = row.interviewid;
    const existing = grouped.get(key) ?? [];
    existing.push(mapFeedback(row));
    grouped.set(key, existing);
    return grouped;
  }, new Map());
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get("email");
  const limit = Number(searchParams.get("limit"));
  const includeFeedback = searchParams.get("includeFeedback") === "true";

  if (!email) {
    return NextResponse.json({ error: "email is required" }, { status: 400 });
  }

  let query = db
    .select()
    .from(interview)
    .where(eq(interview.useremail, email))
    .orderBy(desc(interview.id));

  if (Number.isInteger(limit) && limit > 0) {
    query = query.limit(limit);
  }

  const rows = await query;
  const groupedFeedback = includeFeedback
    ? await feedbackByInterviewIds(rows.map((row) => row.interviewid))
    : null;

  return NextResponse.json({
    interviews: rows.map((row) =>
      mapInterview(
        row,
        includeFeedback ? groupedFeedback.get(row.interviewid) ?? [] : undefined
      )
    ),
  });
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
    .insert(interview)
    .values({
      jobposition: body.jobPosition,
      jobdescription: body.jobDescription,
      duration: body.duration,
      type: normalizeType(body.type),
      questionlist: body.questionList,
      useremail: body.userEmail,
      interviewid: body.interviewID,
      name: body.name,
    })
    .returning();

  return NextResponse.json({ interview: mapInterview(row) }, { status: 201 });
}
