
"use client"

import Image, { StaticImageData } from "next/image"
import Button from "./Button"
import { X } from "lucide-react"
import { useEffect } from "react"
import { useTranslations } from "next-intl"
import Modal from "./Modal"

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

        <Modal onClose={onClose} containerClassName="xl:w-[650px]"
            header={
                <div className="flex items-center justify-between py-4 border-b w-full">
                    <h2 className="text-xl font-bold">{name}</h2>
                    <button aria-label={tButton("close")} onClick={onClose} className="p-2 hover:text-text-muted duration-200 cursor-pointer">
                        <X size={24} ariat-hidden="true" />
                    </button>
                </div>
            }
            footer={(close)=> (
                    <div className="py-4 flex flex-col flex-col-reverse sm:flex-row justify-end gap-3 w-full">
                        <Button variant="secondary" className="px-8" text={tButton("close")} onClick={close}  />
                        <Button variant="primary" text={tButton("select")} className="px-8" href={`/cv-builder?template=${id}`}/>
                    </div>
            )}
        >
            <div className="w-full flex flex-col items-center justify-start overflow-hidden">
                <div className="w-full overflow-y-auto pr-1" style={{ maxHeight: 'calc(100vh - 280px)' }}>
                    <div className="relative w-full overflow-hidden">
                        <Image src={image} alt={name} width={800} height={1100} className="w-full h-auto" priority quality={100} />
                    </div>
                </div>
            </div>
        </Modal>
    )
}