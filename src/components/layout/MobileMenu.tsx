import { useTranslations } from "next-intl";
import UserMenu from "./UserMenu";
import NavLink from "../ui/NavLink";
import { Separator } from "../ui/separator";
import LanguageSwitcher from "../LanguageSwitcher";
import DynamicThemeSwitcher from "../ui/DynamicThemeSwitcher";
import Button from "../ui/Button";
import { cn } from "@/lib/utils";

type MobileMenuProps = {
    isAuthenticated: boolean;
    isOpen: boolean;
    onClose: () => void;
    initials: string;
    avatarUrl: string | undefined;
    fullName: string;
}

export default function MobileMenu({ isAuthenticated, isOpen, onClose, avatarUrl, initials, fullName }: MobileMenuProps) {
    const tNav = useTranslations("Nav");
    const tButton = useTranslations("Button");

    return (
        <div className={cn("h-screen w-full absolute top-[65px] left-0 p-6 flex flex-col gap-8 z-60 ease-in-out duration-200 bg-background", isOpen ? "opacity-100 translate-y-0 visible" : "opacity-0 -translate-y-5 invisible")}>
            {isAuthenticated &&
                <UserMenu avatarUrl={avatarUrl} initials={initials} onClose={onClose} fullName={fullName}/>
            }

            <NavLink className="font-semibold text-xl hover:text-text-main" onClick={onClose} text={tNav("templates")} href="/templates" />
            {!isAuthenticated && <NavLink className="font-semibold text-xl hover:text-text-main" onClick={onClose} text={tNav("login")} href="/login" />}

            <div className="flex justify-center w-full">
                <Separator />
            </div>

            <div className="flex justify-between items-center">
                <p className="text-text-muted font-normal">{tNav("languageText")}:</p>

                <LanguageSwitcher />
            </div>
            <div className="flex justify-between items-center">
                <p className="text-text-muted font-normal">{tNav("themeText")}:</p>

                <DynamicThemeSwitcher />
            </div>

            <Button className="w-full" variant="primary" text={tButton("createCV")} />
        </div>
    )
}