"use client"

import EyeIcon from "@/components/icons/EyeIcon"
import { useState } from "react"
import { ResumeData } from "@/types/resumeData"
import { useSearchParams } from "next/navigation"
import ModernBlue from "@/components/ui/ModernBlue"
import { ZoomIn } from "lucide-react"
import FullScreenTemplate from "./FullScreenTemplate"

export default function ResumePreview({ data }: { data: ResumeData }) {
    const [show, setShow] = useState(false)
    const searchParams = useSearchParams()
    const template = searchParams.get('template')

    const getTemplate = () => {
        switch(template) {
            case "modern-blue":
                return <ModernBlue data={data} />
            default:
                return <ModernBlue data={data} />
        }
    }

    return (
        <>
            {show && <FullScreenTemplate template={getTemplate} onClose={() => setShow(false)} />}
            <div className="hidden xl:flex w-120 2xl:w-175 h-full border-l border-border bg-bg-main group relative flex-col">
                <div className="absolute w-full inset-0 z-10 flex items-center justify-center bg-black/70 opacity-0 group-hover:opacity-100 duration-300">
                    <div className="bg-white fixed p-3 rounded-full top-[50%] scale-75 group-hover:scale-100 duration-300 text-default cursor-pointer">
                        <ZoomIn className="w-7 h-7" onClick={() => setShow(!show)} />
                    </div>
                </div>

                <div className="h-full w-full overflow-y-auto overflow-x-hidden pt-8 flex justify-center">
                    <div className="origin-top scale-[0.7] 2xl:scale-[1] mb-16 h-fit transition-transform duration-300">
                        <div className="w-148.75 min-h-210.5 bg-white shadow-2xl">
                            {getTemplate()}
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile button */}
            <div className="fixed bottom-24 right-4 w-14 h-14 bg-default hover:bg-default-hover flex justify-center items-center rounded-full border border-white xl:hidden shadow-lg cursor-pointer" onClick={() => setShow(!show)}>
                <EyeIcon className="w-7.5 h-7.5 text-white"/>
            </div>
        </>
    )
}