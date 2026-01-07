"use client"

import Input from "@/components/ui/Input";
import { ExperienceItem as ExperienceProps } from "@/types/experience";
import { useTranslations } from "next-intl";
import DateRange from "@/components/ui/DateRange";
import ExperienceDescription from "@/components/ui/ExperienceDescription";
import ExitEditingMode from "@/components/ui/ExitEditingMode";
import ItemHeader from "@/components/ui/ItemHeader";

type ExperienceItemProps = {
    item: ExperienceProps;
    onUpdate: (updatedItem: ExperienceProps) => void;
    onBack: () => void;
    onDelete: (index: string) => void;
    setIsEditingMode: (isEditing: boolean) => void;
}

export default function ExperienceItem({ item, onUpdate, onBack, onDelete, setIsEditingMode }: ExperienceItemProps) {
    const tInput = useTranslations("Inputs")

    const handleChange = (field: keyof ExperienceProps, value: string | string[]) => {
        onUpdate({ ...item, [field]: value })
    }

    return (
        <div className="w-full px-3 mt-6 sm:px-12">
            <ItemHeader step="Experience" />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input name="position" type="text" label={tInput("positionLabel")} value={item.position || ""} onChange={(e) => handleChange("position", e.target.value)} />
                <Input name="company" type="text" label={tInput("companyLabel")} value={item.company || ""} onChange={(e) => handleChange("company", e.target.value)} />
                <DateRange type="work" startDate={item.startDate} endDate={item.endDate || ""} onChange={handleChange} />

                <ExperienceDescription items={item.description || []} onChange={(newItems) => handleChange("description", newItems)} />
            </div>

            <ExitEditingMode itemId={item.id} onDelete={onDelete} setIsEditingMode={setIsEditingMode} onBack={onBack} />
        </div>
    )
}