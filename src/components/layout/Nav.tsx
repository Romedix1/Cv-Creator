import { useTranslations } from "next-intl";
import NavLink from "../ui/NavLink";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";
import Link from "next/link";
import { User } from "@supabase/supabase-js";

type NavProps = {
    authPage?: boolean;
    user?: User;
}

export default function Nav({ authPage = false, user }: NavProps) {
    const t = useTranslations("Nav");

    const isAuthenticated = !!user

    return (
        <nav className={`"bg-background px-5 md:px-8 sticky border-b border-border ${authPage ? "md:py-1" : " md:py-4"}`}>
            <div className="flex justify-between w-full h-16 gap-8">
                <div className="flex gap-8 items-center">
                    <Link href="/">
                        <span className="text-main text-2xl font-medium">CV Creator</span>
                    </Link>
                    {!authPage && ( <NavLink className="hidden md:block text-text-muted" page={t("templates")} />)}
                </div>
                {!authPage && (
                    <div className="flex items-center">
                        <MobileNav isAuthenticated={isAuthenticated}/>
                        <DesktopNav isAuthenticated={isAuthenticated}/>
                    </div>
                )}
            </div>
        </nav>
    )
}