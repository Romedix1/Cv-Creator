"use client"

import { useState } from "react"
import ModernBlue from "@/components/templates/ModernBlue"
import { Eye, Settings, X, ZoomIn } from "lucide-react"
import FullScreenTemplate from "../cv-builder/FullScreenTemplate"
import ClassicCorporate from "@/components/templates/ClassicCorporate"
import TechMinimal from "@/components/templates/TechMinimal"
import { FAKE_DATA } from "@/data/fakeData"
import TimelineModern from "../templates/TimelineModern"
import { useTranslations } from "next-intl"
import Input from "../ui/Input"
import { Separator } from "../ui/separator"
import SwissMinimalist from "../templates/SwissMinimalist"
import CreativeAccent from "../templates/CreativeAccent"
import { ResumeData } from "@/types/resumeData"

type ResumePreviewProps = {
    data: ResumeData;
    template: string | null;
}

export default function ResumePreview({ data, template }: ResumePreviewProps) {
    const tButton = useTranslations("Button")
    const tAria = useTranslations("Aria")

    const [show, setShow] = useState(false)
    const [openSettings, setOpenSettings] = useState(false)

    const getTemplate = () => {
        switch(template) {
            case "modern-blue":
                return <ModernBlue data={data} />
            case "classic-corporate":
                return <ClassicCorporate data={data} />
            case "tech-minimal":
                return <TechMinimal data={data} />
            case "timeline-modern":
                return <TimelineModern data={data} />
            case "swiss-minimalist":
                return <SwissMinimalist data={data} />
            case "creative-accent":
                return <CreativeAccent data={data} />
            default:
                return <ModernBlue data={data} />
        }
    }

    return (
        <>
            {show && <FullScreenTemplate template={getTemplate} onClose={() => setShow(false)} />}
            <div>
                <div className="hidden xl:flex w-120 2xl:w-175 h-full border-l border-border bg-bg-main group relative flex-col">

                <div className="absolute w-full inset-0 z-10 flex items-center justify-center bg-black/70 opacity-0 group-hover:opacity-100 duration-300">
                    <div className="bg-white fixed p-3 rounded-full top-[50%] scale-75 group-hover:scale-100 duration-300 text-default cursor-pointer">
                        <ZoomIn className="w-7 h-7" onClick={() => setShow((prev) => !prev)} />
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
            <div className="fixed bottom-24 right-3 sm:right-8 z-50 flex flex-col items-end xl:hidden gap-3">
                {openSettings && (
                    <div className="bg-surface p-4 rounded-xl border border-border w-72 animate-in slide-in-from-bottom-10 fade-in duration-300" onClick={(e) => e.stopPropagation()}>
                        <ul className="flex flex-col gap-4">
                            <li onClick={() => { setShow((prev) => !prev); setOpenSettings(false); }} className="flex bg-default items-center gap-3 p-3 rounded-lg cursor-pointer">
                                <Eye aria-hidden="true" className="w-6 h-6"/>
                                <span className="font-semibold text-sm">{tButton("preview")}</span>
                            </li>
                        </ul>
                    </div>
                )}

                <button className="fixed bottom-24 right-4 w-14 h-14 bg-default hover:bg-default-hover flex justify-center items-center rounded-full border border-white xl:hidden shadow-lg cursor-pointer" onClick={() => setShow((prev) => !prev)} aria-label={tAria("settings")}>
                    <Eye className="w-7.5 h-7.5 text-white"/>
                </button>
            </div>
            </div>
        </>
    )
}