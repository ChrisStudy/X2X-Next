// /pages/chat/[[...chatId]].tsx
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { useUser } from "@auth0/nextjs-auth0/client";
import ButtonLink from "../../components/ButtonLink";

function Chat() {
    const { user } = useUser();

    return (
        <div className="grid w-full h-full items-start justify-center bg-zinc-50 font-sans dark:bg-black">
            {/* Header */}
            <div className="flex justify-between items-center p-4 w-full max-w-4xl">
                <h2>Welcome {user?.name}</h2>
                {user && (
                    <ButtonLink href={`/auth/logout?returnTo=${process.env.NEXT_PUBLIC_BASE_URL}`}>
                        See You Next Time
                    </ButtonLink>
                )}
            </div>

            {/* Chat content */}
            <div className="flex-1 w-full max-w-4xl p-4">
                <h1>X2X Assistant</h1>
                <div className="text-sm text-gray-500 mb-6">
                    Hello, how can I help you.
                </div>
            </div>
        </div>
    );
}

// ✅ 页面级别 SSR 登录保护
export default withPageAuthRequired(Chat);
