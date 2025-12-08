
const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";

/**
 * Generates a JSON prompt configuration using Groq API.
 * 
 * @param {string} apiKey - user's Groq API Key
 * @param {string} idea - user's raw idea 
 * @param {object} templateSchema - the structure we want to fill
 * @param {string} detailLevel - 'concise' or 'detailed'
 * @returns {Promise<object>} - The filled JSON object
 */
export const generateWithGroq = async (apiKey, idea, templateSchema, detailLevel = 'detailed') => {
    if (!apiKey) throw new Error("API Key is missing");

    // prompt engineering tricks: role assignment, strict constraints, few-shot thinking.
    const isDetailed = detailLevel === 'detailed';
    const detailInstruction = isDetailed
        ? "Generate HIGHLY DETAILED, descriptive, and creative content. Use sophisticated vocabulary. For arrays, provide at least 5-7 items."
        : "Generate CONCISE, short, and to-the-point content. Keep it minimal.";

    const systemPrompt = `
    You are an expert Prompt Engineer and Creative Director. Your task is to convert a user's idea into a structured JSON configuration.
    
    CONSTRAINTS:
    1. Output ONLY valid JSON matching the schema below.
    2. Do NOT include markdown backticks like \`\`\`json.
    3. ${detailInstruction}
    4. For "Role" or "Subject", be incredibly specific.
    5. If the schema looks like an Image Generation Prompt, focus on visual describers (lighting, texture, camera angle).
    
    SCHEMA TO FILL:
    ${JSON.stringify(templateSchema, null, 2)}
  `;

    try {
        const response = await fetch(GROQ_API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: "llama-3.3-70b-versatile", // Powerful model
                messages: [
                    { role: "system", content: systemPrompt },
                    { role: "user", content: `Idea: "${idea}". \n\nGenerate the JSON now.` }
                ],
                temperature: 0.75, // Slightly higher for creativity
                max_tokens: 2000
            })
        });

        if (!response.ok) {
            const errData = await response.json();
            throw new Error(errData.error?.message || "Groq API Request failed");
        }

        const data = await response.json();
        const content = data.choices[0].message.content;

        // Sanitize and parse JSON
        const cleanContent = content.replace(/```json/g, '').replace(/```/g, '').trim();

        return JSON.parse(cleanContent);

    } catch (error) {
        console.error("Groq Service Error:", error);
        throw error;
    }
};
