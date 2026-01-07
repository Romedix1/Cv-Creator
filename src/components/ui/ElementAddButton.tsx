import { useTranslations } from "next-intl";
import Button from "./Button";
import PlusIcon from "../icons/PlusIcon";

type ElementAddButtonProps = {
    step: string;
    onAdd: () => void;
}

export default function ElementAddButton({ step, onAdd }: ElementAddButtonProps) {
    const tButton = useTranslations("Button")

    return (
        <div className="mt-6 w-full">
            <Button title={tButton(`add${step}`)} onClick={onAdd} variant="secondary" className="w-full gap-4 border-dashed border-2" text={tButton(`add${step}`)} icon={<PlusIcon aria-hidden="true" className="w-5 h-5"/>} />
        </div>
    )
}