"use client"

import { ExperienceItem as ExperienceProps } from "@/types/experience";
import { Dot } from "lucide-react";
import { useTranslations } from "next-intl";
import ExperienceItem from "./ExperienceItem";
import { useState } from "react";
import SortableList from "@/app/[locale]/(cv-builder)/cv-builder/[resumeId]/_components/SortableList";
import ElementAddButton from "@/app/[locale]/(cv-builder)/cv-builder/[resumeId]/_components/ElementAddButton";
import ItemActions from "@/app/[locale]/(cv-builder)/cv-builder/[resumeId]/_components/ItemActions";
import SectionItemError from "@/app/[locale]/(cv-builder)/cv-builder/[resumeId]/_components/SectionItemError";
import SectionHeader from "@/app/[locale]/(cv-builder)/cv-builder/[resumeId]/_components/SectionHeader";
import { DescriptionItem } from "@/types/descriptionItem";

type ExperienceSectionProps = {
    experience: ExperienceProps[];
    onExperienceChange: (newExperience: ExperienceProps[]) => void;
    setIsEditingMode: (isEditing: boolean) => void;
}

export default function ExperienceSection({ experience, onExperienceChange, setIsEditingMode }: ExperienceSectionProps) {
    const tInput = useTranslations("Inputs")
    const tButton = useTranslations("Button")

    const [editing, setEditing] = useState<string | null>(null)

    const handleExitEdit = () => {
        setEditing(null)
        setIsEditingMode(false)
    }

    const handleAdd = () => {
        const newItem: ExperienceProps = {
            id: crypto.randomUUID(),
            position: "",
            company: "",
            startDate: "",
            endDate: "",
            description: [] as DescriptionItem[]
        }

        onExperienceChange([...experience, newItem])
        setIsEditingMode(true)
        setEditing(newItem.id)
    }

    const handleUpdate = (updatedItem: ExperienceProps) => {
        const updatedList = experience.map(item => item.id === updatedItem.id ? updatedItem : item )
        onExperienceChange(updatedList)
    }

    const handleRemove = (expId: string) => {
        onExperienceChange(experience.filter(item => item.id !== expId))

        if (editing === expId) {
            handleExitEdit()
        }
    }

    if (editing !== null) {
        const activeItem = experience.find(item => item.id === editing)

        if (!activeItem) {
            return <SectionItemError />
        }

        return <ExperienceItem item={activeItem} onUpdate={handleUpdate} onBack={handleExitEdit} onDelete={handleRemove} setIsEditingMode={setIsEditingMode} />
    }

    return (
        <section className="px-3 mt-6 flex flex-col gap-6 sm:px-12 w-full">
            <SectionHeader step="experience" />

            <SortableList items={experience} onReorder={onExperienceChange} droppableId="experience-list"
                renderItem={(item) => (
                    <div className="flex items-center gap-4 w-full">
                        <div className="flex flex-col flex-1 min-w-0 gap-1">
                            {item.position && (
                                <h2 className="font-semibold text-text-main text-base sm:text-lg leading-tight wrap-break-word">{item.position}</h2>
                            )}

                            <div className="flex flex-wrap items-center text-sm gap-x-2 gap-y-0.5">
                                <span className="font-medium text-text-muted flex-1 min-w-0 wrap-break-word">{item.company}</span>
                                {(item.startDate || item.endDate) && (
                                    <div className="flex items-center text-xs sm:text-sm text-text-muted whitespace-nowrap">
                                        {item.company && (
                                            <Dot aria-hidden="true" className="w-4 h-4 mx-1 hidden sm:block" />
                                        )}

                                        <span className="shrink-0 wrap-break-word min-w-0">{item.startDate} {(item.startDate && item.endDate) && "-"} {item.endDate}</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        <ItemActions onEdit={() => { setEditing(item.id); setIsEditingMode(true) }} onDelete={() => handleRemove(item.id)} editLabel={tButton("edit")} deleteLabel={tButton("delete")} itemLabel={item.company || tInput("missingCompany")} />
                    </div>
                )}
            />

            <ElementAddButton step={"Experience"} onAdd={() => { handleAdd(); setIsEditingMode(true) }} />
        </section>
    )
}