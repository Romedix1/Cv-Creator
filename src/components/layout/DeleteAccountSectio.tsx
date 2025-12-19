import { getTranslations } from "next-intl/server"
import Button from "../ui/Button"

export default async function DeleteAccountSection() {
    const tSettings = await getTranslations("Dashboard.Settings")

    return (
        <section className="flex flex-col gap-5">
            <h3 className="text-[20px] font-semibold text-error">{tSettings("deleteHeader")}</h3>
            <p className="w-full text-[14px] lg:text-[16px] text-text-muted">{tSettings("warningText")}</p>

            <div className="flex w-full md:justify-end">
                <Button variant="primary" text={tSettings("deleteAccountBtn")} className="mt-6 bg-error w-full md:w-[300px] hover:bg-error/50" />
            </div>
        </section>
    )
}