import { useState } from "react"
import ButtonLink from "@/components/ButtonLink";
import { useIsMobile} from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

export const ChatSidebar = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const isMobile = useIsMobile();
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
                    "flex-shrink-0 bg-sidebar border-r border-sidebar-border flex flex-col z-50",
                    isMobile
                        ? "fixed inset-y-0 left-0 w-64 transition-transform duration-300 ease-in-out"
                        : "w-64",
                    isMobile && !sidebarOpen && "-translate-x-full"
                )}
            >
                <div className="p-3 flex items-center gap-2">
                    <ButtonLink
                        href={`/auth/logout?returnTo=${encodeURIComponent(
                            typeof window !== "undefined" ? window.location.origin : "/"
                        )}`}
                    >
                        New Chat
                    </ButtonLink>
                </div>
                <div className="relative overflow-hidden flex-1 px-2"></div>
                <div className="p-3 border-t border-sidebar-border hover-gradient">
                    <ButtonLink
                        href={`/auth/logout?returnTo=${encodeURIComponent(
                            typeof window !== "undefined" ? window.location.origin : "/"
                        )}`}
                    >
                        Log out
                    </ButtonLink>
                </div>
            </div>
        </>
    )

}