import { and, eq } from "drizzle-orm";
import { NextResponse } from "next/server";

import { db } from "@/src/db";
import { feedback, interview } from "@/src/db/schema";
import { mapFeedback, mapInterview } from "@/src/db/mappers";
import { privateJson } from "@/lib/api-cache";

function buildInterviewFilter(interviewId, email) {
  const filter = eq(interview.interviewid, interviewId);

  if (!email) return filter;

  return and(filter, eq(interview.useremail, email));
}

export async function GET(request, { params }) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get("email");
  const includeFeedback = searchParams.get("includeFeedback") === "true";
  const { interview_id: interviewId } = await params;

  const rows = await db
    .select()
    .from(interview)
    .where(buildInterviewFilter(interviewId, email))
    .limit(1);

  const row = rows[0];

  if (!row) {
    return privateJson({ interview: null }, { status: 404 });
  }

  let mappedFeedback;

  if (includeFeedback) {
    const feedbackRows = await db
      .select()
      .from(feedback)
      .where(eq(feedback.interviewid, interviewId));

    mappedFeedback = feedbackRows.map(mapFeedback);
  }

  return privateJson({
    interview: mapInterview(row, includeFeedback ? mappedFeedback : undefined),
  });
}

export async function PATCH(request, { params }) {
  const body = await request.json();
  const { interview_id: interviewId } = await params;

  const [row] = await db
    .update(interview)
    .set({ name: body.name })
    .where(eq(interview.interviewid, interviewId))
    .returning();

  if (!row) {
    return NextResponse.json({ interview: null }, { status: 404 });
  }

  return NextResponse.json({ interview: mapInterview(row) });
}
