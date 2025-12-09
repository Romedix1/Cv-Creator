import { useTranslations } from "next-intl";
import DynamicThemeSwitcher from "../ui/DynamicThemeSwitcher";
import LanguageSwitcher from "../ui/LanguageSwitcher";
import NavLink from "../ui/NavLink";
import Button from "../ui/Button";

export default function DesktopNav() {
    const tNav = useTranslations("Nav");
    const tButton = useTranslations("Button");

    return (
        <div className="hidden md:flex items-center gap-8">
            <div className="flex items-center gap-4">
                <DynamicThemeSwitcher />
                <LanguageSwitcher />
            </div>
            <div className="flex items-center gap-4">
                <div className="w-14 text-right">
                    <NavLink page={tNav("login")}/>
                </div>

                <Button className="w-36" variant="primary" text={tButton("createCV")} />
            </div>
        </div>
    )
}