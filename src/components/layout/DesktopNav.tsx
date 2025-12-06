import CreateCvButton from "../ui/CreateCvButton";
import DynamicThemeSwitcher from "../ui/DynamicThemeSwitcher";
import LanguageSwitcher from "../ui/LanguageSwitcher";
import NavLink from "../ui/NavLink";

export default function DesktopNav() {
    return (
        <div className="hidden md:flex items-center gap-8">
            <div className="flex items-center gap-4">
                <DynamicThemeSwitcher />
                <LanguageSwitcher />
            </div>
            <div className="flex items-center gap-4">
                <NavLink className="" page="Login"/>
                <CreateCvButton className="w-" />
            </div>
        </div>
    )
}