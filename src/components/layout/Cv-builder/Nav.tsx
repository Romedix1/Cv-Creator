"use client"

import { DownloadIcon } from "lucide-react";
import ArrowIcon from "../../icons/ArrowIcon";
import CloudSavedIcon from "../../icons/CloudSaved";
import PenIcon from "../../icons/PenIcon";
import { useState } from "react";
import { useTranslations } from "use-intl";
import Link from "next/link";
import Button from "@/components/ui/Button";

type CvBuilderNavProps = {
    isAuthenticated: boolean
}

export default function CvBuilderNav({ isAuthenticated }: CvBuilderNavProps) {
    const tBuilderNav = useTranslations("BuilderNav")
    const tAria = useTranslations("Aria")

    const [title, setTitle] = useState(tBuilderNav("documentName"))

    return (
        <nav className="relative bg-bg-main p-3 border-b border-border flex items-center justify-between">
            <div className="sm:flex items-center">
                <div className="flex items-center gap-2 h-full">
                    <Link href={`${isAuthenticated ? "/dashboard" : "/"}`} aria-label={`${isAuthenticated ? tAria("backToDashboard") : tAria("backToMainPage")}`} className="p-2 rounded-md cursor-pointer text-text-muted hover:text-text-main duration-200">
                        <ArrowIcon aria-hidden="true" className="w-6 h-6 lg:w-8 lg:h-8" />
                    </Link>
                    <div className="w-px my-0.5 bg-border self-stretch" />
                </div>

                <div className="absolute sm:relative lg:ml-4 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 sm:translate-0 sm:left-0 sm:top-0 max-w-[40%] sm:w-[400px] lg:w-[600px]">
                    <div className="flex items-center justify-center sm:justify-start gap-2 rounded-md px-2 py-1.5">
                        <input aria-label={tBuilderNav("documentName")} id="title" name="title" type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="bg-transparent border-none outline-none font-semibold text-sm text-foreground text-center min-w-5 p-0 focus:border-default focus:bg-surface" style={{ fieldSizing: "content" } as React.CSSProperties} />

                        <div>
                            <span className="sr-only">{tBuilderNav("editTitle")}</span>
                            <PenIcon aria-hidden="true" className="w-4 h-4 lg:w-5 lg:h-5 text-text-muted cursor-text" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-1">
                <div role="status" aria-live="polite" className="hidden sm:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center gap-2 lg:gap-3 text-text-main pointer-events-none select-none">
                    <span className="text-sm font-medium lg:text-[18px]">{tBuilderNav("saved")}</span>
                    <CloudSavedIcon aria-hidden="true" className="w-5 h-5 lg:w-6 lg:h-6" />
                </div>

                <button type="button" aria-label={tAria("downloadPDF")} className="flex items-center justify-center gap-2 rounded-md sm:bg-default sm:text-text-main hover:bg-default-hover duration-200 cursor-pointer sm:px-4 sm:py-2">
                    <span className="hidden sm:block text-sm lg:text-[17x] font-bold">{tBuilderNav("download")}</span>
                    <DownloadIcon aria-hidden="true" className="w-5 h-5" />
                </button>
            </div>
        </nav>
    )
}