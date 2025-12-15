"use client"

import { useTranslations } from "next-intl"
import Input from "@/components/ui/Input";
import OAuthContainer from "@/components/ui/OAuthContainer";
import Button from "@/components/ui/Button";
import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import { signIn } from "@/actions/auth";
import { useRouter } from "next/navigation";

type ValidationErrors = {
    email?: string[];
    password?: string[];
};

export default function LoginPage() {
    const tLogin = useTranslations("Login");
    const router = useRouter()

    const [error, setError] = useState<ValidationErrors>({});
    const [apiError, setApiError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setIsLoading(true)
        setError({})
        setApiError(null)

        const formData = new FormData(event.currentTarget)
        const res = await signIn(formData)

        if(!res?.success) {
            if(res?.errors) {
                setError(res.errors);
            }

            if(res?.apiError) {
                setApiError(res.apiError);
            }
        } else {
            setSuccess(true);
        }

        setIsLoading(false);
    }

    useEffect(() => {
        if (success) {
            router.push('/');
            router.refresh();
        }
    }, [success, router]);

    return (
        <form onSubmit={handleSubmit} className="bg-surface border rounded-2xl px-4 py-5 w-full md:w-[440px]">
            <div className="flex flex-col items-center gap-2">
                <h1 className="text-[20px] font-semibold">{tLogin("header")}</h1>
                <p className="text-text-muted text-[14px] text-center">{tLogin("subtitle")}</p>
            </div>

            <OAuthContainer />

            {apiError && (
                <div className="bg-red-50 border text-red-600 px-4 py-3 rounded-lg text-sm my-4 text-center">
                    {apiError}
                </div>
            )}

            <div className="flex flex-col gap-5">
                <Input name="email" label={tLogin("emailLabel")} type="email" placeholderValue={tLogin("emailPlaceholder")} error={error.email?.[0]} />
                <Input name="password" label={tLogin("passwordLabel")} type="password" placeholderValue={"***********"} error={error.password?.[0]} />
            </div>

            <Button variant="primary" text={tLogin("loginBtn")} className="mt-8 w-full"/>

            <p className="text-text-light text-[14px] text-center mt-6">{tLogin.rich("dontHaveAccount", { login: (chunks) => (<Link className="text-default font-medium hover:text-default-hover duration-200" href={"/register"}>{chunks}</Link>)})}</p>
            <p className="text-text-light text-[14px] mt-8">{tLogin.rich("agreementText", { terms: (chunks) => (<Link className="text-default font-medium hover:text-default-hover duration-200 hover:underline" href={"/terms"}>{chunks}</Link>), privacy: (chunks) => (<Link className="text-default font-medium hover:text-default-hover duration-200 hover:underline" href={"/privacy-policy"}>{chunks}</Link>)})}</p>
        </form>
    )
}