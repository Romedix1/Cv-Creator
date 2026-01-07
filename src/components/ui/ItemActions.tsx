import Button from "./Button";
import BinIcon from "../icons/BinIcon";
import PenIcon from "../icons/PenIcon";

type ItemActionsProps = {
    onEdit: () => void;
    onDelete: () => void;
    editLabel: string;
    deleteLabel: string
    itemLabel: string;
}

export default function ItemActions({ onEdit, onDelete, editLabel, deleteLabel, itemLabel }: ItemActionsProps) {
    return (
        <div className="flex items-center gap-4 shrink-0">
            <Button aria-label={`${editLabel} ${itemLabel}`} onClick={onEdit} variant="edit" icon={<PenIcon aria-hidden="true" className="w-5 h-5"/>} />
            <Button aria-label={`${deleteLabel} ${itemLabel}`} onClick={onDelete} variant="remove" icon={<BinIcon aria-hidden="true" className="w-6 h-6" />} />
        </div>
    )
}