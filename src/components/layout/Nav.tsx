import NavLink from "../ui/NavLink";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";
import Link from "next/link";
import { User } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/server";
import { getTranslations } from "next-intl/server";

type NavProps = {
    authPage?: boolean;
    user?: User | null;
}

export default async function Nav({ authPage = false, user }: NavProps) {
    const t = await getTranslations("Nav");

    const isAuthenticated = !!user

    function getInitials(name: string) {
        const parts = name.trim().split(/\s+/).filter(Boolean);

        if (parts.length === 0) return ""

        if (parts.length >= 2) {
            return (parts[0][0] + parts[1][0]).toUpperCase()
        }

        return parts[0][0].toUpperCase()
    }

    let avatarUrl: string | undefined = undefined
    let initials: string = ""
    let fullName: string = ""

    if (isAuthenticated) {
        const supabase = await createClient();
        const { data: { user } } = await supabase.auth.getUser()

        if (user) {
            const metadata = user.user_metadata

            avatarUrl = metadata.avatar_url || metadata.picture
            fullName = metadata.full_name || metadata.name

            if(!avatarUrl) {
                initials = getInitials(metadata.full_name || metadata.name || "")
            }
        }
    }


    return (
        <nav className={`bg-background px-5 md:px-8 sticky top-0 z-40 border-b border-border ${authPage ? "md:py-1" : " md:py-4"}`}>
            <div className="flex justify-between w-full h-16 gap-8">
                <div className="flex gap-8 items-center">
                    <Link href="/">
                        <span className="text-main text-2xl font-medium">CV Creator</span>
                    </Link>
                    {!authPage && ( <NavLink className="hidden md:block text-text-muted" page={t("templates")} />)}
                </div>
                {!authPage && (
                    <div className="flex items-center">
                        <MobileNav isAuthenticated={isAuthenticated} avatarUrl={avatarUrl} initials={initials} fullName={fullName}/>
                        <DesktopNav isAuthenticated={isAuthenticated} avatarUrl={avatarUrl} initials={initials}/>
                    </div>
                )}
            </div>
        </nav>
    )
}