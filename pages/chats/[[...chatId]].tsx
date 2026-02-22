// /pages/chats/[[...chatId]].tsx
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { useUser } from "@auth0/nextjs-auth0/client";
import { getUserRoles } from "@/lib/auth/roles";
import ButtonLink from "@/components/ButtonLink";
import { ChatSidebar } from "@/components/chats/ChatSidebar";
import type { NextPage } from "next";
import { useState } from "react";
import { faSignOut } from "@fortawesome/free-solid-svg-icons";
import { cn } from "@/lib/utils";
import { streamReader } from "openai-edge-stream";
import { WelcomeChat } from "@/components/chats/WelcomeChat";
import { v4 as uuid } from "uuid";
import { Message } from "@/components/chats/Message";

// 1️⃣ 定义 Page 类型，允许挂 pageTitle
type PageWithTitle<P = Record<string, unknown>> = NextPage<P> & {
    pageTitle?: string;
};

// 2️⃣ PageProps
type PageProps = {
    roles: string[];
};

type ChatMessage = {
    _id: string;
    role: "user" | "assistant";
    content: string;
};

// 3️⃣ 定义 Chat 页面
const Chat: PageWithTitle<PageProps> = ({ roles }) => {
    const { user } = useUser();
    roles = getUserRoles(user);

    const [incomingMessage, setIncomingMessage] = useState("");
    const [messageText, setMessageText] = useState("");
    const [newChatMessages, setNewChatMessages] = useState<ChatMessage[]>([]);
    const [generatingResponse, setGeneratingResponse] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // 🔥 如果正在生成回复，直接返回，不处理
        if (generatingResponse) {
            return;
        }

        setGeneratingResponse(true);

        try {
            // 1️⃣ 如果有上次 AI 的回复，先归档到消息列表里
            if (incomingMessage) {
                setNewChatMessages((prev) => [
                    ...prev,
                    {
                        _id: uuid(),
                        role: "assistant",
                        content: incomingMessage,
                    },
                ]);
            }

            // 2️⃣ 先把当前输入存到局部变量，避免后面 setState 清空后 fetch 拿到空值
            const currentMessage = messageText;

            // 3️⃣ 清空 incomingMessage，准备接收新的 stream
            setIncomingMessage("");

            // 4️⃣ 把用户消息加进消息列表
            setNewChatMessages((prev) => [
                ...prev,
                {
                    _id: uuid(),
                    role: "user",
                    content: currentMessage,
                },
            ]);

            // 5️⃣ 清空输入框
            setMessageText("");

            // console.log("NEW CHAT", json);
            // 6️⃣ 发起请求 + 接收 stream
            const response = await fetch("/api/chat/sendMessage", {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify({ message: currentMessage }),
            });

            const data = response.body;
            if (!data) return;

            const reader = data.getReader();
            await streamReader(reader, (message) => {
                setIncomingMessage((s) => `${s}${message.content}`);
            });
        } finally {
            // 🔥 无论成功还是失败，都要重置状态
            setGeneratingResponse(false);
        }
    };

    const isMember = roles.includes("Member");
    const roleLabel = roles.length > 0 ? roles.join(", ") : "No Role";

    return (
        <div
            className={cn(
                "flex bg-background",
                isMember ? "border-sidebar-border box-border border-1 rounded-[8px]" : ""
            )}
            style={
                isMember
                    ? {
                        height: "calc(100% - 1rem)",
                        margin: "0.5rem",
                    }
                    : {
                        height: "100%",
                    }
            }
        >
            {!isMember ? (
                // ❌ 非 Member
                <div className="flex flex-col items-center justify-center m-auto">
                    <h2 className="text-center font-bold">
                        Your account has limited access.
                        <br />
                        Please contact the site administrator to unlock full features.
                    </h2>
                    <div className="p-3 mt-10 border-sidebar-border justify-between">
                        <ButtonLink
                            href={`/auth/logout?returnTo=${encodeURIComponent(
                                typeof window !== "undefined" ? window.location.origin : "/"
                            )}`}
                            icon={faSignOut}
                            width="full"
                            radius="rounded"
                        >
                            Log out
                        </ButtonLink>
                    </div>
                </div>
            ) : (
                // ✅ Member 才能看到的内容
                <>
                    <ChatSidebar />

                    <div className="chat--mian-window flex-1 flex flex-col justify-between overflow-hidden min-w-0">
                        <div className="chat-message-window relative overflow-y-scroll flex-1 max-h-[75vh]">
                            {/* 修复：用 length 判断，避免第一条 user 消息闪消失 */}
                            {newChatMessages.length > 0 || incomingMessage ? (
                                <div className="chat-messages">
                                    {newChatMessages.map((message) => (
                                        <Message key={message._id} role={message.role} content={message.content} />
                                    ))}
                                    {!!incomingMessage && <Message role="assistant" content={incomingMessage} />}
                                </div>
                            ) : (
                                <WelcomeChat />
                            )}
                        </div>

                        <div className="border-t border-border p-4 h-[115px]">
                            <form onSubmit={handleSubmit}>
                                <fieldset className="flex gap-2 items-end" disabled={generatingResponse}>
                                    <textarea
                                        value={messageText}
                                        onChange={(e) => setMessageText(e.target.value)}
                                        placeholder="Send a message..."
                                        className="w-full resize-none hover-gradient rounded-md secondary-bg-color p-2 text-white"
                                    />
                                    <button
                                        className="btn-bg-primary button gradient px-3 py-2 h-fit rounded-[8px]"
                                        type="submit"
                                        disabled={generatingResponse}
                                    >
                                        {generatingResponse ? "Generating..." : "Send"}
                                    </button>
                                </fieldset>
                            </form>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

Chat.pageTitle = "X2X Assistant";

const ProtectedChat = withPageAuthRequired(Chat) as PageWithTitle<PageProps>;
ProtectedChat.pageTitle = Chat.pageTitle;

export default ProtectedChat;