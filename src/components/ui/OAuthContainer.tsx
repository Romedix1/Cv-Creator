import { useTranslations } from "next-intl"
import FacebookIcon from "../icons/FacebookIcon"
import GithubIcon from "../icons/GithubIcon"
import GoogleIcon from "../icons/GoogleIcon"
import OAuthCard from "./OAuthCard"
import { Separator } from "./separator"

export default function OAuthContainer() {
    const tOAuth = useTranslations("OAuth")

    const OAUTH_CARD_DATA = [<GoogleIcon key="i1" className="w-5.5 h-5.5" />, <FacebookIcon key="i2" className="w-5.5 h-5.5" />, <GithubIcon key="i3" className="w-5.5 h-5.5" />]

    return (
        <>
            <div className="flex gap-4 mb-6 mt-9">
                {OAUTH_CARD_DATA.map((icon, index) => {
                    return (
                        <OAuthCard key={index} icon={icon} />
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