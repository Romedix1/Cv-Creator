import { useTranslations } from "next-intl";

type ButtonProps = {
    className?: string;
    onClick?: () => void;
    variant: "primary" | "secondary";
    text: string
}

export default function Button({ className, onClick, variant, text }: ButtonProps) {
    const t = useTranslations("Button");

    const baseStyles = "flex justify-center py-2.5 rounded-lg font-semibold cursor-pointer duration-200";

    const variantStyles = variant === "primary" ? "bg-default text-button-text hover:bg-default-hover" : "bg-transparent text-text-main border border-border hover:bg-surface-hover";

    return (
        <button onClick={onClick} className={`${className} ${baseStyles} ${variantStyles}`}>
            {text}
        </button>
    )
}