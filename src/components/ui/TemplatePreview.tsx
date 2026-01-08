"use client"

import Image, { StaticImageData } from "next/image"
import Button from "./Button"
import { X } from "lucide-react"
import { useEffect } from "react"
import { useTranslations } from "next-intl"

type TemplatePreviewProps = {
    onClose: () => void
    name: string;
    image: StaticImageData;
    id: string;
}

export default function TemplatePreview({ onClose, name, image, id }: TemplatePreviewProps) {
    const tButton = useTranslations("Button")

    useEffect(() => {
        document.body.style.overflow = "hidden"

        return () => { document.body.style.overflow = "unset"  }
    }, [])

    return (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 sm:p-8" onClick={onClose}>
            <div className="relative bg-surface border h-[90vh] rounded-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-85 duration-200" onClick={(e) => e.stopPropagation()}>
                <div className="flex items-center justify-between p-4 border-b bg-bg-main">
                    <h2 className="text-xl font-bold">{name}</h2>
                    <button aria-label={tButton("close")} onClick={onClose} className="p-2 hover:text-text-muted duration-200 cursor-pointer">
                        <X size={24} ariat-hidden="true" />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-6 flex justify-center">
                    <div className="relative w-150 ">
                         <Image src={image} alt={name} className="w-full h-auto" />
                    </div>
                </div>

                <div className="p-4 flex justify-end gap-3">
                    <Button variant="secondary" className="px-8" text={tButton("close")} onClick={onClose}  />
                    <Button variant="primary" text={tButton("select")} className="px-8" href={`/cv-builder?template=${id}`}/>
                </div>
            </div>
        </div>
    )
}