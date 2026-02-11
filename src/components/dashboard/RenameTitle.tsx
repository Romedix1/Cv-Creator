"use client"

import { useTranslations } from "next-intl";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { Dispatch, SetStateAction, useState, useTransition } from "react";
import { changeResumeTitle } from "@/actions/resume";
import { toast } from "react-toastify";
import Modal from "../ui/Modal";
import { cn } from "@/lib/utils";

type RenameTitleType = {
    resumeId: string;
    setIsRenaming: Dispatch<SetStateAction<boolean>>;
}

export default function RenameTitle({ resumeId, setIsRenaming }: RenameTitleType) {
    const tInput = useTranslations("Inputs")
    const tButton = useTranslations("Button")
    const tDocuments = useTranslations("Dashboard.MyCVs")

    const [isPending, startTransition] = useTransition()
    const [newTitle, setNewTitle] = useState("")

    const handleSave = async (closeModal: () => void) => {
        startTransition(async () => {
            const result = await changeResumeTitle(resumeId, newTitle)

            if (result.success) {
                toast.success(tDocuments("changeTitleSuccess"))
                closeModal()
            } else {
                toast.error(result.error)
            }
        })
    }

    return (
        <Modal onClose={() => setIsRenaming(false)}
            footer={(close) => (
                <div className="flex w-full mt-3 gap-6">
                    <Button variant="secondary" className="flex-1" text={tButton("cancel")} onClick={close} />
                    <Button disabled={isPending} variant="primary" type="submit" form="modal-form" className={cn("flex-1", isPending && "cursor-not-allowed" )} text={isPending ? `${tButton("saving")}...` : tButton("save")} />
                </div>
            )}
        >
            {(close) => (
                <form id="modal-form" className="w-full" onSubmit={(e) => { e.preventDefault(); handleSave(close) }}>
                    <Input name="changeTitle" value={newTitle} onChange={(e) => {setNewTitle(e.target.value); }} label={tInput("changeTitle")} type="text" autoFocus={true} />
                </form>
            )}
        </Modal>
    )
}