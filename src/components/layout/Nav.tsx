import { useTranslations } from "next-intl";
import NavLink from "../ui/NavLink";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";
import Link from "next/link";

export default function Nav() {
    const t = useTranslations("Nav");

    return (
        <nav className="bg-background px-5 md:px-8 md:py-4 sticky">
            <div className="flex justify-between w-full h-16 gap-8">
                <div className="flex gap-8 items-center">
                    <Link href="/">
                        <span className="text-main text-2xl font-medium">CV Creator</span>
                    </Link>
                    <NavLink className="hidden md:block text-text-muted" page={t("templates")} />
                </div>

                <div className="flex items-center">
                    <MobileNav />
                    <DesktopNav />
                </div>
            </div>
        </nav>
    )
}