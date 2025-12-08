/**
 * Simulates AI text expansion based on keywords and context.
 * 
 * @param {string} text - The input text from the user.
 * @param {string} fieldKey - The key of the field (e.g., 'role', 'style').
 * @returns {Promise<string>} - The expanded text.
 */
export const expandText = async (text, fieldKey) => {
    return new Promise((resolve) => {
        // Simulate network delay for realism
        setTimeout(() => {
            const lowerText = text.toLowerCase().trim();
            let expanded = text;

            // Logic for 'role' field
            if (fieldKey === 'role') {
                if (lowerText.includes('code') || lowerText.includes('dev') || lowerText.includes('engineer')) {
                    expanded = "Senior Principal Software Engineer with 15+ years of experience in distributed systems, clean code architecture, and modern web frameworks.";
                } else if (lowerText.includes('writer') || lowerText.includes('copy')) {
                    expanded = "World-class Copywriter and Content Strategist known for creating high-converting, engaging, and SEO-optimized content.";
                } else if (lowerText.includes('teacher') || lowerText.includes('tutor')) {
                    expanded = "Patient and knowledgeable Academic Tutor specializing in breaking down complex concepts into simple, understandable analogies.";
                }
            }

            // Logic for 'style' or 'subject' fields (Image Gen)
            if (fieldKey === 'subject' || fieldKey === 'style') {
                if (lowerText.includes('futuristic') || lowerText.includes('cyber')) {
                    expanded = "A high-fidelity cyberpunk cityscape with neon lights, rain-slicked streets, towering skyscrapers, and flying vehicles, cinematic lighting, 8k resolution, unreal engine 5 render.";
                } else if (lowerText.includes('nature') || lowerText.includes('forest')) {
                    expanded = "A lush, enchanted ancient forest with bioluminescent flora, rays of sunlight piercing through the canopy, morning mist, hyper-realistic, national geographic photography style.";
                } else if (lowerText.includes('portrait')) {
                    expanded = "A studio lighting portrait shot, 85mm lens, f/1.8, bokeh background, sharp focus on eyes, detailed skin texture, professional color grading.";
                }
            }

            // Logic for 'instructions' (Array items)
            if (fieldKey === 'instructions') {
                if (lowerText.includes('concise')) {
                    expanded = "Provide answers that are extremely concise and to the point. Avoid fluff or unnecessary polite filler. Focus purely on the data/fact.";
                } else if (lowerText.includes('step')) {
                    expanded = "Think step-by-step. Break down every complex problem into a numbered list of logical steps before arriving at the final conclusion.";
                } else if (lowerText.includes('check')) {
                    expanded = "Double-check your work. Before outputting the final answer, verify the logic and calculations to ensure 100% accuracy.";
                }
            }

            // Fallback if no specific keyword match but text is very short
            if (expanded === text && text.length > 0 && text.length < 10) {
                expanded = `${text} (Enhanced: Professional, Detailed, High-Quality, Standardized Format)`;
            }

            resolve(expanded);
        }, 800); // 800ms delay
    });
};
