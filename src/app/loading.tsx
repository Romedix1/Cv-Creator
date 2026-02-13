import { useTranslations } from "next-intl"

export default function Loading() {
    const tLoading = useTranslations("Loading")

    return (
        <div className="fixed inset-0 top-0 z-9999 bg-black flex flex-col gap-4 items-center justify-center">
            <div className="w-36 h-36 border-4 border-transparent border-t-default rounded-full animate-spin"></div>

            <div className="relative flex items-center justify-center" />

            <span className="text-default-hover text-base font-medium tracking-widest uppercase animate-pulse">{tLoading("loadingText")}</span>
        </div>
    )
}