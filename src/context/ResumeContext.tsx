"use client"

import { createContext, ReactNode, useContext, useState } from "react";
import { useTranslations } from "use-intl";

type ResumeContextType = {
    isSaving: boolean;
    setIsSaving: (value: boolean) => void;
    title: string;
    setTitle: (value: string) => void;
}

const ResumeContext = createContext<ResumeContextType | undefined>(undefined)

export function ResumeProvider({ children }: { children: ReactNode }) {
    const tBuilderNav = useTranslations("BuilderNav")

    const [isSaving, setIsSaving] = useState(false)
    const [title, setTitle] = useState(tBuilderNav("documentName"))

    return (
        <ResumeContext.Provider value={{ isSaving, setIsSaving, title, setTitle }}>
            {children}
        </ResumeContext.Provider>
    )
}

export const useResume = () => {
    const context = useContext(ResumeContext)

    if (!context) throw new Error("useResume must be used within ResumeProvider")
    return context
}