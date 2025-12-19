"use client"

import { useTranslations } from "next-intl"
import FacebookIcon from "../icons/FacebookIcon"
import GithubIcon from "../icons/GithubIcon"
import GoogleIcon from "../icons/GoogleIcon"
import OAuthCard from "../ui/OAuthCard"
import { Separator } from "../ui/separator"
import { createClient } from "@/lib/supabase/client"
import { Provider } from "@supabase/supabase-js"

export default function OAuthContainer() {


    const tOAuth = useTranslations("OAuth")

    const signInWithGithub = async (provider: Provider) => {
        const supabase = await createClient()
        const origin = window.location.origin;

        await supabase.auth.signInWithOAuth({
            provider,
            options: {
                redirectTo: `${origin}/auth/callback`,
            },
        })
    }

    const OAUTH_CARD_DATA = [
    {
        platform : "google",
        icon: <GoogleIcon key="i1" className="w-5.5 h-5.5" />,
    },
    {
        platform : "facebook",
        icon: <FacebookIcon key="i2" className="w-5.5 h-5.5" />,
    },
    {
        platform : "github",
        icon: <GithubIcon key="i3" className="w-5.5 h-5.5" />,
    }]

    return (
        <>
            <div className="flex gap-4 mb-6 mt-9">
                {OAUTH_CARD_DATA.map((item, index) => {
                    return (
                        <OAuthCard key={index} icon={item.icon} onClick={() => signInWithGithub(item.platform as Provider)}/>
                    )
                })}
            </div>

            <div className="flex flex-col items-center gap-2.5 mb-8">
                <Separator/>
                <p className="text-text-muted">{tOAuth("or")}</p>
                <Separator />
            </div>
        </>
    )
}