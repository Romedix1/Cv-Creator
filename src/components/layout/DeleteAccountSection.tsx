"use client"

import Button from "../ui/Button"
import { useTranslations } from "next-intl"
import { useState } from "react"
import ConfirmDelete from "../ui/ConfirmDelete"

type DeleteAccountSectionProps = {
    email: string;
    hasPassword: boolean;
}

export default function DeleteAccountSection({ email, hasPassword }: DeleteAccountSectionProps) {
    const tSettings = useTranslations("Dashboard.Settings")

    const [confirmDelete, setConfirmDelete] = useState(false)

    return (
        <>
            {confirmDelete && <ConfirmDelete email={email} hasPassword={hasPassword} setConfirmDelete={setConfirmDelete}/>}
            <section className="flex flex-col gap-5">
                <h3 className="text-[20px] font-semibold text-error">{tSettings("deleteHeader")}</h3>
                <p className="w-full text-[14px] lg:text-[16px] text-text-muted">{tSettings("warningText")}</p>

                <div className="flex w-full md:justify-end">
                    <Button onClick={() => setConfirmDelete(true)} variant="primary" text={tSettings("deleteAccountBtn")} className="mt-6 bg-error w-full md:w-[300px] hover:bg-error/50" />
                </div>
            </section>
        </>
    )
}