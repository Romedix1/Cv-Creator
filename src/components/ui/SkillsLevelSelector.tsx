"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

type SkillLevelSelectorProps = {
    selectedLevel: number;
    onChange: (level: number) => void;
}

export default function SkillLevelSelector({ selectedLevel = 0, onChange }: SkillLevelSelectorProps) {
    const tInput = useTranslations("Inputs");
    const [hovered, setHovered] = useState<number | null>(null);

    const LEVEL_LABELS = [
        { value: 1, text: tInput("beginner") },
        { value: 2, text: tInput("elementary") },
        { value: 3, text: tInput("intermediate") },
        { value: 4, text: tInput("advanced") },
        { value: 5, text: tInput("proficient") },
    ];

    const currentText = hovered ? LEVEL_LABELS.find(level => level.value === hovered)?.text : LEVEL_LABELS.find(level => level.value === selectedLevel)?.text;

    return (
        <div className="flex flex-col gap-1 mt-4 items-center">
            <div className="flex gap-1 sm:gap-1.5 items-center" onMouseLeave={() => setHovered(null)}>
                {LEVEL_LABELS.map((item) => {
                    const isActive = item.value <= (hovered || selectedLevel);

                    return (
                        <button key={item.value} type="button" onClick={() => onChange(item.value)} onMouseEnter={() => setHovered(item.value)} className="group relative focus:outline-none transition-transform duration-200 p-1 cursor-pointer hover:scale-110" aria-label={item.text}>
                            <div className={`w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full border duration-200 ${isActive ? "bg-default border-default" : "bg-surface border-border group-hover:border-text-muted"}`}></div>
                        </button>
                    )
                })}
            </div>

            <div className="h-4 flex items-center justify-center">
                <span className={`text-[10px] font-medium text-text-muted duration-200 ${currentText ? "opacity-100" : "opacity-0"}`}>{currentText}</span>
            </div>
        </div>
    )
}