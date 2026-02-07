import { OpenAIEdgeStream } from 'openai-edge-stream';

export const config = {
    runtime: 'edge', // ⚡ 确保使用 Edge Runtime
};
// export const config = { runtime: 'nodejs' };
export default async function handler(req: Request) {
    try {
        const { message } = await req.json();
        const initialChatMessage = {
            role: "system",
            content: "Your name is X2X Assistant. An incredibly intelligent and quick-thinking AI, you were created by X2X Creative via Chris Xiong. Your response must be formatted as markdown."
        };
        // 调用 OpenAI Chat Completion 流
        const stream = await OpenAIEdgeStream(
            'https://api.openai.com/v1/chat/completions',
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
                },
                method: 'POST',
                body: JSON.stringify({
                    model: 'gpt-5-mini',
                    messages: [initialChatMessage, { role: 'user', content: message }],
                    stream: true, // 流式返回
                }),
            }
        );
        console.log("Stream object:", stream);
        return new Response(stream); // 直接把流返回给前端
    } catch (err) {
        console.error('sendMessage error:', err);
        return new Response('Error', { status: 500 });
    }
}
