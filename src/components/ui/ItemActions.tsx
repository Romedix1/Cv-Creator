import Button from "./Button";
import { PenSquare, Trash2 } from "lucide-react";

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
            <Button aria-label={`${editLabel} ${itemLabel}`} onClick={onEdit} variant="edit" icon={<PenSquare aria-hidden="true" className="w-5 h-5"/>} />
            <Button aria-label={`${deleteLabel} ${itemLabel}`} onClick={onDelete} variant="remove" icon={<Trash2 aria-hidden="true" className="w-6 h-6" />} />
        </div>
    )
}