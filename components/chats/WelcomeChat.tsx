import {Bot} from "lucide-react";

export const WelcomeChat = () => {
    return (
        <div className="chat-welcome flex flex-col items-center h-full justify-center">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br gradient-bg flex items-center justify-center">
                <Bot className="h-10 w-10 text-primary-foreground" />
            </div>
            <h2 className="text-xl text-center text-white mt-6 mb-6">
                Hello, I'm X2X Assistant, how can I help you.
            </h2>
        </div>
        )
}