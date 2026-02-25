import { OpenAIEdgeStream } from 'openai-edge-stream';

export const config = {
    runtime: 'edge', // ⚡ 确保使用 Edge Runtime
};
// export const config = { runtime: 'nodejs' };
export default async function handler(req: Request) {
    try {
        const { chatId: chatIdFromParam, message } = await req.json();
        let chatId = chatIdFromParam;
        let newChatId: string | undefined;
        const initialChatMessage = {
            role: "system",
            content: "Your name is X2X Assistant. An incredibly intelligent and quick-thinking AI, you were created by X2X Creative via Chris Xiong. Your response must be formatted as markdown."
        };
        if (chatId) {
            // 调用 OpenAI Chat Completion 流
            const response = await fetch(`${req.headers.get("origin")}/api/chat/addMessageToChat`, {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    cookie: req.headers.get("cookie") || "",
                },
                body: JSON.stringify({
                    chatId,
                    role:"user",
                    content: message,
                }),
            });
        } else {
            // 调用 OpenAI Chat Completion 流
            const response = await fetch(`${req.headers.get("origin")}/api/chat/createNewChat`, {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    cookie: req.headers.get("cookie") || "",
                },
                body: JSON.stringify({ message: message }),
            });
            const json = await response.json();
            chatId = json._id;
            newChatId = json._id;
        }
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
            },
            {
                onBeforeStream: ({emit}) => {
                    if (newChatId) {
                        emit(newChatId, "newChatId");
                    }

                },
                onAfterStream: async ({fullContent}) => {
                    await fetch(`${req.headers.get("origin")}/api/chat/addMessageToChat`, {
                            method: "POST",
                            headers: {
                                "content-type": "application/json",
                                cookie: req.headers.get("cookie") || "",
                            },
                            body: JSON.stringify({
                                chatId,
                                role: "assistant",
                                content: fullContent,
                            }),
                        }
                    );
                },
            }
        );
        console.log("Stream object:", stream);
        return new Response(stream); // 直接把流返回给前端
    } catch (err) {
        console.error('sendMessage error:', err);
        return new Response('Error', { status: 500 });
    }
}