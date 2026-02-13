"use client"

import LimitReachedModal from "@/components/LimitReachedModal"
import { useState } from "react"

export default function DashboardLimitAlert() {
    const [showLimitModal, setShowLimitModal] = useState(true)

    if (!showLimitModal) return null

    return (
        <LimitReachedModal onClose={() => setShowLimitModal(false)} />
    )
}