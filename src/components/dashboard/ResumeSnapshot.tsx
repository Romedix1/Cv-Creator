"use client"

import { useTranslations } from "next-intl";
import Image from "next/image";
import { useState } from "react";

type ResumeSnapshotType = {
    src: string;
    alt: string;
}

export default function ResumeSnapshot({ src, alt }: ResumeSnapshotType) {
    const tDocuments = useTranslations("Dashboard.MyCVs")

    const [error, setError] = useState(false)

    if (error || !src) {
        return (
            <div className="w-full h-full bg-surface-hover flex items-center justify-center text-center">
                <p>{tDocuments("missingSnapshot")}</p>
            </div>
        )
    }

    return (
        <Image src={src} alt={alt} fill className="object-cover object-top group-hover:scale-105 duration-400" onError={() => setError(true)}/>
    )
}