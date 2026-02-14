"use client"

import { useTranslations } from "next-intl";
import { useState } from "react";
import { useSignOut } from "@/hooks/useSignOut"
import { Separator } from "@/components/ui/separator";
import NavLink from "../ui/NavLink";
import { cn } from "@/lib/utils";
import AppImage from "../ui/AppImage";

type UserNameProps = {
    initials: string;
    avatarUrl: string | undefined;
    onClose?: () => void;
    fullName?: string;
}

export default function UserMenu({ initials, avatarUrl, onClose, fullName }: UserNameProps) {
    const tNav = useTranslations("Nav")

    const { signOut, loading } = useSignOut()

    const [isOpen, setIsOpened] = useState(false)
    // TODO: ADD USER PROFILE PICTURE FROM ACCOUNT SETTINGS

    const menuItems = [
        { key: "dashboard/settings", label: tNav("settings") },
        { key: "dashboard", label: tNav("myCV") },
    ]

    const mobileClasses = "font-semibold text-xl hover:text-text-main"
    const desktopClasses = "w-full py-2.5 px-4 hover:bg-surface-hover duration-200 cursor-pointer";

    function renderLinks(isMobile: boolean) {
        return (
            <>
                {menuItems.map((item) => (
                    <NavLink key={item.key} className={cn(isMobile ? mobileClasses : desktopClasses)} onClick={onClose} text={item.label} href={`/${item.key}`} />
                ))}

                <button onClick={signOut} className={cn(isMobile ? mobileClasses : desktopClasses, "text-error text-left")}>{tNav("logout")}</button>
            </>
        )
    }

    return (
        <div className="relative">
            <button onClick={() => setIsOpened((prev) => !prev)} className="cursor-pointer gap-6 flex items-center focus:outline-none">
                {avatarUrl ? (
                    <div className="relative w-[50px] h-[50px] shrink-0 overflow-hidden rounded-full">
                        <AppImage referrerPolicy="no-referrer" src={avatarUrl} alt={tNav("userProfileAlt")} fill className="object-cover" containerClassName="w-full h-full" />
                    </div>
                ) : (
                    <div className="w-15 h-15 rounded-full bg-surface-hover flex justify-center items-center hover:border-border">
                        <p className="text-text-main font-bold select-none hover:text-default-hover">{initials}</p>
                    </div>
                )}
                <p className="md:hidden">{fullName}</p>
            </button>

            <div className={`flex flex-col gap-8 md:hidden my-8`}>
                {renderLinks(true)}
            </div>

            <Separator className="block md:hidden"/>

            <div className={cn("border flex-col bg-surface absolute top-20 right-0 w-[270px] rounded-[12px] overflow-hidden hidden md:flex shadow-xl transition-all origin-top-right", isOpen ? "opacity-100 scale-100 visible" : "opacity-0 scale-95 invisible")}>
                {renderLinks(false)}
            </div>
        </div>
    )
}