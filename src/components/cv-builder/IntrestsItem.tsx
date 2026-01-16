import Input from "@/components/ui/Input";
import { useTranslations } from "next-intl";
import ExitEditingMode from "@/components/ui/ExitEditingMode";
import ItemHeader from "@/components/ui/ItemHeader";
import { Interests as InterestsProps } from "@/types/interests";

type InterestsItemProps = {
    item: InterestsProps;
    onUpdate: (updatedItem: InterestsProps) => void;
    onBack: () => void;
    onDelete: (index: string) => void;
    setIsEditingMode: (isEditing: boolean) => void;
}

export default function InterestsItem({ item, onUpdate, onBack, onDelete, setIsEditingMode }: InterestsItemProps) {
    const tInput = useTranslations("Inputs")

    const handleChange = (field: keyof InterestsProps, value: string) => {
        onUpdate({ ...item, [field]: value })
    }

    return (
        <div className="w-full px-3 mt-6 sm:px-12">
            <ItemHeader step="Experience" />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input name="name" type="text" label={tInput("nameLabel")} value={item.name || ""} onChange={(e) => handleChange("name", e.target.value)} />
                <div className="flex flex-col gap-2 col-span-2">
                    <label htmlFor="value" className="text-text-main text-[14px] font-medium">{tInput("interestsLabel")}</label>
                    <textarea id="value" onChange={(e) => handleChange("value", e.target.value)} aria-label={tInput("insertText")} value={item.value || ""} className="w-full h-37.5 p-3 bg-bg-main border border-border rounded-xl placeholder:text-text-muted outline-none duration-200 hover:border-text-muted focus:border-default" placeholder={tInput("insertText")} />
                </div>
            </div>

            <ExitEditingMode itemId={item.id} onDelete={onDelete} setIsEditingMode={setIsEditingMode} onBack={onBack} />
        </div>
    )
}