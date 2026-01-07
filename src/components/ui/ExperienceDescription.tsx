"use client"

import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { useTranslations } from "next-intl";
import { Dot } from "lucide-react";
import PlusIcon from "@/components/icons/PlusIcon";
import BinIcon from "@/components/icons/BinIcon";

type DescriptionProps = {
    items: string[];
    onChange: (newItems: string[]) => void;
}

export default function ExperienceDescription({ items, onChange }: DescriptionProps) {
    const tInput = useTranslations("Inputs")
    const tButton = useTranslations("Button")
    const tBuilder = useTranslations("Builder")

    const handleAdd = () => onChange([...items, ""])

    const handleEdit = (index: number, value: string) => {
        const newDescription = [...items]
        newDescription[index] = value
        onChange(newDescription)
    }

    const handleRemove = (index: number) => {
        onChange(items.filter((_, i) => i !== index))
    }

    return (
        <div className="sm:col-span-2 mt-4">
            <p className="block text-sm font-medium text-text-main mb-2">{tBuilder("description")}</p>

            <div className="flex flex-col gap-3" role="list">
                {(items).map((desc, index) => (
                    <div key={index} className="flex gap-2 items-center">
                        <Dot className="mt-7" aria-hidden="true"/>

                        <div className="flex-1">
                            <Input label={`${tInput("responsibilitiesLabel")} ${index+1}`} name={`desc-${index}`} type="text" placeholderValue={tInput("responsibilitiesPlaceholder")} value={desc} onChange={(e) => handleEdit(index, e.target.value)}/>
                        </div>

                        <Button onClick={() => handleRemove(index)} variant="remove" className="mt-6" aria-label={`${tButton("delete")} ${tInput("responsibilitiesLabel")} ${index + 1}`} icon={<BinIcon aria-hidden="true" className="w-7 h-7" />} />
                    </div>
                ))}
            </div>

            <div className="mt-8">
                <Button onClick={handleAdd} variant="secondary" className="w-full gap-2 border-dashed border-2" text={tBuilder("addPoint")} icon={<PlusIcon aria-hidden="true" className="w-4 h-4"/>} />
            </div>
        </div>
    )
}