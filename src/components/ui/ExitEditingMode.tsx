import { useTranslations } from "next-intl";
import Button from "./Button";
import BinIcon from "../icons/BinIcon";

type ExitEditingModeProps = {
    itemId: string,
    onDelete: (index: string) => void;
    setIsEditingMode: (isEditing: boolean) => void;
    onBack: () => void;
}

export default function ExitEditingMode({ itemId, onDelete, setIsEditingMode, onBack }: ExitEditingModeProps) {
    const tBuilder = useTranslations("Builder")
    const tButton = useTranslations("Button")

    return (
        <div className="mt-8 flex gap-4 justify-between">
            <Button onClick={() => {onDelete(itemId); setIsEditingMode(false);}} variant="remove" text={tButton("delete")} icon={<BinIcon aria-hidden="true" className="w-7 h-7" />} />
            <Button onClick={() => {onBack()}} variant="primary" text={tBuilder("save")} className="w-fit px-6" />
        </div>
    )
}