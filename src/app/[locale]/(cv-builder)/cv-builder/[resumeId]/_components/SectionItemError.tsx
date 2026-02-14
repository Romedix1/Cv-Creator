import { useTranslations } from "next-intl"

export default function SectionItemError() {
    const tBuilder = useTranslations("Builder")

    return (
        <div className="flex justify-center mt-12">
            <p className="text-error text-xl">{tBuilder("loadingError")}</p>
        </div>
    )
}