import { getTranslations } from "next-intl/server"
import Input from "../ui/Input"
import Button from "../ui/Button"

export default async function PasswordSection() {
    const tSettings = await getTranslations("Dashboard.Settings")

    return (
        <section className="flex flex-col gap-5">
            <h3 className="text-[20px] font-semibold">{tSettings("passwordHeader")}</h3>

            <Input name="currentPassword" label={tSettings("currentPassword")} type="password" placeholderValue="**********" />
            <Input name="newPassword" label={tSettings("newPassword")} type="password" placeholderValue="**********" />

            <div className="flex w-full md:justify-end">
                <Button variant="primary" text={tSettings("saveChangesBtn")} className="mt-6 w-full md:w-[300px]" />
            </div>
        </section>
    )
}