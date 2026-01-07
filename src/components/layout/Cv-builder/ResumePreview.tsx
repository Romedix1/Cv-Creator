"use client"
import EyeIcon from "@/components/icons/EyeIcon"
import { useState } from "react"
import ResumeTemplate from "./ResumeTemplate"

type ResumePreviewProps = {
    data: any
}

export default function ResumePreview({ data }: ResumePreviewProps) {
    const [show, setShow] = useState(false)

    return (
        <>
            <div className="hidden xl:flex w-[480px] 2xl:w-[700px] h-full border-l border-border justify-center overflow-y-auto pt-8 overflow-x-hidden">
                <div className="origin-top scale-[0.55] 2xl:scale-[0.83]">
                    <div style={{ width: "794px", minHeight: "1123px" }} className="bg-white shadow-2xl">
                        <ResumeTemplate />
                    </div>
                </div>
            </div>

            <div className="fixed bottom-24 right-4 w-14 h-14 bg-default hover:bg-default-hover flex justify-center items-center rounded-full border border-text-main xl:hidden">
                <EyeIcon className="w-[30px] h-[30px] text-white"/>
            </div>
        </>
    )
}