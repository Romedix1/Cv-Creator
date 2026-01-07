"use client"

import { EducationItem as EducationProps } from "@/types/education";
import { Dot } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import EducationItem from "./EducationItem";
import SortableList from "@/components/ui/SortableList";
import ItemActions from "@/components/ui/ItemActions";
import ElementAddButton from "@/components/ui/ElementAddButton";
import SectionHeader from "@/components/ui/SectionHeader";

type EducationSectionProps = {
    education: EducationProps[];
    onEducationChange: (newExperience: EducationProps[]) => void;
    setIsEditingMode: (isEditing: boolean) => void;
}

export default function EducationSection({ education, onEducationChange, setIsEditingMode }: EducationSectionProps) {
    const tButton = useTranslations("Button")
    const tBuilder = useTranslations("Builder")
    const tInput = useTranslations("Inputs")

    const [editing, setEditing] = useState<string | null>(null)

    const handleAdd = () => {
        const newItem: EducationProps = {
            id: crypto.randomUUID(),
            institution: "",
            major: "",
            degree: "",
            startDate: "",
            endDate: ""
        }

        onEducationChange([...education, newItem])
        setEditing(newItem.id)
    }

    const handleChange = (updatedItem: EducationProps) => {
        onEducationChange(education.map(item => item.id === updatedItem.id ? updatedItem : item))
    }

    const handleRemove = (eduId: string) => {
        onEducationChange(education.filter(item => item.id !== eduId))

        if (editing === eduId) {
            handleExitEdit()
        }
    }

    const handleExitEdit = () => {
        setEditing(null)
        setIsEditingMode(false)
    }

    if (editing !== null) {
        const activeItem = education.find(item => item.id === editing)

        if (!activeItem) {
            return <p>{tBuilder("experienceLoadingError")}</p>
        }

        return <EducationItem item={activeItem} onUpdate={handleChange} onBack={handleExitEdit} onDelete={handleRemove} setIsEditingMode={setIsEditingMode} />
    }


    return (
        <section className="px-3 mt-6 flex flex-col gap-6 sm:px-12 w-full">
            <SectionHeader step="education" />

            <SortableList items={education} onReorder={onEducationChange} droppableId="education-list"
                renderItem={(item) => (
                    <div className="flex items-center gap-4">
                        <div className="flex flex-col flex-1 min-w-0 gap-1">
                            {item.institution && (
                                <h2 className="font-semibold text-text-main text-base sm:text-lg leading-tight wrap-break-word">{item.institution}</h2>
                            )}
                            <div className="flex flex-wrap items-center text-sm gap-y-0.5">
                                <span>{item.degree}</span>
                                {item.degree && item.major && (<span className="text-text-muted"><Dot aria-hidden="true" /></span>)}
                                <span>{item.major}</span>
                            </div>
                            {(item.startDate || item.endDate) && (
                                <div className="text-text-muted mt-0.5">
                                    {item.startDate} {(item.startDate && item.endDate) && "-"} {item.endDate}
                                </div>
                            )}
                        </div>
                        <ItemActions onEdit={() => { setEditing(item.id); setIsEditingMode(true) }} onDelete={() => handleRemove(item.id)} editLabel={tButton("edit")} deleteLabel={tButton("delete")} itemLabel={item.institution || tInput("institutionLabel")} />
                    </div>
                )}
            />

            <ElementAddButton step={"Education"} onAdd={() => { handleAdd(); setIsEditingMode(true) }} />
        </section>
    )
}