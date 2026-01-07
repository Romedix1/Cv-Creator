import { useTranslations } from "next-intl"

type ItemHeaderProps = {
    step: string
}

export default function ItemHeader({ step }: ItemHeaderProps) {
    const tBuilder = useTranslations("Builder")

    return (
        <h1 className="text-xl font-bold mb-6">{tBuilder(`edit${step}`)}</h1>
    )
}