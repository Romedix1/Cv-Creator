import Input from "@/components/ui/Input";
import { useTranslations } from "next-intl";
import { LanguagesItem as LanguageProps } from "@/types/languages";
import ExitEditingMode from "@/components/ui/ExitEditingMode";

type LanguagesItemProps = {
    item: LanguageProps;
    onUpdate: (updatedItem: LanguageProps) => void;
    onBack: () => void;
    onDelete: (index: string) => void;
    setIsEditingMode: (isEditing: boolean) => void;
}

export default function LanguagesItem({ item, onUpdate, onBack, onDelete, setIsEditingMode }: LanguagesItemProps) {
    const tInput = useTranslations("Inputs")
    const tBuilder = useTranslations("Builder")

    const languageLevel = [
        { label: tBuilder("nativeLanguage"), value: "Native" },
        { label: "C2", value: "C2" },
        { label: "C1", value: "C1" },
        { label: "B2", value: "B2" },
        { label: "B1", value: "B1" },
        { label: "A2", value: "A2" },
        { label: "A1", value: "A1" },
    ]

    const handleChange = (field: keyof LanguageProps, value: string | string[]) => {
        onUpdate({ ...item, [field]: value })
    }

    return (
        <div className="w-full px-3 mt-6 sm:px-12">
            <h1 className="text-xl font-bold mb-6">{tBuilder("editLanguage")}</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input name="languageName" type="text" label={tInput("languageValueLabel")} value={item.value || ""} onChange={(e) => handleChange("value", e.target.value)} />
                <Input name="languageLevel" options={languageLevel} type="select" value={item.level || ""} label={tInput("languageLevelLabel")} onChange={(e) => handleChange("level", e.target.value)} />
            </div>

            <ExitEditingMode itemId={item.id} onDelete={onDelete} setIsEditingMode={setIsEditingMode} onBack={onBack} />
        </div>
    )
}