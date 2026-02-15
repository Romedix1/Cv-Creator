"use client"

import { useLocale, useTranslations } from "next-intl"
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { ArrowLeft, Mail, CheckCircle2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import ApiError from "../_components/ApiError";

export default function ForgotPasswordPage() {
    const tForgot = useTranslations("ForgotPassword")
    const tInput = useTranslations("Inputs")
    const locale = useLocale()

    const [isLoading, setIsLoading] = useState(false)
    const [apiError, setApiError] = useState<string | null>(null)
    const [success, setSuccess] = useState(false)

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setIsLoading(true)
        setApiError(null)

        const formData = new FormData(event.currentTarget)
        const email = formData.get("email") as string
        const supabase = createClient()

        const { error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: `${window.location.origin}/${locale}/auth/reset-password`,
        })

        if (error) {
            setApiError(error.message)
        } else {
            setSuccess(true)
        }

        setIsLoading(false)
    };

    if (success) {
        return (
            <div className="bg-surface border rounded-2xl px-6 py-10 w-full md:w-[440px] flex flex-col items-center text-center animate-in fade-in zoom-in duration-300">
                <div className="p-4 bg-default-hover/15 text-default rounded-full flex items-center justify-center mb-6">
                    <CheckCircle2 size={36} />
                </div>
                <h1 className="text-2xl font-bold mb-2">{tForgot("successHeader")}</h1>
                <p className="text-text-muted text-[15px] mb-8">{tForgot("successSubtitle")}</p>
                <Link href="/login" className="text-default font-semibold flex items-center gap-2 hover:underline">
                    <ArrowLeft size={18} />
                    {tForgot("backToLogin")}
                </Link>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="bg-surface border rounded-2xl px-4 py-8 w-full md:w-[440px]">
            <div className="flex flex-col items-center gap-2 mb-8">
                <div className="p-3 bg-default-hover/10 text-default rounded-full mb-2">
                    <Mail size={28} />
                </div>
                <h1 className="text-[22px] font-semibold">{tForgot("header")}</h1>
                <p className="text-text-muted text-[14px] text-center px-4">{tForgot("subtitle")}</p>
            </div>

            {apiError && <ApiError text={apiError} />}

            <div className="flex flex-col gap-5">
                <Input name="email" label={tInput("emailLabel")} type="email" placeholderValue={tInput("emailPlaceholder")} />
            </div>

            <Button disabled={isLoading} type="submit" variant="primary" text={tForgot("sendBtn")} className="mt-8 w-full" />

            <div className="mt-8 text-center">
                <Link href="/login" className="group text-[14px] text-text-muted hover:text-default font-medium duration-200 flex items-center justify-center gap-2">
                    <ArrowLeft size={16} className="group-hover:-translate-x-1 duration-200" />
                    {tForgot("backToLogin")}
                </Link>
            </div>
        </form>
    );
}