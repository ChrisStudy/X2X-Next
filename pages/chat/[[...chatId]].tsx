// /pages/chat/[[...chatId]].tsx
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { useUser } from "@auth0/nextjs-auth0/client";
import type { GetServerSideProps } from "next";
import { Auth0Client } from "@auth0/nextjs-auth0/server";
import ButtonLink from "../../components/ButtonLink";

// server-only: 初始化 class 实例
const auth0 = new Auth0Client();

type PageProps = {
    roles: string[];
};

function Chat({ roles }: PageProps) {
    const { user } = useUser(); // 只含标准 profile
    const rolesArray = Array.isArray(user?.["https://x2xcreative.com.au/roles"])
        ? user!["https://x2xcreative.com.au/roles"]
        : [user!["https://x2xcreative.com.au/roles"]]; // 如果是单个字符串就包成数组

    const isMember = rolesArray.includes("Member");
    const roleLabel = rolesArray.length > 0 ? rolesArray.join(", ") : "No Role";
    console.log("Roles claim:", user?.["https://x2xcreative.com.au/roles"]);
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
                    <ButtonLink href={`/auth/logout?returnTo=http://localhost:3000`}>
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

// ✅ Server-side 获取自定义 claim
export const getServerSideProps: GetServerSideProps<PageProps> = async (ctx) => {
    // 传 req 给类实例，拿到 session
    const session = await auth0.getSession(ctx.req);

    const claims = session?.idTokenClaims as {
        "https://x2xcreative.com.au/roles"?: string[];
    };

    return {
        props: {
            roles: claims?.["https://x2xcreative.com.au/roles"] ?? [],
        },
    };
};

// ✅ 登录保护
export default withPageAuthRequired(Chat);

Chat.pageTitle = "X2X Assistant";

