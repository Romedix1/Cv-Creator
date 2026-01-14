import { Separator } from "@radix-ui/react-separator";

type TemplateHeaderProps = {
    text: string;
}

export default function TemplateHeader({ text }: TemplateHeaderProps) {
    return (
        <>
            <h2 className="text-text-muted font-bold text-[16px] uppercase mb-2.5">{text}</h2>
            <Separator className="mt-1 mb-2.5 h-0.5 bg-[#E5E7EB] w-full" />
        </>
    )
}