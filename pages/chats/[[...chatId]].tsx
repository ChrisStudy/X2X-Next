// /pages/chats/[[...chatId]].tsx
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { useUser } from "@auth0/nextjs-auth0/client";
import { getUserRoles } from "@/lib/auth/roles";
import ButtonLink from "@/components/ButtonLink";
import { ChatSidebar } from "@/components/chats/ChatSidebar";
import type { NextPage } from "next";
import {useState} from "react";

// 1️⃣ 定义 Page 类型，允许挂 pageTitle
type PageWithTitle<P = Record<string, unknown>> = NextPage<P> & {
    pageTitle?: string;
};


// 2️⃣ PageProps
type PageProps = {
    roles: string[];
};

// 3️⃣ 定义 Chat 页面
const Chat: PageWithTitle<PageProps> = ({ roles }) => {
    const { user } = useUser();
    roles = getUserRoles(user);
    const [messageText, setMessageText] = useState("");
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Message Text: ", messageText);
    }
    const isMember = roles.includes("Member");
    const roleLabel = roles.length > 0 ? roles.join(", ") : "No Role";

    return (
        <div className="flex h-full bg-background">
            {!isMember && (
                <div className="w-full max-w-4xl p-4 text-yellow-700 bg-yellow-50 border border-yellow-200 rounded">
                    Your account has limited access.
                    <br />
                    Please contact the site administrator to unlock full features.
                </div>
            )}

            <ChatSidebar />

            <div className="chat--mian-window flex-1 flex flex-col min-w-0">
                <div className="chat-window relative overflow-hidden flex-1">
                    <h1>X2X Assistant</h1>
                    <div className="text-sm text-gray-500 mb-6">Hello, how can I help you.</div>
                    <div className="flex justify-between items-center p-4 w-full max-w-4xl">
                        <div>
                            <h2>Welcome {user?.name}</h2>
                            <p className="text-sm text-gray-500">
                                You are currently under <strong>{roleLabel}</strong>.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="border-t border-border p-4">
                    <form onSubmit={handleSubmit}>
                        <fieldset className="flex gap-2 items-end">
                            <textarea value={messageText} onChange={(e) => setMessageText(e.target.value)} placeholder="Send a message..." className="w-full resize-none hover-gradient rounded-md secondary-bg-color p-2 text-white"/>
                            <button className="btn-bg-primary button gradient px-3 py-2 h-fit" type="submit">
                                Send
                            </button>
                        </fieldset>
                    </form>
                </div>
            </div>
        </div>
    );
};

// 4️⃣ 静态属性 pageTitle
Chat.pageTitle = "X2X Assistant";

// 5️⃣ 包 Auth0 并保留 pageTitle
const ProtectedChat = withPageAuthRequired(Chat) as PageWithTitle<PageProps>;
ProtectedChat.pageTitle = Chat.pageTitle;

// 6️⃣ 默认导出
export default ProtectedChat;
