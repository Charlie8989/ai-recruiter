export const QUESTION_PROMPT = `You are an expert technical interviewer.
Based on the following inputs, generate a well-structured list of high-quality interview questions:

Job Title: {{jobTitle}}
Job Description: {{jobDescription}}
Interview Duration: {{duration}}
Interview Type: {{type}}

Instructions:
1. Analyze the job description to identify key responsibilities, required skills, and expected experience.
2. Adjust the **number of questions based on interview duration**:
   - 15 minutes → 5 questions
   - 30 minutes → 10 questions
   - 45 minutes → 20 questions
3. Ensure the questions match the tone and structure of a real-life {{type}} interview.
4. Format your response in JSON with an array called "interviewQuestions", each object containing:
   {
     "question": "your question text",
     "type": "Technical/Behavioral/Experience/Problem-Solving/Leadership"
   }

Goal: Create a structured, relevant, and time-optimized interview plan for the {{jobTitle}} role.`;

export const FEEDBACK_PROMPT = `
{{conversation}}
Depends on this Interview Conversation between assitant and user,
Give me feedback for user interview. Give me rating out of 10 for technical Skills, Communication, Problem Solving, Experince. Also give me summery in 3 lines about the interview and one line to let me know whether is recommanded
for hire or not with msg. Give me response in JSON format
{
feedback:{
rating:{
techicalSkills:5,
communication:6, problem Solving:4,
experince:7
},
summery:<in 3 Line>,
Recommendation:",
RecommendationMsg:"
}`;
