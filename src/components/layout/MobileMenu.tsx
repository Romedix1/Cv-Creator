import LanguageSwitcher from "../ui/LanguageSwitcher";
import DynamicThemeSwitcher from "../ui/DynamicThemeSwitcher";
import NavLink from "../ui/NavLink";
import { useTranslations } from "next-intl";
import Button from "../ui/Button";
import { Separator } from "../ui/separator";

type MobileMenuProps = {
    isOpen: boolean;
    onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
    const tNav = useTranslations("Nav");
    const tButton = useTranslations("Button");

    return (
        <div className={`h-screen w-full absolute top-20 left-0 p-6 flex flex-col gap-8 z-60 ease-in-out duration-200 bg-background ${isOpen ? "opacity-100 translate-y-0 visible" : "opacity-0 -translate-y-5 invisible"}`}>
            <NavLink className="font-semibold text-xl hover:text-text-main" onClick={onClose} page={tNav("templates")} />
            <NavLink className="font-semibold text-xl hover:" onClick={onClose} page={tNav("login")} />

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