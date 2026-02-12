import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

export default function useCreateResume(canCreate: boolean, templateId: string) {
    const [showLimitModal, setShowLimitModal] = useState(false);
    const router = useRouter();

    const newResumeId = useMemo(() => {
        return crypto.randomUUID();
    }, [])

    const handleCreate = () => {
        if (canCreate) {
            router.push(`/cv-builder/${newResumeId}?template=${templateId}`)
        } else {
            setShowLimitModal(true)
        }
    }

    return { handleCreate, showLimitModal, setShowLimitModal }
}