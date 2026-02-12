import { useTranslations } from "next-intl"
import classicTemplate from '../../../public/images/Templates/classic-corporate.png';
import swissTemplate from '../../../public/images/Templates/swiss-minimalist.png';
import techTemplate from '../../../public/images/Templates/tech-minimal.png';
import Button from "../ui/Button"
import Template from "../ui/Template"

export default function TemplatesSection() {
    const tTemplates = useTranslations("TemplatesSection");

    const TEMPLATES_DATA = [
        { id: 'classic-corporate', name: 'Classic Corporate', category: "classic", image: classicTemplate },
        { id: 'swiss-minimalist', name: 'Swiss Minimalist', category: "minimalist", image: swissTemplate },
        { id: 'tech-minimal', name: 'Tech Minimal', category: "minimalist", image: techTemplate },
    ]


    return (
        <section id="templates-section" className="px-5 py-16 bg-surface-hover flex flex-col gap-16 scroll-mt-[50px]">
            <div className="flex flex-col gap-4">
                <h2 className="text-[28px] text-text-main font-semibold leading-9 text-center 2xl:text-[40px] 2xl:leading-12">{tTemplates("header")}</h2>
                <p className="text-[16px] text-text-muted leading-6 text-center 2xl:text-[18px]">{tTemplates("subtitle")}</p>
            </div>
            <div className="flex flex-col gap-7.5 items-center lg:flex-row lg:gap-5 2xl:justify-center 2xl:gap-7.5">
                {TEMPLATES_DATA.map((template, index) => {
                    return (
                        <Template key={index} templateId={template.id} name={template.name} image={template.image} enablePreview={false} />
                    )
                })}
            </div>

            <div className="flex flex-col items-center">
                <Button className="w-[300px] md:w-[450px] hover:bg-surface!" text={tTemplates("viewAllBtn")} variant="secondary" href="/templates" />
            </div>
        </section>
    )
}