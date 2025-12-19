import FilterBar from "@/components/layout/FilterBar"
import { useTranslations } from "next-intl"

export default function Templates() {
    const tTemplates = useTranslations("Templates")

    return (
        <main className="bg-bg-main pt-20 flex flex-col items-center gap-8 px-5 pb-30 lg:gap-10">
            <h1 className="text-[28px] text-text-main leading-9 font-semibold text-center md:text-[40px]">{tTemplates("header")}</h1>
            <p className="text-[16px] leading-5 text-text-muted text-center md:text-[20px] md:w-8/12">{tTemplates("subtitle")}</p>

            <FilterBar />
        </main>
    )
}