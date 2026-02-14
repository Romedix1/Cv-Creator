import { cn } from "@/lib/utils";
import Link from "next/link"

type NavLinkProps = {
    className?: string
    onClick?: () => void;
    text: string;
    href: string;
}

export default function NavLink({className, onClick, text, href}: NavLinkProps) {
        return (
        <Link className={cn("hover:text-default duration-200", className)} onClick={onClick} href={href}>{text}</Link>
    )
}