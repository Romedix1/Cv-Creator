"use client"

import Button from "@/components/ui/Button"
import { useTranslations } from "next-intl"

export default function SettingsError({ reset }: { reset: () => void }) {
  const tError = useTranslations("Errors")
  const tButton = useTranslations("Button")

  return (
    <div className="flex flex-col items-center justify-center text-center px-10 py-64 bg-error/8">
      <h2 className="text-xl sm:text-2xl font-bold text-error mb-4">{tError("profileLoadingHeader")}</h2>
      <p className="text-sm sm:text-base text-text-muted">{tError("profileLoadingText")}</p>

      <div className="flex flex-col flex-col-reverse sm:flex-row gap-4 mt-16">
        <Button variant="secondary" className="px-6" text={tButton("backToMainPage")} href="/" />
        <Button variant="primary" className="px-6" text={tButton("tryAgain")} onClick={() => reset()} />
      </div>
    </div>
  )
}