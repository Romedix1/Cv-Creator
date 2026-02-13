import { useTranslations } from "next-intl"
import { Plus } from "lucide-react"
import Link from "next/link"

export default function CreateResumeBlock() {
    const tDocuments = useTranslations("Dashboard.MyCVs")
    return (
        <Link href={"/templates"}>
            <article className="bg-[#EFF6FF] dark:bg-transparent border-dashed border-default border-2 rounded-[12px] flex justify-center items-center w-70 h-100 cursor-pointer duration-200 hover:bg-blue-100 dark:hover:bg-blue-500/10 hover:border-opacity-100">
                <div className="flex flex-col items-center gap-2">
                    <Plus className="text-default w-12 h-12"/>
                    <p className="text-default">{tDocuments("createCVBlock")}</p>
                </div>
            </article>
        </Link>
    )
}