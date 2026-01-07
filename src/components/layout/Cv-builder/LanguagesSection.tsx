"use client"

import { useTranslations } from "next-intl"
import { LanguagesItem as LanguageProps } from "@/types/languages"
import SortableList from "@/components/ui/SortableList"
import { useState } from "react"
import LanguagesItem from "./LanguagesItem"
import ElementAddButton from "@/components/ui/ElementAddButton"
import ItemActions from "@/components/ui/ItemActions"
import SectionItemError from "@/components/ui/SectionItemError"
import SectionHeader from "@/components/ui/SectionHeader"

type LanguagesSectionProps = {
    languages: LanguageProps[];
    onLanguageChange: (newLanguage: LanguageProps[]) => void;
    setIsEditingMode: (isEditing: boolean) => void;
}

export default function LanguagesSection({ languages, onLanguageChange, setIsEditingMode }: LanguagesSectionProps) {
    const tInput = useTranslations("Inputs")
    const tButton = useTranslations("Button")

    const [editing, setEditing] = useState<string | null>(null)

    const handleExitEdit = () => {
        setEditing(null);
        setIsEditingMode(false);
    }

    const handleAdd = () => {
        const newItem: LanguageProps = {
            id: crypto.randomUUID(),
            value: "",
            level: ""
        }
        onLanguageChange([...languages, newItem])
        setEditing(newItem.id)
    }

    const handleRemove = (langId: string) => {
        onLanguageChange(languages.filter((item) => item.id !== langId))

        if (editing === langId) {
            handleExitEdit()
        }
    }

    const handleUpdate = (updatedItem: LanguageProps) => {
        const updatedList = languages.map(item => item.id === updatedItem.id ? updatedItem : item )
        onLanguageChange(updatedList)
    }

    if (editing !== null) {
        const activeItem = languages.find(item => item.id === editing)

        if (!activeItem) {
            return <SectionItemError />
        }

        return <LanguagesItem item={activeItem} onUpdate={handleUpdate} onBack={handleExitEdit} onDelete={handleRemove} setIsEditingMode={setIsEditingMode} />
    }

    return (
        <section className="px-3 mt-6 flex flex-col gap-6 sm:px-12 w-full">
            <div className="flex justify-between items-center mb-6">
                <SectionHeader step="languages" />
            </div>

            <div className="flex flex-col gap-6">
                <SortableList items={languages} onReorder={onLanguageChange} droppableId="language-list"
                    renderItem={(item) => (
                        <div className="flex items-center gap-4">
                            <div className="flex flex-col flex-1 min-w-0 gap-1">
                                {(item.value || item.level) && (
                                    <h2 className="font-semibold text-text-main text-base sm:text-lg leading-tight wrap-break-word">{item.value} {item.level && "-"} {item.level}</h2>
                                )}
                            </div>

                            <ItemActions onEdit={() => { setEditing(item.id); setIsEditingMode(true) }} onDelete={() => handleRemove(item.id)} editLabel={tButton("edit")} deleteLabel={tButton("delete")} itemLabel={item.value || tInput("missingLanguage")} />
                        </div>
                    )}
                />
            </div>

            <ElementAddButton step={"Language"} onAdd={() => { handleAdd(); setIsEditingMode(true) }} />
        </section>
    )
}