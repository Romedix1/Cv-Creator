import { useTranslations } from "next-intl"
import PlusIcon from "../icons/PlusIcon"

export default function CreateCvBlock() {
    const tDocuments = useTranslations("Dashboard.MyCVs")
    return (
        <article className="bg-[#EFF6FF] dark:bg-transparent border-dashed border-default border-2 rounded-[12px] flex justify-center items-center w-[256px] md:w-[280px] h-[400px] cursor-pointer duration-200 hover:bg-blue-100 dark:hover:bg-blue-500/10 hover:border-opacity-100">
            <div className="flex flex-col items-center gap-2">
                <PlusIcon className="text-default w-12 h-12"/>
                <p className="text-default">{tDocuments("createCVBlock")}</p>
            </div>
        </article>
    )
}