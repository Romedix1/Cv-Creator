"use client"

import Input from "../ui/Input"
import Button from "../ui/Button"
import { FormEvent, useState } from "react"
import { useTranslations } from "next-intl"
import { createClient } from "@/lib/supabase/client"

type PasswordSectionProps = {
    email: string
}

export default function PasswordSection({ email }: PasswordSectionProps) {
    const tSettings = useTranslations("Dashboard.Settings")
    const tValidation = useTranslations("Validation")

    const [isLoading, setIsLoading] = useState(false)
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsLoading(true)
        setMessage(null)

        const form = e.currentTarget
        const formdata = new FormData(form)
        const currentPassword = formdata.get("currentPassword") as string
        const newPassword = formdata.get("newPassword") as string

        if(newPassword.length < 6) {
            setMessage({ type: 'error', text: tValidation("passwordMin")})
            setIsLoading(false)
            return
        }

        const supabase = createClient()

        try {
            const { error: signInError } = await supabase.auth.signInWithPassword({
                email: email,
                password: currentPassword
            })

            if (signInError) {
                setMessage({ type: 'error', text: tValidation("oldPasswordIncorrect")})
                setIsLoading(false)
                return
            }

            const { error: updateError } = await supabase.auth.updateUser({
                password: newPassword
            })

            if (updateError) throw updateError

            setMessage({ type: 'success', text: tSettings("passwordUpdated")})
            form.reset()
        } catch (error) {
            setMessage({ type: 'error', text: tValidation("genericPasswordUpdateError")})
        } finally {
            setIsLoading(false)
        }

    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <h3 className="text-[20px] font-semibold">{tSettings("passwordHeader")}</h3>

            <Input name="currentPassword" label={tSettings("currentPassword")} type="password" placeholderValue="**********" />
            <Input name="newPassword" label={tSettings("newPassword")} type="password" placeholderValue="**********" />

            {message && <p className={`font-semibold ${message.type === "success" ? "text-success" : "text-error"}`}>{message.text}</p>}

            <div className="flex w-full md:justify-end">
                <Button variant="primary" text={tSettings("saveChangesBtn")} className="mt-6 w-full md:w-[300px]" />
            </div>
        </form>
    )
}