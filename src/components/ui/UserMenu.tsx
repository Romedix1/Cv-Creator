"use client"

import { useTranslations } from "next-intl";
import Image from "next/image";
import { useState } from "react";
import NavLink from "./NavLink";
import { useSignOut } from "@/hooks/useSignOut"
import { Separator } from "@/components/ui/separator";

type UserNameProps = {
    initials: string;
    avatarUrl: string | undefined;
    fullName?: string;
}

export default function UserMenu({ initials, avatarUrl, fullName }: UserNameProps) {
    const tNav = useTranslations("Nav")

    const { signOut, loading } = useSignOut()

    const [isOpen, setIsOpened] = useState(false)
    // TODO: ADD USER PROFILE PICTURE FROM ACCOUNT SETTINGS

    const menuItems = [
        { key: "settings", label: tNav("settings") },
        { key: "myCV", label: tNav("myCV") },
    ]

    const mobileClasses = "font-semibold text-xl hover:text-text-main"
    const desktopClasses = "w-full py-2.5 px-4 hover:bg-surface-hover duration-200 cursor-pointer";

    function renderLinks(isMobile: boolean) {
        return (
            <>
                {menuItems.map((item) => (
                    <NavLink key={item.key} className={isMobile ? mobileClasses : desktopClasses}  page={item.label} />
                ))}

                <button onClick={signOut} className={`${isMobile ? mobileClasses : desktopClasses} text-error text-left`}>{tNav("logout")}</button>
            </>
        )
    }

    return (
        <div className="relative">
            <button onClick={() => setIsOpened((prev) => !prev)} className="cursor-pointer gap-6 flex items-center focus:outline-none">
                {avatarUrl ? (
                    <Image referrerPolicy="no-referrer" src={avatarUrl} width={44} height={44} className="rounded-full object-cover" alt={tNav("userProfileAlt")}/>
                ) : (
                    <div className="w-11 h-11 rounded-full bg-surface-hover flex justify-center items-center hover:border-border transition-colors">
                        <p className="text-text-main font-bold select-none">{initials}</p>
                    </div>
                )}
                <p className="md:hidden">{fullName}</p>
            </button>

            <div className={`flex flex-col gap-8 md:hidden my-8`}>
                {renderLinks(true)}
            </div>

            <Separator className="block md:hidden"/>

            <div className={`border flex-col bg-surface absolute top-20 right-0 w-[270px] rounded-[12px] overflow-hidden hidden md:flex shadow-xl transition-all origin-top-right ${isOpen ? "opacity-100 scale-100 visible" : "opacity-0 scale-95 invisible"}`}>
                {renderLinks(false)}
            </div>
        </div>
    )
}