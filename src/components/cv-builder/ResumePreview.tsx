"use client"

import { useState } from "react"
import ModernBlue from "@/components/templates/ModernBlue"
import { Eye, Settings, X, ZoomIn } from "lucide-react"
import FullScreenTemplate from "../cv-builder/FullScreenTemplate"
import ClassicCorporate from "@/components/templates/ClassicCorporate"
import TechMinimal from "@/components/templates/TechMinimal"
import { FAKE_DATA } from "@/data/fakeData"
import { useTranslations } from "next-intl"
import Input from "../ui/Input"
import { Separator } from "../ui/separator"

type ResumePreviewProps = {
    template: string | null;
    onTemplateChange: (newValue: string) => void;
}

const CHANGE_TEMPLATE_OPTIONS = [
    {label: "Modern Blue", value: "modern-blue"},
    {label: "Classic Corporate", value: "classic-corporate"},
    {label: "Tech Minimal", value: "tech-minimal"},
    {label: "Timeline Modern", value: "timeline-modern"},
    {label: "Swiss Minimalist", value: "swiss-minimalist"},
    {label: "Creative Accent", value: "creative-accent"},
]

export default function ResumePreview({ template, onTemplateChange }: ResumePreviewProps) {
    const tButton = useTranslations("Button")
    const tInput = useTranslations("Inputs")
    const tAria = useTranslations("Aria")

    const [show, setShow] = useState(false)
    const [openSettings, setOpenSettings] = useState(false)

    const getTemplate = () => {
        switch(template) {
            case "modern-blue":
                return <ModernBlue data={FAKE_DATA} />
            case "classic-corporate":
                return <ClassicCorporate data={FAKE_DATA} />
            case "tech-minimal":
                return <TechMinimal data={FAKE_DATA} />
            default:
                return <ModernBlue data={FAKE_DATA} />
        }
    }

    return (
        <>
            {show && <FullScreenTemplate template={getTemplate} onClose={() => setShow(false)} />}
            <div>
                <div className="p-4 border-b border-border 2xl:px-36">
                    <Input name={tInput("changeTemplate")} label={tInput("changeTemplate")} type="select" options={CHANGE_TEMPLATE_OPTIONS} onChange={(e) => onTemplateChange(e.target.value)} className="w-full text-sm"/>
                </div>
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

                                <Separator />

                                <li className="flex flex-col gap-1.5">
                                    <Input name={tInput("changeTemplate")} label={tInput("changeTemplate")} type="select" options={CHANGE_TEMPLATE_OPTIONS} onChange={(e) => onTemplateChange(e.target.value)} className="w-full text-sm"/>
                                </li>
                            </ul>
                        </div>
                    )}

                    <button onClick={() => setOpenSettings((prev) => !prev)} className="w-13 h-13 bg-default hover:bg-default-hover text-white flex justify-center items-center rounded-full border-2 border-white " aria-label={tAria("settings")}>
                        {openSettings ? (
                            <X className="w-7 h-7" />
                        ) : (
                            <Settings className="w-7 h-7" />
                        )}
                    </button>
            </div>
            </div>
        </>
    )
}