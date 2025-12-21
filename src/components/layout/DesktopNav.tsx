import { getTranslations } from "next-intl/server"
import DynamicThemeSwitcher from "../ui/DynamicThemeSwitcher"
import LanguageSwitcher from "../ui/LanguageSwitcher"
import NavLink from "../ui/NavLink"
import Button from "../ui/Button"
import UserMenu from "../ui/UserMenu"

type DesktopNavProps = {
    isAuthenticated: boolean;
    initials: string;
    avatarUrl: string | undefined;
}

export default async function DesktopNav({ isAuthenticated, avatarUrl, initials }: DesktopNavProps) {
    const tNav = await getTranslations("Nav");
    const tButton = await getTranslations("Button");

    return (
        <div className="hidden md:flex items-center gap-8">
            <div className="flex items-center gap-4">
                <DynamicThemeSwitcher />
                <LanguageSwitcher />
            </div>
            <div className="flex items-center gap-4">
                {!isAuthenticated &&
                    <div className="w-14 text-right">
                        <NavLink page={tNav("login")}/>
                    </div>
                }

                <Button className="w-36" variant="primary" text={tButton("createCV")} />
                {isAuthenticated &&
                    <UserMenu avatarUrl={avatarUrl} initials={initials}/>
                }
            </div>
        </div>
    )
}