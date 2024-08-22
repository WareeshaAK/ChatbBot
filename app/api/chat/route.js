import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

let conversationMemory = {};

export async function POST(req, res) {
    try {
        const { query, userId } = await req.json();

        let messages = conversationMemory[userId] || [];

        if (messages.length === 0) {
            messages.push({ role: "system", content: "Respond with concise but complete answers." });
        }

        messages.push({ role: "user", content: query });

        const chatCompletion = await groq.chat.completions.create({
            messages: messages,
            model: "llama-3.1-70b-versatile",
            max_tokens: 1024,  
        });

        const assistantMessage = {
            role: "assistant",
            content: chatCompletion.choices[0]?.message?.content || "No response",
        };
        messages.push(assistantMessage);
        
        conversationMemory[userId] = messages;

        return new Response(
            JSON.stringify({
                data: { generated_text: assistantMessage.content },
            }),
            { status: 200 }
        );
    } catch (error) {
        console.error('Error:', error);
        return new Response(JSON.stringify({ error: 'Something went wrong' }), { status: 500 });
    }
}
