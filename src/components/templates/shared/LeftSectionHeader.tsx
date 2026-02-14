import { cn } from "@/lib/utils";

type LeftSectionHeaderProps = {
    text: string;
    font?: string;
    className?: string;
}

export default function LeftSectionHeader({ text, font, className }: LeftSectionHeaderProps) {
    return (
        <h2 className={cn("text-[12px] font-bold text-center", font, className)}>{text}</h2>
    )
}