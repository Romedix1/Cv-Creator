import { useTranslations } from "next-intl";
import Button from "../../../../../../components/ui/Button";
import { Plus } from "lucide-react";

type ElementAddButtonProps = {
    step: string;
    onAdd: () => void;
}

export default function ElementAddButton({ step, onAdd }: ElementAddButtonProps) {
    const tButton = useTranslations("Button")

    return (
        <div className="mt-6 w-full">
            <Button onClick={onAdd} variant="secondary" className="w-full gap-4 border-dashed border-2" text={tButton(`add${step}`)} icon={<Plus aria-hidden="true" className="w-5 h-5"/>} />
        </div>
    )
}