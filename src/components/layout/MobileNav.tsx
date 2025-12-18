'use client'

import { useState } from "react";
import HamburgerMenu from "../ui/HamburgerMenu";
import MobileMenu from "./MobileMenu";

type MobileNavProps = {
    isAuthenticated: boolean;
    initials: string;
    avatarUrl: string | undefined;
    fullName: string;
}

export default function MobileNav({ isAuthenticated, avatarUrl, initials, fullName }: MobileNavProps) {
    const [isOpen, setIsOpen] = useState(false);

    const closeMenu = () => setIsOpen(false);

    return (
        <div className="md:hidden">
            <HamburgerMenu isOpen={isOpen} setIsOpen={setIsOpen} />
            <MobileMenu isOpen={isOpen} onClose={closeMenu} isAuthenticated={isAuthenticated} avatarUrl={avatarUrl} initials={initials} fullName={fullName}/>
        </div>
    )
}