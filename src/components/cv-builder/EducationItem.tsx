"use client"

import Input from "@/components/ui/Input";
import { EducationItem as EducationProps } from "@/types/education";
import { useTranslations } from "next-intl";
import DateRange from "@/components/ui/DateRange";
import ExitEditingMode from "@/components/ui/ExitEditingMode";

type EducationItemProps = {
    item: EducationProps;
    onUpdate: (updatedItem: EducationProps) => void;
    onBack: () => void;
    onDelete: (index: string) => void;
    setIsEditingMode: (isEditing: boolean) => void;
}

export default function EducationItem({ item, onUpdate, onBack, onDelete, setIsEditingMode }: EducationItemProps) {
    const tInput = useTranslations("Inputs")
    const tBuilder = useTranslations("Builder")

    const handleChange = (field: keyof EducationProps, value: string | string[]) => {
        onUpdate({ ...item, [field]: value })
    }

    return (
        <div className="w-full px-3 mt-6 sm:px-12">
            <h1 className="text-xl font-bold mb-6">{tBuilder("editEducation")}</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input name="institution" type="text" label={tInput("institutionLabel")} value={item.institution || ""} onChange={(e) => handleChange("institution", e.target.value)} />
                <Input name="major" type="text" label={tInput("majorLabel")} value={item.major || ""} onChange={(e) => handleChange("major", e.target.value)} />
                <Input name="degree" type="text" label={tInput("degreeLabel")} value={item.degree || ""} onChange={(e) => handleChange("degree", e.target.value)} />
                <DateRange type="study" startDate={item.startDate} endDate={item.endDate || ""} onChange={handleChange} />
            </div>

            <ExitEditingMode itemId={item.id} onDelete={onDelete} setIsEditingMode={setIsEditingMode} onBack={onBack} />
        </div>
    )
}