import LanguageSwitcher from "../ui/LanguageSwitcher";
import CreateCvButton from "../ui/CreateCvButton";
import DynamicThemeSwitcher from "../ui/DynamicThemeSwitcher";
import NavLink from "../ui/NavLink";
import { useTranslations } from "next-intl";

type MobileMenuProps = {
    isOpen: boolean;
    onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
    const t = useTranslations("Nav");

    return (
        <div className={`h-screen w-full absolute top-20 left-0 p-6 flex flex-col gap-8 z-60 ease-in-out duration-200 ${isOpen ? "opacity-100 translate-y-0 visible" : "opacity-0 -translate-y-5 invisible"}`}>
            <NavLink className="font-semibold text-xl hover:text-text-main" onClick={onClose} page={t("templates")} />
            <NavLink className="font-semibold text-xl hover:" onClick={onClose} page={t("login")} />

            <div className="flex justify-center w-full">
                <span className="block h-px w-[96%] bg-border"></span>
            </div>

            <div className="flex justify-between items-center">
                <p className="text-text-muted font-normal">{t("languageText")}:</p>

                <LanguageSwitcher />
            </div>
            <div className="flex justify-between items-center">
                <p className="text-text-muted font-normal">{t("themeText")}:</p>

                <DynamicThemeSwitcher />
            </div>

            <CreateCvButton className="w-full" />
        </div>
    )
}