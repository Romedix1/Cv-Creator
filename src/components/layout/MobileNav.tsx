'use client'

import { useState } from "react";
import HamburgerMenu from "../ui/HamburgerMenu";
import MobileMenu from "./MobileMenu";

type MobileNavProps = {
    isAuthenticated: boolean;
}

export default function MobileNav({ isAuthenticated }: MobileNavProps) {
    const [isOpen, setIsOpen] = useState(false);

    const closeMenu = () => setIsOpen(false);

    return (
        <div className="md:hidden">
            <HamburgerMenu isOpen={isOpen} setIsOpen={setIsOpen} />
            <MobileMenu isOpen={isOpen} onClose={closeMenu} isAuthenticated={isAuthenticated} />
        </div>
    )
}