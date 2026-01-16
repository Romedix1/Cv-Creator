"use client"

import { useTranslations } from "next-intl";
import { useState } from "react";
import SortableList from "@/components/ui/SortableList";
import ElementAddButton from "@/components/ui/ElementAddButton";
import ItemActions from "@/components/ui/ItemActions";
import SectionItemError from "@/components/ui/SectionItemError";
import SectionHeader from "@/components/cv-builder/SectionHeader";
import { Interests as InterestsProps } from "@/types/interests";
import InterestsItem from "./IntrestsItem";

type InterestsSectionProps = {
    interests: InterestsProps[];
    onCertificatesChange: (newExperience: InterestsProps[]) => void;
    setIsEditingMode: (isEditing: boolean) => void;
}

export default function InterestsSection({ interests, onCertificatesChange, setIsEditingMode }: InterestsSectionProps) {
    const tInput = useTranslations("Inputs")
    const tButton = useTranslations("Button")

    const [editing, setEditing] = useState<string | null>(null)

    const handleExitEdit = () => {
        setEditing(null)
        setIsEditingMode(false)
    }

    const handleAdd = () => {
        const newItem: InterestsProps = {
            id: crypto.randomUUID(),
            name: "",
            value: "",
        }

        onCertificatesChange([...interests, newItem])
        setIsEditingMode(true)
        setEditing(newItem.id)
    }

    const handleUpdate = (updatedItem: InterestsProps) => {
        const updatedList = interests.map(item => item.id === updatedItem.id ? updatedItem : item )
        onCertificatesChange(updatedList)
    }

    const handleRemove = (expId: string) => {
        onCertificatesChange(interests.filter(item => item.id !== expId))

        if (editing === expId) {
            handleExitEdit()
        }
    }

    if (editing !== null) {
        const activeItem = interests.find(item => item.id === editing)

        if (!activeItem) {
            return <SectionItemError />
        }

        return <InterestsItem item={activeItem} onUpdate={handleUpdate} onBack={handleExitEdit} onDelete={handleRemove} setIsEditingMode={setIsEditingMode} />
    }

    return (
        <section className="px-3 mt-6 flex flex-col gap-6 sm:px-12 w-full">
            <SectionHeader step="interests" />

            <SortableList items={interests} onReorder={onCertificatesChange} droppableId="certificates-list"
                renderItem={(item) => (
                    <div className="flex items-center gap-4">
                        <div className="flex flex-col flex-1 min-w-0 gap-1">
                            {item.name && (
                                <h2 className="font-semibold text-text-main text-base sm:text-lg leading-tight wrap-break-word">{item.name}</h2>
                            )}

                            <div className="flex flex-wrap items-center text-sm gap-x-2 gap-y-0.5">
                                {item.value && (
                                    <div className="flex items-center text-xs sm:text-sm text-text-muted min-w-0">
                                        <span className="wrap-break-word w-full">{item.value}</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        <ItemActions onEdit={() => { setEditing(item.id); setIsEditingMode(true) }} onDelete={() => handleRemove(item.id)} editLabel={tButton("edit")} deleteLabel={tButton("delete")} itemLabel={item.name || tInput("missingCertificate")} />
                    </div>
                )}
            />

            <ElementAddButton step={"Interests"} onAdd={() => { handleAdd(); setIsEditingMode(true) }} />
        </section>
    )
}