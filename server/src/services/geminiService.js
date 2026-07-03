const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
});

const generatePreVisitSummary = async (symptoms) => {
  const prompt = `
You are a medical assistant.

A patient reports the following symptoms:

${symptoms}

Return ONLY valid JSON in this exact format:

{
  "urgencyLevel":"Low",
  "chiefComplaint":"...",
  "suggestedQuestions":[
      "...",
      "...",
      "..."
  ]
}

Urgency level must be one of:
Low
Medium
High

Do not return markdown.
Do not explain anything.
Return only JSON.
`;

  const result = await model.generateContent(prompt);

  const response = result.response.text();

  return JSON.parse(response);
};
const generatePostVisitSummary = async (
  doctorNotes,
  prescription
) => {

  const prompt = `
You are a healthcare assistant.

Convert the following doctor's notes into a simple, patient-friendly summary.

Doctor Notes:
${doctorNotes}

Prescription:
${prescription}

Keep the response short, clear, and easy to understand.
`;

  const result = await model.generateContent(prompt);

  return result.response.text();
};
module.exports = {
  generatePreVisitSummary,
  generatePostVisitSummary,
};