import { useRouter } from "next/navigation";
import { useState } from "react";

export default function useCreateResume(canCreate: boolean, templateId: string, isAuthenticated: boolean) {
    const [showLimitModal, setShowLimitModal] = useState(false);
    const router = useRouter();

    const handleCreate = () => {
        if (canCreate) {
            let targetId

            if (isAuthenticated) {
                targetId = crypto.randomUUID()
            } else {
                const lastId = localStorage.getItem("last_guest_resume_id")

                if (lastId) {
                    targetId = lastId
                } else {
                    targetId = crypto.randomUUID()
                    localStorage.setItem("last_guest_resume_id", targetId)
                }
            }

            router.push(`/cv-builder/${targetId}?template=${templateId}`)
        } else {
            setShowLimitModal(true)
            return
        }
    }

    return { handleCreate, showLimitModal, setShowLimitModal }
}