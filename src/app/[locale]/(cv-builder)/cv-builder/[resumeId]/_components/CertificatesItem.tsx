import Input from "@/components/ui/Input";
import { useTranslations } from "next-intl";
import ExitEditingMode from "@/app/[locale]/(cv-builder)/cv-builder/[resumeId]/_components/ExitEditingMode";
import ItemHeader from "@/app/[locale]/(cv-builder)/cv-builder/[resumeId]/_components/ItemHeader";
import { Certificates as CertificatesProps } from "@/types/certificates";

type CertificatesItemProps = {
    item: CertificatesProps;
    onUpdate: (updatedItem: CertificatesProps) => void;
    onBack: () => void;
    onDelete: (index: string) => void;
    setIsEditingMode: (isEditing: boolean) => void;
}

export default function CertificatesItem({ item, onUpdate, onBack, onDelete, setIsEditingMode }: CertificatesItemProps) {
    const tInput = useTranslations("Inputs")

    const handleChange = (field: keyof CertificatesProps, value: string) => {
        onUpdate({ ...item, [field]: value })
    }

    return (
        <div className="w-full px-3 mt-6 sm:px-12">
            <ItemHeader step="Experience" />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input name="name" type="text" label={tInput("nameLabel")} value={item.name || ""} onChange={(e) => handleChange("name", e.target.value)} />
                <Input name="organizer" type="text" label={tInput("organizerLabel")} value={item.organizer || ""} onChange={(e) => handleChange("organizer", e.target.value)} />
                <Input name="date" type="text" label={tInput("dateLabel")} value={item.date || ""} onChange={(e) => handleChange("date", e.target.value)}/>
            </div>

            <ExitEditingMode itemId={item.id} onDelete={onDelete} setIsEditingMode={setIsEditingMode} onBack={onBack} />
        </div>
    )
}