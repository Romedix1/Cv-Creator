import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

type SectionHeaderProps = {
    text: string;
    font?: string;
    className?: string;
}

export default function SectionHeader({ text, font, className }: SectionHeaderProps) {
    return (
        <>
            <h2 className={cn("text-text-muted mb-2.5 font-bold text-[16px] uppercase", font, className)}>{text}</h2>
            <Separator className="my-2 h-0.5 bg-[#E5E7EB] w-full" />
        </>
    )
}