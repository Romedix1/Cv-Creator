import SortableList from "@/app/[locale]/(cv-builder)/cv-builder/[resumeId]/_components/SortableList";
import { CustomSection as CustomSectionType } from "@/types/customSection";
import { useTranslations } from "next-intl";
import { useState } from "react";
import CustomItem from "./CustomItem";
import SectionItemError from "@/app/[locale]/(cv-builder)/cv-builder/[resumeId]/_components/SectionItemError";
import ElementAddButton from "@/app/[locale]/(cv-builder)/cv-builder/[resumeId]/_components/ElementAddButton";
import ItemActions from "@/app/[locale]/(cv-builder)/cv-builder/[resumeId]/_components/ItemActions";
import SectionHeader from "@/app/[locale]/(cv-builder)/cv-builder/[resumeId]/_components/SectionHeader";

type CustomSectionProps = {
sections: CustomSectionType[];
    template: string;
    sectionOrder: string[];
    onOrderChange: (newOrder: string[]) => void;
    onSectionChange: (newSection: CustomSectionType[]) => void;
    setIsEditingMode: (isEditing: boolean) => void;
}

export default function CustomSection({ sections, sectionOrder, template, onSectionChange, onOrderChange, setIsEditingMode }: CustomSectionProps) {
    const tButton = useTranslations("Button")
    const tBuilder = useTranslations("Builder")

    const [editing, setEditing] = useState<string | null>(null)

    const handleAdd = () => {
        const newId = crypto.randomUUID()
        const newItem: CustomSectionType = {
            id: newId,
            title: "",
            type: "detailed",
            layout: "center",
            items: []
        }

        onSectionChange([...sections, newItem])

        onOrderChange([...sectionOrder, newId])

        setIsEditingMode(true)
        setEditing(newId)
    }

    const handleUpdate = (updatedItem: CustomSectionType) => {
        const updatedList = sections.map(item => item.id === updatedItem.id ? updatedItem : item )
        onSectionChange(updatedList)
    }

    const handleRemove = (sectionId: string) => {
        onSectionChange(sections.filter((item) => item.id !== sectionId))

        onOrderChange(sectionOrder.filter(id => id !== sectionId))

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

        return <CustomItem item={activeItem} template={template} onUpdate={handleUpdate} onBack={handleExitEdit} onDelete={handleRemove} setIsEditingMode={setIsEditingMode} />
    }

    return (
        <section className="px-3 mt-6 flex flex-col gap-6 sm:px-12 w-full">
            <SectionHeader step="custom" />

            <SortableList items={sections} onReorder={onSectionChange} droppableId="custom-list"
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