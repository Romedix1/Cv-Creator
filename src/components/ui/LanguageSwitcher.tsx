'use client'

import { useState } from "react"

export default function LanguageSwitcher() {
    const [language, setLanguage] = useState("EN");

    const toggleLanguage = () => {
        const newLanguage = language === "EN" ? "PL" : "EN";
        setLanguage(newLanguage);
    }

    return (
        <button onClick={toggleLanguage} className="text-text-muted font-semibold w-full text-right md:w-6">
            {language}
        </button>
    )
}