"use client"

import { useTranslations } from "next-intl";
import { AlertTriangle } from "lucide-react";
import Button from "../../../../../components/ui/Button";
import { Dispatch, SetStateAction, useTransition } from "react";
import { deleteResume } from "@/actions/resume";
import { toast } from "react-toastify";
import Modal from "../../../../../components/ui/Modal";
import { cn } from "@/lib/utils";

type ConfirmDeleteType = {
    resumeId: string;
    setIsDeleting: Dispatch<SetStateAction<boolean>>;
}

export default function ConfirmDelete({ resumeId, setIsDeleting }: ConfirmDeleteType) {
    const tButton = useTranslations("Button")
    const tDocuments = useTranslations("Dashboard.MyCVs")

    const [isPending, startTransition] = useTransition()

    const handleDelete = async (closeModal: () => void) => {
        startTransition(async () => {
            const result = await deleteResume(resumeId)

            if (result.success) {
                toast.success(tDocuments("deleteSuccess"))
                closeModal()
            } else {
                toast.error(result.error)
            }
        })
    }

    return (
        <Modal onClose={() => setIsDeleting(false)}
            footer={(close)=> (
                <div className="flex w-full mt-3 gap-6">
                    <Button variant="secondary" className="flex-1" text={tButton("cancel")} onClick={close} />
                    <Button disabled={isPending} variant="primary" type="submit" form="modal-form" className={cn("flex-1 bg-error hover:bg-red-700 border-none", isPending && "cursor-not-allowed")} text={isPending ? `${tButton("deleting")}...` : tButton("delete")} />
                </div>
            )}
        >
            {(close) => (
                <form id="modal-form" onSubmit={(e) => { e.preventDefault(); handleDelete(close) }} className="w-full flex flex-col items-center">
                    <div className="w-16 h-16 bg-error/20 rounded-full flex items-center justify-center mb-4">
                        <AlertTriangle className="text-error w-10 h-10" />
                    </div>

                    <h3 className="text-xl font-bold text-text-main">{tDocuments("deleteHeader")}</h3>

                    <p className="text-sm text-text-secondary mt-2 leading-relaxed">{tDocuments("deleteText")}</p>
                </form>
            )}
        </Modal>
    )
}