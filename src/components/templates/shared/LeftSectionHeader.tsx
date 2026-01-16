type LeftSectionHeaderProps = {
    text: string;
    font?: string;
    className?: string;
}

export default function LeftSectionHeader({ text, font, className }: LeftSectionHeaderProps) {
    return (
        <h2 className={`text-[12px] font-bold ${font} ${className}`}>{text}</h2>
    )
}