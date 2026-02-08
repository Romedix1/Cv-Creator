"use client"

import { useTranslations } from "next-intl"
import OAuthCard from "../ui/OAuthCard"
import { Separator } from "../ui/separator"
import { createClient } from "@/lib/supabase/client"
import { Provider } from "@supabase/supabase-js"
import { BsGoogle } from "react-icons/bs"
import { FaFacebook, FaGithub } from "react-icons/fa6"

export default function OAuthContainer() {


    const tOAuth = useTranslations("OAuth")

    const signInWithOAuth = async (provider: Provider) => {
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
        icon: <BsGoogle key="i1" className="w-5.5 h-5.5" />,
    },
    {
        platform : "facebook",
        icon: <FaFacebook key="i2" className="w-5.5 h-5.5" />,
    },
    {
        platform : "github",
        icon: <FaGithub key="i3" className="w-5.5 h-5.5" />,
    }]

    return (
        <>
            <div className="flex gap-4 mb-6 mt-9">
                {OAUTH_CARD_DATA.map((item, index) => {
                    return (
                        <OAuthCard key={index} icon={item.icon} onClick={() => signInWithOAuth(item.platform as Provider)}/>
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