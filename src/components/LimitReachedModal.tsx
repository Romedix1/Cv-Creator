import { AlertTriangle } from "lucide-react";
import Button from "./ui/Button";
import Modal from "./ui/Modal";
import { useTranslations } from "next-intl";

type LimitReachedModalType = {
    onClose: () => void
}

export default function LimitReachedModal({ onClose }: LimitReachedModalType) {
    const tButton = useTranslations("Button")
    const tTemplate = useTranslations("Templates")

    return (
        <Modal onClose={onClose}
            footer={(close)=> (
                <div className="flex w-full mt-3 gap-6">
                    <Button variant="secondary" className="flex-1" text={tButton("understand")} onClick={close} />
                    <Button variant="primary" className="flex-1" text={tButton("manageResumes")} href="/dashboard" />
                </div>
            )}
        >

            <div className="w-full flex flex-col items-center">
                <div className="w-16 h-16 bg-error/20 rounded-full flex items-center justify-center mb-4">
                    <AlertTriangle className="text-error w-10 h-10" />
                </div>

                <h3 className="text-xl font-bold text-text-main">{tTemplate("limitHeader")}</h3>

                <p className="text-sm text-text-secondary mt-2 leading-relaxed">{tTemplate("limitText")}</p>
            </div>
        </Modal>
    )
}