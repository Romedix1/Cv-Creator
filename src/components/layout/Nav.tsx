import NavLink from "../ui/NavLink";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";
import Link from "next/link";
import { User } from "@supabase/supabase-js";
import { getTranslations } from "next-intl/server";
import { getUserProfile } from "@/lib/getUserProfile";

type NavProps = {
    authPage?: boolean;
    user?: User | null;
}

export default async function Nav({ authPage = false, user }: NavProps) {
    const t = await getTranslations("Nav");

    const isAuthenticated = !!user

    let avatarUrl: string | undefined = undefined
    let initials: string = ""
    let fullName: string = ""

    if (isAuthenticated) {
        const userProfile = await getUserProfile()

        if (userProfile) {
            avatarUrl = userProfile.avatarUrl
            initials = userProfile.initials
            fullName = userProfile.fullName
        }
    }

    return (
        <nav className={`bg-background px-5 md:px-8 sticky top-0 z-40 border-b border-border ${authPage ? "md:py-1" : " md:py-4"}`}>
            <div className="flex justify-between w-full h-16 gap-8">
                <div className="flex gap-8 items-center">
                    <Link href="/">
                        <span className="text-main text-2xl font-medium">CV Creator</span>
                    </Link>
                    {!authPage && (<NavLink className="hidden md:block text-text-muted" page={t("templates")} />)}
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