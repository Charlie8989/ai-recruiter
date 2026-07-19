export function mapUser(row) {
  if (!row) return null;

  return {
    id: row.id,
    created_at: row.createdAt,
    name: row.name,
    email: row.email,
    picture: row.picture,
    credits: row.credits,
  };
}

export function mapInterview(row, feedback = undefined) {
  if (!row) return null;

  const mapped: Record<string, unknown> = {
    id: row.id,
    created_at: row.createdAt,
    jobPosition: row.jobposition,
    jobDescription: row.jobdescription,
    duration: row.duration,
    type: row.type,
    questionList: row.questionlist,
    userEmail: row.useremail,
    interviewID: row.interviewid,
    name: row.name,
  };

  if (feedback !== undefined) {
    mapped.feedback = feedback;
  }

  return mapped;
}

export function mapFeedback(row) {
  if (!row) return null;

  return {
    id: row.id,
    created_at: row.createdAt,
    userName: row.username,
    userEmail: row.useremail,
    interviewID: row.interviewid,
    feedback: row.feedback,
    recommended: row.recommended,
  };
}
