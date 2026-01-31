// /pages/chats/[[...chatId]].tsx
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { useUser } from "@auth0/nextjs-auth0/client";
import { getUserRoles } from "@/lib/auth/roles";
import ButtonLink from "@/components/ButtonLink";
import { ChatSidebar } from "@/components/chats/ChatSidebar";
import type { NextPage } from "next";
import {useState} from "react";
import {faSignOut} from "@fortawesome/free-solid-svg-icons";
import { cn } from "@/lib/utils";
import {streamReader} from "openai-edge-stream";

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
    // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    //     e.preventDefault();
    //     console.log("Message Text: ", messageText);
    //     const response = await fetch('/api/chat/sendMessage', {
    //         method: "POST",
    //         headers: {
    //             'content-type': 'application/json'
    //         },
    //         body: JSON.stringify({message: messageText}),
    //         });
    //     const data = response.body;
    //     if(!data) {
    //         return
    //     }
    //     const reader = data.getReader();
    //     await streamReader(reader, (message) => {
    //         console.log('MESSAGE:', message);
    //     });
    // };
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        console.log('Message Text:', messageText);

        const response = await fetch('/api/chat/sendMessage', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: messageText }),
        });

        if (!response.body) {
            console.log('No body stream at all');
            return;
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder();

        while (true) {
            const { value, done } = await reader.read();
            if (done) break;

            // 每个 chunk 直接打印
            console.log('OpenAI chunk:', decoder.decode(value));
        }

        console.log('Stream finished');
    };

    const isMember = roles.includes("Member");
    const roleLabel = roles.length > 0 ? roles.join(", ") : "No Role";

    return (
        <div
            className={cn(
                "flex bg-background",
                isMember
                    ? "border-sidebar-border box-border border-1 rounded-[8px]"
                    : ""
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
                    <div className="p-3 mt-10 border-sidebar-border justify-between" >
                        <ButtonLink
                            href={`/auth/logout?returnTo=${encodeURIComponent(
                                typeof window !== "undefined" ? window.location.origin : "/"
                            )}`} icon={faSignOut} width="full" radius="rounded"
                        >
                            Log out
                        </ButtonLink>
                    </div>
                </div>

            ) : (
                // ✅ Member 才能看到的内容
                <>
                    <ChatSidebar />

                    <div className="chat--mian-window flex-1 flex flex-col min-w-0">
                        <div className="chat-window relative overflow-hidden flex-1">
                            <h1>X2X Assistant</h1>
                            <div className="text-sm text-gray-500 mb-6">
                                Hello, how can I help you.
                            </div>

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
                <textarea
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    placeholder="Send a message..."
                    className="w-full resize-none hover-gradient rounded-md secondary-bg-color p-2 text-white"
                />
                                    <button
                                        className="btn-bg-primary button gradient px-3 py-2 h-fit rounded-[8px]"
                                        type="submit"
                                    >
                                        Send
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
