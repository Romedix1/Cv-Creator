"use client"

import { useLocale, useTranslations } from "next-intl"
import Link from "next/link"
import { ArrowLeft, CheckCircle2, Loader2, Mail } from "lucide-react"
import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { toast } from "react-toastify"

type RegistrationSuccessProps = {
    email: string;
}

export default function RegistrationSuccess({ email }: RegistrationSuccessProps) {
    const tRegister = useTranslations("Register")
    const tError = useTranslations("Errors")
    const locale = useLocale()
    const [isResending, setIsResending] = useState(false)
    const supabase = createClient()

    const handleResendEmail = async () => {
        setIsResending(true)

        const { error } = await supabase.auth.resend({
            type: 'signup',
            email: email,
            options: {
                emailRedirectTo: `${window.location.origin}/${locale}/auth/callback`,
            },
        })

        if (error) {
            toast.error(tError("resendFailed"))
        } else {
            toast.success(tRegister("resendSuccess"))
        }

        setIsResending(false)
    }

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

                <button onClick={handleResendEmail} disabled={isResending} className="mt-2 text-sm font-bold text-default hover:text-default-hover disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 duration-200 cursor-pointer">
                    {isResending && <Loader2 size={14} className="animate-spin" />}
                    {tRegister("resendLink")}
                </button>
            </div>

            <Link href="/login" className="group text-default font-semibold hover:text-default-hover duration-200 flex items-center gap-2">
                <ArrowLeft className="group-hover:-translate-x-1.5 duration-300" />
                {tRegister("backToLogin")}
            </Link>
        </div>
    )
}