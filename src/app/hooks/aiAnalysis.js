import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function main(prompt) {
  try {
    const chatCompletion = await getGroqChatCompletion(prompt);
    const content = chatCompletion.choices[0]?.message?.content || "";

    if (!content) {
      throw new Error("Empty AI response");
    }

    return content;
  } catch (error) {
    console.error("Groq API Error:", error.message);
    return "Error: System was unable to generate analysis. Please try again.";
  }
}

export async function getGroqChatCompletion(prompt) {
  return groq.chat.completions.create({
    messages: [
      {
        role: "system",
        content: `You are a world-class YouTube Growth Strategist and Data Scientist.
        Your analysis must be brutal, data-driven, and specific to the numbers provided.
        Never use generic advice like 'stay consistent'. Always reference the channel's specific metrics.`
      },
      {
        role: "user",
        content: prompt
      }
    ],
    model: "llama-3.3-70b-versatile",
    // ⬇️ YE SETTINGS MASLA HAL KARENGI
    temperature: 0.8, // 0.8 se diversity aayegi, har channel ka jawab alag hoga
    max_tokens: 2048, // Zyada deep analysis ke liye
    top_p: 0.9,       // Behtar word selection ke liye
    stream: false     // Dashboard ke liye false hi sahi hai
  });
}