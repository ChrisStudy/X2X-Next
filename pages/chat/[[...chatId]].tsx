// /pages/chat/[[...chatId]].tsx
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { useUser } from "@auth0/nextjs-auth0/client";
import { getUserRoles } from "@/lib/auth/roles";
import { Auth0Client } from "@auth0/nextjs-auth0/server";
import ButtonLink from "../../components/ButtonLink";

// server-only: 初始化 class 实例
const auth0 = new Auth0Client();

type PageProps = {
    roles: string[];
};

function Chat({ roles }: PageProps) {
    const { user } = useUser(); // 只含标准 profile
     roles = getUserRoles(user);
    const isMember = roles.includes("Member");
    const roleLabel = roles.length > 0 ? roles.join(", ") : "No Role";
    // console.log("Roles claim:", user?.["https://x2xcreative.com.au/roles"]);
    return (
        <div className="grid w-full h-full items-start justify-center bg-zinc-50 font-sans dark:bg-black">
            <div className="flex justify-between items-center p-4 w-full max-w-4xl">
                <div>
                    <h2>Welcome {user?.name}</h2>
                    <p className="text-sm text-gray-500">
                        You are currently under <strong>{roleLabel}</strong>.
                    </p>
                </div>

                {user && (
                    <ButtonLink
                        href={`/auth/logout?returnTo=${encodeURIComponent(
                            typeof window !== "undefined" ? window.location.origin : "/"
                        )}`}
                    >
                        See You Next Time
                    </ButtonLink>

                )}
            </div>

            {!isMember && (
                <div className="w-full max-w-4xl p-4 text-yellow-700 bg-yellow-50 border border-yellow-200 rounded">
                    Your account has limited access.
                    <br />
                    Please contact the site administrator to unlock full features.
                </div>
            )}

            <div className="flex-1 w-full max-w-4xl p-4">
                <h1>X2X Assistant</h1>
                <div className="text-sm text-gray-500 mb-6">Hello, how can I help you.</div>
            </div>
        </div>
    );
}

// ✅ 登录保护
export default withPageAuthRequired(Chat);

Chat.pageTitle = "X2X Assistant";

