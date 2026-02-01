type MessageProps = {
    role: "user" | "assistant";
    content: string;
};

export const Message = ({ role, content }: MessageProps) => {
    const containerClass = role === "user"
        ? "chat-messages grid grid-cols-[auto_30px] gap-3 p-2 justify-end"
        : "chat-messages grid grid-cols-[30px_1fr] gap-3 p-2";

    // user 消息样式，完全像我们对话框
    const messageClass = role === "user"
        ? "rounded-xl p-3 text-right  max-w-[70vw] break-words text-white"
        : "p-3 text-left";

    return (
        <div className={containerClass}>
            {role === "assistant" && <div className="avatar">avatar</div>}
            <div
                className={messageClass}
                style={role === "user" ? { backgroundColor: "rgba(50,50,50,0.85)" } : undefined}
            >
                {content}
            </div>
            {role === "user" && <div className="avatar">avatar</div>}
        </div>
    );
};


