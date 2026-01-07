import { useTranslations } from "next-intl"

type SectionHeaderProps = {
    step: string
}

export default function SectionHeader({ step }: SectionHeaderProps) {
    const tBuilder = useTranslations("Builder")

    return (
        <div>
            <h1 className="text-xl font-bold text-text-main">{tBuilder(`${step}Header`)}</h1>
            <p className="text-sm text-text-muted mt-1">{tBuilder(`${step}Subtitle`)}</p>
        </div>
    )
}