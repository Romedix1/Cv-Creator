"use client"

import Image, { StaticImageData } from "next/image";
import { Separator } from "./ui/separator";
import Button from "./ui/Button";
import { useTranslations } from "next-intl";
import useCreateResume from "@/hooks/useCreateResume";
import LimitReachedModal from "./LimitReachedModal";

type TemplateProps = {
    templateId: string;
    name: string;
    image: string | StaticImageData;
    onPreview?: (id: string) => void;
    enablePreview?: boolean;
    canCreate: boolean;
}

export default function Template({ templateId, name, image, onPreview, enablePreview = true, canCreate }: TemplateProps) {
    const tButton = useTranslations("Button")
    const tAlt = useTranslations("ImgAlt")

    const { handleCreate, showLimitModal, setShowLimitModal } = useCreateResume(canCreate, templateId)

    return (
        <article className="group px-2.5 py-2.5 bg-surface border rounded-2xl lg:w-87.5 2xl:w-112.5">
            <div className="relative overflow-y-hidden h-95 sm:h-200 lg:h-120 2xl:h-135">
                <Image src={image} alt={`${tAlt("template")} ${name}`} className="w-full object-cover object-top" fill />
                <div className="hidden lg:flex absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 duration-300 flex-col items-center justify-center px-6 gap-4">
                    <Button variant="primary" text={tButton("select")} className="w-full" onClick={handleCreate} />
                    {enablePreview && onPreview && <Button onClick={() => onPreview(templateId)} variant="secondary" text={tButton("preview")} className="w-full translate-y-4 group-hover:translate-y-0 duration-300 delay-75"/>}
                </div>
            </div>
            <div className="flex flex-col items-center px-4 relative">
                <Separator className="mt-6 mb-2.5" />
                <h2 className="w-full text-text-main font-semibold mt-2.5 mb-4">{name}</h2>

                <Button variant="primary" text={tButton("select")} className="w-full my-2 lg:hidden" onClick={handleCreate} />
                {enablePreview && onPreview && <Button onClick={() => onPreview(templateId)} variant="secondary" text={tButton("preview")} className="w-full my-2 lg:hidden"/>}
            </div>

            {showLimitModal && <LimitReachedModal onClose={() => setShowLimitModal(false)} />}
        </article>
    )
}