"use client"

import { useState } from "react"
import LimitReachedModal from "../../../../../components/LimitReachedModal"

export default function DashboardLimitAlert() {
    const [showLimitModal, setShowLimitModal] = useState(true)

    if (!showLimitModal) return null

    return (
        <LimitReachedModal onClose={() => setShowLimitModal(false)} />
    )
}