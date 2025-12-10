import { useTranslations } from "next-intl"
import TemplateCard from "../ui/TemplateCard"
import Preview1 from "../../../public/images/Templates/classic-corporate.png"
import Preview2 from "../../../public/images/Templates/tech-minimal.png"
import Preview3 from "../../../public/images/Templates/swiss-minimalist.png"
import Button from "../ui/Button"
import Link from "next/link"

export default function TemplatesSection() {
    const tTemplates = useTranslations("TemplatesSection");

    const TEMPLATES_DATA = [
        { name: "Classic Corporate", img: Preview1 },
        { name: "Tech Minimal", img: Preview2 },
        { name: "Swiss Minimalist", img: Preview3 },
    ];

    return (
        <section className="px-5 py-16 bg-surface-hover flex flex-col gap-16">
            <div className="flex flex-col gap-4">
                <h2 className="text-[28px] text-text-main font-semibold leading-9 text-center 2xl:text-[40px] 2xl:leading-12">{tTemplates("header")}</h2>
                <p className="text-[16px] text-text-muted leading-6 text-center 2xl:text-[18px]">{tTemplates("subtitle")}</p>
            </div>
            <div className="flex flex-col gap-7.5 items-center lg:flex-row lg:gap-5 2xl:justify-center 2xl:gap-7.5">
                {TEMPLATES_DATA.map((template, index) => {
                    return (
                        <TemplateCard key={index} templateName={template.name} templatesImg={template.img}/>
                    )
                })}
            </div>

            <div  className="flex flex-col items-center">
                <Button className="w-[450px] hover:bg-surface!" text={tTemplates("viewAllBtn")} variant="secondary" />
            </div>
        </section>
    )
}