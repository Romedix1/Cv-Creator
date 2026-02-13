"use client"

import { useTranslations } from "next-intl";
import { useState } from "react";
import SortableList from "@/app/[locale]/(cv-builder)/cv-builder/[resumeId]/_components/SortableList";
import ElementAddButton from "@/app/[locale]/(cv-builder)/cv-builder/[resumeId]/_components/ElementAddButton";
import ItemActions from "@/app/[locale]/(cv-builder)/cv-builder/[resumeId]/_components/ItemActions";
import SectionItemError from "@/app/[locale]/(cv-builder)/cv-builder/[resumeId]/_components/SectionItemError";
import SectionHeader from "@/app/[locale]/(cv-builder)/cv-builder/[resumeId]/_components/SectionHeader";
import { Certificates as CertificatesProps } from "@/types/certificates";
import CertificatesItem from "./CertificatesItem";

type CertificatesSectionProps = {
    certificates: CertificatesProps[];
    onCertificatesChange: (newExperience: CertificatesProps[]) => void;
    setIsEditingMode: (isEditing: boolean) => void;
}

export default function CertificatesSection({ certificates, onCertificatesChange, setIsEditingMode }: CertificatesSectionProps) {
    const tInput = useTranslations("Inputs")
    const tButton = useTranslations("Button")

    const [editing, setEditing] = useState<string | null>(null)

    const handleExitEdit = () => {
        setEditing(null)
        setIsEditingMode(false)
    }

    const handleAdd = () => {
        const newItem: CertificatesProps = {
            id: crypto.randomUUID(),
            name: "",
            organizer: "",
            date: "",
        }

        onCertificatesChange([...certificates, newItem])
        setIsEditingMode(true)
        setEditing(newItem.id)
    }

    const handleUpdate = (updatedItem: CertificatesProps) => {
        const updatedList = certificates.map(item => item.id === updatedItem.id ? updatedItem : item )
        onCertificatesChange(updatedList)
    }

    const handleRemove = (expId: string) => {
        onCertificatesChange(certificates.filter(item => item.id !== expId))

        if (editing === expId) {
            handleExitEdit()
        }
    }

    if (editing !== null) {
        const activeItem = certificates.find(item => item.id === editing)

        if (!activeItem) {
            return <SectionItemError />
        }

        return <CertificatesItem item={activeItem} onUpdate={handleUpdate} onBack={handleExitEdit} onDelete={handleRemove} setIsEditingMode={setIsEditingMode} />
    }

    return (
        <section className="px-3 mt-6 flex flex-col gap-6 sm:px-12 w-full">
            <SectionHeader step="certificates" />

            <SortableList items={certificates} onReorder={onCertificatesChange} droppableId="certificates-list"
                renderItem={(item) => (
                    <div className="flex items-center gap-4">
                        <div className="flex flex-col flex-1 min-w-0 gap-1">
                            {item.name && (
                                <h2 className="font-semibold text-text-main text-base sm:text-lg leading-tight wrap-break-word">{item.name}</h2>
                            )}

                            <div className="flex flex-wrap items-center text-sm gap-x-2 gap-y-0.5">
                                {item.date && (
                                    <div className="flex items-center text-xs sm:text-sm text-text-muted whitespace-nowrap">
                                        <span>{item.date}</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        <ItemActions onEdit={() => { setEditing(item.id); setIsEditingMode(true) }} onDelete={() => handleRemove(item.id)} editLabel={tButton("edit")} deleteLabel={tButton("delete")} itemLabel={item.name || tInput("missingCertificate")} />
                    </div>
                )}
            />

            <ElementAddButton step={"Certificates"} onAdd={() => { handleAdd(); setIsEditingMode(true) }} />
        </section>
    )
}