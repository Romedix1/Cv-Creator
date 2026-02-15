"use client"

import { useTranslations } from "next-intl"
import Input from "@/components/ui/Input";
import OAuthContainer from "@/app/[locale]/(auth)/_components/OAuthContainer";
import Button from "@/components/ui/Button";
import Link from "next/link";
import { useState } from "react";
import { signUp } from "@/actions/auth"
import RegistrationSuccess from "./_components/RegistrationSuccess";

type ValidationErrors = {
    name?: string[];
    email?: string[];
    password?: string[];
};

export default function RegisterPage() {
    const tRegister = useTranslations("Register");
    const tInput = useTranslations("Inputs");
    const tError = useTranslations("Errors");

    const [error, setError] = useState<ValidationErrors>({})
    const [apiError, setApiError] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [registeredEmail, setRegisteredEmail] = useState("")

    const handleSubmit = async (formData: FormData) => {
        setIsLoading(true)
        setError({})
        setApiError(null)

        const res = await signUp(formData)

        if(!res?.success) {
            if(res?.errors) {
                setError(res.errors)
            }

            if (res?.apiError) {
                if (res.apiError.toLowerCase().includes("rate limit")) {
                    setApiError(tError("emailRateLimit"))
                } else {
                    setApiError(res.apiError)
                }
            }
        } else {
            setRegisteredEmail(formData.get("email") as string)

            setSuccess(true)
        }

        setIsLoading(false)
    }

    if (true) {
        return <RegistrationSuccess email={registeredEmail} />
    }

    return (
        <form action={handleSubmit} className="bg-surface border rounded-2xl px-4 py-5 w-full md:w-[440px]">
            <div className="flex flex-col items-center gap-2">
                <h1 className="text-[20px] font-semibold">{tRegister("header")}</h1>
                <p className="text-text-muted text-[14px] text-center">{tRegister("subtitle")}</p>
            </div>

            <OAuthContainer />

            {apiError && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm my-4 text-center">
                    {apiError}
                </div>
            )}

            <div className="flex flex-col gap-5">
                <Input name="name" label={tInput("nameLabel")} type="text" placeholderValue={tInput("namePlaceholder")} error={error.name?.[0]} />
                <Input name="email" label={tInput("emailLabel")} type="email" placeholderValue={tInput("emailPlaceholder")} error={error.email?.[0]}/>
                <Input name="password" label={tInput("passwordLabel")} type="password" placeholderValue={"***********"} error={error.password?.[0]}/>
            </div>

            <Button type="submit" variant="primary" text={tRegister("registerBtn")} className="mt-8 w-full" disabled={isLoading}/>

            <p className="text-text-light text-[14px] text-center mt-6">{tRegister.rich("haveAccount", { login: (chunks) => (<Link className="text-default font-medium hover:text-default-hover duration-200" href={"/login"}>{chunks}</Link>)})}</p>
            <p className="text-text-light text-[14px] mt-8">{tRegister.rich("agreementText", { terms: (chunks) => (<Link className="text-default font-medium hover:text-default-hover duration-200 hover:underline" href={"/terms"}>{chunks}</Link>), privacy: (chunks) => (<Link className="text-default font-medium hover:text-default-hover duration-200 hover:underline" href={"/privacy"}>{chunks}</Link>)})}</p>
        </form>
    )
}