import SortableList from "@/components/ui/SortableList";
import { CustomSection as CustomSectionType } from "@/types/customSection";
import { useTranslations } from "next-intl";
import { useState } from "react";
import CustomItem from "./CustomItem";
import SectionItemError from "@/components/ui/SectionItemError";
import ElementAddButton from "@/components/ui/ElementAddButton";
import ItemActions from "@/components/ui/ItemActions";
import SectionHeader from "@/components/ui/SectionHeader";

type CustomSectionProps = {
    sections: CustomSectionType[];
    onSectionChange: (newSection: CustomSectionType[]) => void;
    setIsEditingMode: (isEditing: boolean) => void;
}

export default function CustomSection({ sections, onSectionChange, setIsEditingMode }: CustomSectionProps) {
    const tButton = useTranslations("Button")
    const tBuilder = useTranslations("Builder")

    const [editing, setEditing] = useState<string | null>(null)

    const handleAdd = () => {
        const newItem: CustomSectionType = {
            id: crypto.randomUUID(),
            title: "",
            type: "detailed",
            layout: "center",
            items: []
        }

        onSectionChange([...sections, newItem])
        setIsEditingMode(true)
        setEditing(newItem.id)
    }

    const handleUpdate = (updatedItem: CustomSectionType) => {
        const updatedList = sections.map(item => item.id === updatedItem.id ? updatedItem : item )
        onSectionChange(updatedList)
    }

    const handleRemove = (sectionId: string) => {
        onSectionChange(sections.filter((item) => item.id !== sectionId))

        if (editing === sectionId) {
            handleExitEdit()
        }
    }

    const handleExitEdit = () => {
        setEditing(null)
        setIsEditingMode(false)
    }

    if (editing !== null) {
        const activeItem = sections.find(item => item.id === editing)

        if (!activeItem) {
            return <SectionItemError />
        }

        return <CustomItem item={activeItem} onUpdate={handleUpdate} onBack={handleExitEdit} onDelete={handleRemove} setIsEditingMode={setIsEditingMode} />
    }

    return (
        <section className="px-3 mt-6 flex flex-col gap-6 sm:px-12 w-full">
            <SectionHeader step="custom" />

            <SortableList items={sections} onReorder={onSectionChange} droppableId="experience-list"
                            renderItem={(item) => (
                                <div className="flex items-center gap-4">
                                    <div className="flex flex-col flex-1 min-w-0 gap-1">
                                        <h2 className="font-semibold text-text-main text-base sm:text-lg leading-tight wrap-break-word">{item.title || <span className="text-text-muted italic text-sm">{tBuilder("untitledSection")}</span>}</h2>

                                        <div className="flex flex-wrap items-center text-sm gap-x-2 gap-y-0.5">
                                            <span className="font-medium text-text-muted wrap-break-word">{item.type}</span>
                                            <span className="font-medium text-text-muted wrap-break-word">{item.layout}</span>
                                        </div>
                                    </div>

                                    <ItemActions onEdit={() => { setEditing(item.id); setIsEditingMode(true) }} onDelete={() => handleRemove(item.id)} editLabel={tButton("edit")} deleteLabel={tButton("delete")} itemLabel={item.title || tBuilder("untitledSection")} />
                                </div>
                            )}
                        />

            <ElementAddButton step={"Section"} onAdd={() => { handleAdd() }} />
        </section>
    )
}