import { Dispatch, SetStateAction } from "react"
import { toast } from "react-toastify"

export async function handleDownload(resumeId: string, title: string, isDownloading: boolean, setIsDownloading: Dispatch<SetStateAction<boolean>>, tDocuments: (key: string) => string,locale: string) {
    if (isDownloading) return

    setIsDownloading(true)
    const toastId = toast.info(`${tDocuments("generating")}...`, { autoClose: false })

    const localData = localStorage.getItem(`guest_resume_${resumeId}`)
    const resumeData = localData ? JSON.parse(localData) : null

    const templateToUse = resumeData?.settings?.template || "modern-blue"

    try {
        const response = await fetch(`/api/download/${resumeId}?title=${encodeURIComponent(title)}&locale=${locale}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                resumeData: resumeData,
                resumeTitle: title,
                template: templateToUse
            })
        })

        if (!response.ok) {
            throw new Error("Internal server error")
        }

        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url

        const fileName = title ? title.replace(/\s+/g, '_') : `cv-${resumeId}`
        a.download = `${fileName}.pdf`

        document.body.appendChild(a)
        a.click()

        window.URL.revokeObjectURL(url)
        document.body.removeChild(a)

        toast.dismiss(toastId)
        toast.success(tDocuments("downloadSuccess"))
    } catch (error) {
        console.error("Download error:", error)
        toast.dismiss(toastId)
        toast.error(tDocuments("downloadFailed"))
    } finally {
        setIsDownloading(false)
    }
}