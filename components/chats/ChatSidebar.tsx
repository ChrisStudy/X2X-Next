import { useState, useEffect } from "react"
import ButtonLink from "@/components/ButtonLink";
import { useIsMobile} from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { faMessage, faSignOut, faPlus } from "@fortawesome/free-solid-svg-icons";
import {useUser} from "@auth0/nextjs-auth0";
import Link from "next/link";
import ChatLink from "@/components/ui/ChatLink";
type Chat = {
    _id: string;
    title: string;
};

export const ChatSidebar = ({ chatId }: { chatId: string }) => {
    const [chatlist, setChatList] = useState<Chat[]>([]);
    useEffect( () =>{
        const loadChatList = async () => {
            const response = await fetch('/api/chat/getChatList', {
                method: "POST",
            });
            const json = await response.json();
            console.log("Chat List", json);
            setChatList(json?.chats || []);
        };
        loadChatList()
    },[chatId]);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const isMobile = useIsMobile();
    const { user } = useUser();
    return (
        <>
            {isMobile && sidebarOpen && (
                <div
                    className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40"
                    onClick={() => setSidebarOpen(false)}
                />
            )}
            <div
                className={cn(
                    "flex-shrink-0 bg-sidebar overflow-hidden border-r border-sidebar-border flex flex-col z-50",
                    isMobile
                        ? "fixed inset-y-0 left-0 w-64 transition-transform duration-300 ease-in-out"
                        : "w-64",
                    isMobile && !sidebarOpen && "-translate-x-full"
                )}
            >
                <div>
                    <h2 className="text-center pt-3 pb-3">Welcome <span className="gradient-text font-bold">{user?.name}</span> </h2>
                </div>
                <div className="p-3 flex items-center gap-2">
                    <ButtonLink
                        href={`/chats`} width="full" radius="rounded" icon={faPlus}
                    >
                        New Chat
                    </ButtonLink>
                </div>
                <div className="relative overflow-auto flex-1 px-2">
                    {chatlist.map(chat=> (
                        <ChatLink title={chat.title} key={chat._id} href={`/chats/${chat._id}`} icon={faMessage} className={chatId === chat._id ? "gradient-bg rounded-md" : ""}>
                            {chat.title}
                        </ChatLink>
                    ))}
                </div>
                <div className="p-3 border-t border-sidebar-border justify-between" >
                    <ButtonLink
                        href={`/auth/logout?returnTo=${encodeURIComponent(
                            typeof window !== "undefined" ? window.location.origin : "/"
                        )}`} icon={faSignOut} width="full" radius="rounded"
                    >
                        Log out
                    </ButtonLink>
                </div>
            </div>
        </>
    )

}