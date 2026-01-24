import ButtonLink from "@/components/ButtonLink";

export const ChatSidebar = () => {
    return (
        <div className="chat-sidebar h-full right-border-dashed ">
                <ButtonLink
                    href={`/auth/logout?returnTo=${encodeURIComponent(
                        typeof window !== "undefined" ? window.location.origin : "/"
                    )}`}
                >
                    See You Next Time
                </ButtonLink>
        </div>
    )
}