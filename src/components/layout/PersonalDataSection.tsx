import { getTranslations } from "next-intl/server"
import Image from "next/image"
import Input from "../ui/Input"
import Button from "../ui/Button"

type PersonalDataProps = {
    firstName: string,
    lastName: string,
    avatarUrl: string,
    initials: string
}

export default async function PersonalDataSection({ firstName, lastName, avatarUrl, initials }: PersonalDataProps) {
    const tSettings = await getTranslations("Dashboard.Settings")

    return (
        <section className="flex flex-col gap-5">
            <h3 className="text-[20px] font-semibold">{tSettings("dataHeader")}</h3>
                <div className="flex items-center gap-6">
                    {avatarUrl ? (
                        <Image referrerPolicy="no-referrer" src={avatarUrl} width={60} height={60} className="rounded-full object-cover" alt={tSettings("userProfileAlt")}/>
                    ) : (
                        <div className="w-15 h-15 rounded-full bg-surface-hover flex justify-center items-center hover:border-border transition-colors">
                            <p className="text-text-main font-bold select-none hover:text-default-hover">{initials}</p>
                        </div>
                    )}
                    <p className="cursor-pointer hover:text-default-hover duration-200">{tSettings("changeAvatar")}</p>
                </div>

                <div className="flex flex-col gap-5 md:grid md:grid-cols-2">
                    <Input name="firstName" type="text" label={tSettings("firstNameLabel")} placeholderValue={firstName} />
                    <Input name="lastName" type="text" label={tSettings("lastNameLabel")} placeholderValue={lastName} />
                    <Input name="jobTitle" type="text" label={tSettings("jobTitleLabel")} placeholderValue={""} />
                    <Input name="email" type="email" label={tSettings("emailLabel")} placeholderValue={""} />
                    <Input name="phone" type="phone" label={tSettings("phoneLabel")} placeholderValue={""} className="md:col-span-2" />
                </div>

                <div className="flex w-full md:justify-end">
                    <Button variant="primary" text={tSettings("saveChangesBtn")} className="mt-6 w-full md:w-[300px]" />
                </div>
        </section>
    )
}