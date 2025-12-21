"use client"

import { useTranslations } from "next-intl"
import Button from "../ui/Button"
import Input from "../ui/Input"
import { AlertTriangle } from "lucide-react"
import { FormEvent, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { deleteAccountAction } from "@/actions/auth"

type ConfirmDeleteProps = {
    email: string;
    hasPassword: boolean;
    setConfirmDelete: (state: boolean) => void;
}

export default function ConfirmDelete({ email, hasPassword, setConfirmDelete }: ConfirmDeleteProps) {
    const tSettings = useTranslations("Dashboard.Settings.ConfirmDelete")
    const tValidation = useTranslations("Validation")

    const [error, setError] = useState<string | null>(null)
    const [isDeleting, setIsDeleting] = useState(false)

    const CONFIRMATION_WORD = tSettings("confirmationWord") || "DELETE"

    const handleDelete = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setError(null)
        setIsDeleting(true)

        const supabase = createClient()
        const form = new FormData(e.currentTarget)
        const inputValue = form.get("deleteAccount")?.toString().trim()

        if(!inputValue) {
            setError(tValidation("incorrectPassword"))
            setIsDeleting(false)
            return
        }

        try {
            if(hasPassword) {
                const { error: signInError } = await supabase.auth.signInWithPassword({
                    email: email,
                    password: inputValue
                })

                if (signInError) {
                    setError(tValidation("incorrectPassword"))
                    setIsDeleting(false)
                    return
                }
            } else {
                if(inputValue !== CONFIRMATION_WORD) {
                    setError(tValidation("incorrectPassword"))
                    setIsDeleting(false)
                    return
                }
            }

            await deleteAccountAction()
        } catch (err) {
            setError(tValidation("deleteAccount"))
            setIsDeleting(false)
        }
    }

    return (
        <div className="fixed inset-0 w-screen z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
            <div className="relative w-10/12 sm:w-[480px] rounded-xl bg-bg-main border border-border shadow-2xl p-6 md:p-8 animate-in fade-in zoom-in-85 duration-300">
                <div className="flex flex-col items-center text-center mb-6">
                    <div className="w-16 h-16 bg-error/20 rounded-full flex items-center justify-center mb-4">
                        <AlertTriangle className="text-error w-10 h-10" />
                    </div>

                    <h3 className="text-xl font-bold text-text-main">{tSettings("header")}</h3>

                    <p className="text-sm text-text-secondary mt-2 leading-relaxed">{tSettings("text")}</p>
                </div>

                <form onSubmit={handleDelete}>
                    <div>
                        <Input label={hasPassword ? tSettings("labelPassword") : `${tSettings("labelOAuth")} "${CONFIRMATION_WORD}"`} name="deleteAccount" type={hasPassword ? "password" : "text"} placeholderValue={hasPassword ? "************" : CONFIRMATION_WORD} />
                        {error && <p className="text-error text-sm mt-2">{error}</p>}
                    </div>

                    <div className="grid grid-cols-2 gap-3 mt-8">
                        <Button onClick={() => setConfirmDelete(false)} variant="secondary" text={tSettings("cancelBtn")}/>
                        <Button disabled={isDeleting} variant="primary" className="bg-error hover:bg-red-700 border-none" text={tSettings("deleteBtn")} />
                    </div>
                </form>
            </div>
        </div>
    )
}