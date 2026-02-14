"use client"

import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { useTranslations } from "next-intl";
import { Dot, Plus, Trash2 } from "lucide-react";
import { DescriptionItem } from "@/types/descriptionItem";

type DescriptionProps = {
    items: DescriptionItem[];
    onChange: (newItems: DescriptionItem[]) => void;
}

export default function ExperienceDescription({ items, onChange }: DescriptionProps) {
    const tInput = useTranslations("Inputs")
    const tButton = useTranslations("Button")
    const tBuilder = useTranslations("Builder")

    const handleAdd = () => {
        const newItem = {
            id: crypto.randomUUID(),
            value: "",
        }

        onChange([...items, newItem])
    }

    const handleEdit = (id: string, newValue: string) => {
        const newItems = items.map((item) => {
            if (item.id === id) {
                return { ...item, value: newValue }
            }
            return item
        })
        onChange(newItems)
    }

    const handleRemove = (id: string) => {
        onChange(items.filter((item) => item.id !== id))
    }

    return (
        <div className="sm:col-span-2 mt-4">
            <p className="block text-sm font-medium text-text-main mb-2">{tBuilder("description")}</p>

            <div className="flex flex-col gap-3" role="list">
                {(items).map((desc, index) => (
                    <div key={desc.id} className="flex gap-2 items-center">
                        <Dot className="mt-7" aria-hidden="true"/>

                        <div className="flex-1">
                            <Input label={`${tInput("responsibilitiesLabel")} ${index+1}`} name={`desc-${index}`} type="text" placeholderValue={tInput("responsibilitiesPlaceholder")} value={desc.value} onChange={(e) => handleEdit(desc.id, e.target.value)}/>
                        </div>

                        <Button onClick={() => handleRemove(desc.id)} variant="remove" className="mt-6" aria-label={`${tButton("delete")} ${tInput("responsibilitiesLabel")} ${index + 1}`} icon={<Trash2 aria-hidden="true" className="w-7 h-7" />} />
                    </div>
                ))}
            </div>

            <div className="mt-8">
                <Button onClick={handleAdd} variant="secondary" className="w-full gap-2 border-dashed border-2" text={tBuilder("addPoint")} icon={<Plus aria-hidden="true" className="w-4 h-4"/>} />
            </div>
        </div>
    )
}