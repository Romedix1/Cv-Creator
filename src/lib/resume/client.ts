import { Dispatch, SetStateAction } from "react"
import { toast } from "react-toastify"

export async function handleDownload(resumeId: string, title: string, isDownloading: boolean, setIsDownloading: Dispatch<SetStateAction<boolean>>, tDocuments: (key: string) => string) {
    if (isDownloading) return

    setIsDownloading(true)
    const toastId = toast.info(`${tDocuments("generating")}...`, { autoClose: false })

    try {
        const response = await fetch(`/api/download/${resumeId}?title=${encodeURIComponent(title)}`)

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
    } catch  {
        toast.dismiss(toastId)
        toast.error(tDocuments("downloadFailed"))
    } finally {
        setIsDownloading(false)
    }
}