"use client"

import { FormEvent, useState } from "react"
import { useTranslations } from "next-intl"
import Button from "@/components/ui/Button"
import Input from "@/components/ui/Input"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"
import { ShieldCheck } from "lucide-react"
import { createClient } from "@/lib/supabase/client"

export default function ResetPasswordPage() {
    const tReset = useTranslations("ResetPassword")
    const tValidation = useTranslations("Validation")
    const router = useRouter()

    const [isLoading, setIsLoading] = useState(false)
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsLoading(true)
        setMessage(null)

        const formdata = new FormData(e.currentTarget)
        const newPassword = formdata.get("newPassword") as string
        const confirmPassword = formdata.get("confirmPassword") as string

        if (newPassword !== confirmPassword) {
            setMessage({ type: 'error', text: tValidation("passwordsDontMatch") })
            setIsLoading(false)
            return
        }

        if (newPassword.length < 6) {
            setMessage({ type: 'error', text: tValidation("passwordMin") })
            setIsLoading(false)
            return
        }

        const supabase = createClient()

        try {
            const { error } = await supabase.auth.updateUser({ password: newPassword })

            if (error) throw error

            setMessage({ type: 'success', text: tReset("passwordUpdated") })

            setTimeout(() => {
                router.push("/dashboard")
                router.refresh()
            }, 2000)

        } catch {
            setMessage({ type: 'error', text: tValidation("genericPasswordUpdateError") })
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="bg-surface border rounded-2xl px-6 py-10 w-full md:w-[440px] animate-in fade-in zoom-in duration-300">
            <div className="flex flex-col items-center gap-2 mb-8">
                <div className="p-3 bg-default-hover/10 text-default rounded-full mb-2">
                    <ShieldCheck size={32} />
                </div>
                <h1 className="text-[22px] font-semibold text-center">{tReset("header")}</h1>
                <p className="text-text-muted text-[14px] text-center px-4">{tReset("subtitle")}</p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <Input name="newPassword" label={tReset("newPasswordLabel")} type="password" placeholderValue="**********" required />
                <Input name="confirmPassword" label={tReset("confirmPasswordLabel")} type="password" placeholderValue="**********" required />

                {message && (
                    <p className={cn("text-sm font-semibold text-center p-3 rounded-lg bg-opacity-10", message.type === "success" ? "text-text-main bg-default/70" : "text-error bg-error/10")}>{message.text}</p>
                )}

                <Button disabled={isLoading} type="submit" variant="primary" text={isLoading ? tReset("savingBtn") : tReset("updateBtn")} className="mt-4 w-full" />
            </form>
        </div>
    )
}