'use client'

import { useRef, useState } from "react";
import HamburgerMenu from "../ui/HamburgerMenu";
import MobileMenu from "./MobileMenu";

export default function MobileNav() {
    const [isOpen, setIsOpen] = useState(false);

    const closeMenu = () => setIsOpen(false);

    return (
        <div className="md:hidden">
            <HamburgerMenu isOpen={isOpen} setIsOpen={setIsOpen} />
            <MobileMenu isOpen={isOpen} onClose={closeMenu} />
        </div>
    )
}