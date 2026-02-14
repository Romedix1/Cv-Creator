import { canCreateMoreResumes } from "@/lib/resume/server"
import { getTranslations } from "next-intl/server"
import FilterBar from "./_components/FilterBar"

export default async function Templates() {
    const tTemplates = await getTranslations("Templates")

    const canCreate = await canCreateMoreResumes()

    return (
        <main className="bg-bg-main w-full pt-20 flex flex-col items-center gap-8 px-5 pb-30 lg:gap-10">
            <h1 className="text-[28px] text-text-main leading-9 font-semibold text-center md:text-[40px]">{tTemplates("header")}</h1>
            <p className="text-[16px] leading-5 text-text-muted text-center md:text-[20px] md:w-8/12">{tTemplates("subtitle")}</p>

            <FilterBar canCreate={canCreate} />
        </main>
    )
}