import { useTranslations } from "next-intl"
import Input from "@/components/ui/Input";
import OAuthContainer from "@/components/ui/OAuthContainer";
import Button from "@/components/ui/Button";
import Link from "next/link";

export default function Register() {
    const tRegister = useTranslations("Register");


    return (
        <div className="bg-surface border rounded-2xl px-4 py-5 w-full md:w-[440px]">
            <div className="flex flex-col items-center gap-2">
                <h1 className="text-[20px] font-semibold">{tRegister("header")}</h1>
                <p className="text-text-muted text-[14px] text-center">{tRegister("subtitle")}</p>
            </div>

            <OAuthContainer />

            <div className="flex flex-col gap-5">
                <Input label={tRegister("nameLabel")} type="text" placeholderValue={tRegister("namePlaceholder")}/>
                <Input label={tRegister("emailLabel")} type="email" placeholderValue={tRegister("emailPlaceholder")}/>
                <Input label={tRegister("passwordLabel")} type="password" placeholderValue={tRegister("passwordPlaceholder")} />
            </div>

            <Button variant="primary" text={tRegister("registerBtn")} className="mt-8 w-full"/>

            <p className="text-text-light text-[14px] text-center mt-6">{tRegister.rich("haveAccount", { login: (chunks) => (<Link className="text-default font-medium hover:text-default-hover duration-200" href={"/login"}>{chunks}</Link>)})}</p>
            <p className="text-text-light text-[14px] mt-8">{tRegister.rich("agreementText", { terms: (chunks) => (<Link className="text-default font-medium hover:text-default-hover duration-200 hover:underline" href={"/terms"}>{chunks}</Link>), privacy: (chunks) => (<Link className="text-default font-medium hover:text-default-hover duration-200 hover:underline" href={"/privacy-policy"}>{chunks}</Link>)})}</p>
        </div>
    )
}