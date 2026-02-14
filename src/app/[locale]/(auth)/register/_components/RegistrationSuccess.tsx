"use client"

import { useTranslations } from "next-intl"
import Link from "next/link"
import { ArrowLeft, CheckCircle2, Mail } from "lucide-react"

export default function RegistrationSuccess() {
    const tRegister = useTranslations("Register")

    return (
        <div className="bg-surface border rounded-2xl px-6 py-10 w-full md:w-[440px] flex flex-col items-center text-center animate-in fade-in zoom-in duration-300">
            <div className="p-4 bg-default-hover/15 text-default rounded-full flex items-center justify-center mb-6">
                <CheckCircle2 size={36} />
            </div>

            <h1 className="text-2xl font-bold text-text-default mb-2">{tRegister("successHeader")}</h1>

            <p className="text-text-muted text-[15px] leading-relaxed mb-8">{tRegister("successSubtitle")}</p>

            <div className="bg-bg-main rounded-xl p-4 w-full mb-8 border border-dashed flex flex-col gap-2">
                <div className="flex items-center justify-center gap-2 text-sm text-text-muted font-medium">
                    <Mail size={16} />
                    <span>{tRegister("dontGetEmail")}</span>
                </div>
                <p className="text-xs text-text-muted opacity-70">{tRegister("dontGetEmailText")}</p>
            </div>

            <Link href="/login" className="group text-default font-semibold hover:text-default-hover duration-200 flex items-center gap-2">
                <ArrowLeft className="group-hover:-translate-x-1.5 duration-300" />
                {tRegister("backToLogin")}
            </Link>
        </div>
    )
}