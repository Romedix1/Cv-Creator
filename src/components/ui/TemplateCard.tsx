import Image, { StaticImageData } from "next/image"
import { Separator } from "./separator";

type TemplateCardProps = {
    templateName: string;
    templatesImg: StaticImageData;
}

export default function TemplateCard({ templateName, templatesImg }: TemplateCardProps) {
    return (
        <div className="p-2.5 md:p-3 bg-bg-surface rounded-2xl border border-solid border-border 2xl:w-[380px]">
            <div className="rounded-[6px] overflow-hidden">
                <Image src={templatesImg} alt={`Template ${templateName}`} />
            </div>

            <div className="p-6 gap-2.5 flex flex-col">
                <Separator />
                <p className="text-xl font-semibold leading-7">{templateName}</p>
            </div>
        </div>
    )
}