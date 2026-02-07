import {useUser} from "@auth0/nextjs-auth0/client";
import Image from 'next/image';
import {Bot} from "lucide-react";
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github-dark.css';
type MessageProps = {
    role: "user" | "assistant";
    content: string;
};

export const Message = ({ role, content }: MessageProps) => {
    const { user } = useUser();
    const containerClass = role === "user"
        ? "chat-messages grid grid-cols-[auto_45px] gap-3 p-2 justify-end"
        : "chat-messages grid grid-cols-[45px_1fr] gap-3 p-2";

    // user 消息样式，完全像我们对话框
    const messageClass = role === "user"
        ? "rounded-xl p-2 text-right  max-w-[70vw] break-words text-white mb-5"
        : "prose prose-invert max-w-[67vw] pl-0 pt-0 p-2 text-left mr-10 mb-5";

    return (
        <div className={containerClass}>
            {role === "assistant" && <div className="h-10 w-10 rounded-sm bg-gradient-to-br gradient-bg flex items-center justify-center avatar">
                <Bot className="h-[30px] w-[30px] text-primary-foreground" />
            </div>}
            <div
                className={messageClass}
                style={role === "user" ? { backgroundColor: "rgba(50,50,50,0.85)" } : undefined}
            >
                <ReactMarkdown rehypePlugins={[rehypeHighlight]}>{content}</ReactMarkdown>
            </div>
            {role === "user" && user?.picture &&
                <div className="w-10 h-10 rounded-sm bg-gradient-to-br gradient-bg flex items-center justify-center avatar">
                    <Image
                        src={user.picture}
                        width={45}
                        height={45}
                        alt="User Avatar"
                        className={'rounded-sm'}
                    />
                </div>
            }
        </div>
    );
};


