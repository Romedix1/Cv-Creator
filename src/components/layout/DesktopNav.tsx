import { useTranslations } from "next-intl";
import CreateCvButton from "../ui/CreateCvButton";
import DynamicThemeSwitcher from "../ui/DynamicThemeSwitcher";
import LanguageSwitcher from "../ui/LanguageSwitcher";
import NavLink from "../ui/NavLink";

export default function DesktopNav() {
    const t = useTranslations("Nav");

    return (
        <div className="hidden md:flex items-center gap-8">
            <div className="flex items-center gap-4">
                <DynamicThemeSwitcher />
                <LanguageSwitcher />
            </div>
            <div className="flex items-center gap-4">
                <div className="w-14 text-right">
                    <NavLink page={t("login")}/>
                </div>
                <CreateCvButton />
            </div>
        </div>
    )
}