import Link from "next/link";
import { ReactNode } from "react";

type ButtonProps = {
    className?: string;
    type?: "button" | "submit" | "reset";
    disabled?: boolean
    onClick?: () => void;
    variant: "primary" | "secondary" | "remove" | "edit";
    text?: string;
    icon?: ReactNode;
    "aria-label"?: string;
    href?: string;
}

export default function Button({ className, type="button", disabled, onClick, variant, text, icon, "aria-label": ariaLabel, href }: ButtonProps) {
    const baseStyles = "flex justify-center items-center py-2.5 rounded-lg font-semibold cursor-pointer duration-200";

    const variantStyles = variant === "primary" ? "bg-default text-button-text hover:bg-default-hover" : variant === "secondary" ? "bg-transparent text-text-main border border-border hover:bg-surface-hover" : variant === "remove" ? "text-text-muted hover:text-error" : "text-text-muted hover:text-default"

    if (href) {
        return (
            <Link href={href} className={`${className} ${baseStyles} ${variantStyles}`}>
                {text}
            </Link>
        );
    }

    return (
        <button type={type} disabled={disabled} onClick={onClick} aria-label={ariaLabel} className={`${className} ${baseStyles} ${variantStyles}`}>
            {icon && <span className="">{icon}</span>}
            {text}
        </button>
    )
}