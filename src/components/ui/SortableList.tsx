"use client"

import { DragDropContext, Draggable, Droppable, DropResult, DraggableProvidedDragHandleProps } from "@hello-pangea/dnd";
import { PiDotsSixVertical } from "react-icons/pi";
import { ReactNode } from "react";
import { useTranslations } from "next-intl";

type Identifiable = { id: string };

type SortableListProps<T extends Identifiable> = {
    items: T[];
    onReorder: (items: T[]) => void;
    droppableId: string;
    renderItem: (item: T, dragHandleProps: DraggableProvidedDragHandleProps | null) => ReactNode;
}

export default function SortableList<T extends Identifiable>({ items, onReorder, droppableId, renderItem }: SortableListProps<T>) {
    const tAria = useTranslations("Aria")

    const onDragEnd = (result: DropResult) => {
        if (!result.destination) return

        const newItems = Array.from(items)
        const [reorderedItem] = newItems.splice(result.source.index, 1)
        newItems.splice(result.destination.index, 0, reorderedItem)

        onReorder(newItems)
    }

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId={droppableId}>
                {(provided) => (
                    <div className="flex flex-col gap-3" {...provided.droppableProps} ref={provided.innerRef}>
                        {items.map((item, index) => (
                            <Draggable key={item.id} draggableId={item.id} index={index}>
                                {(provided, snapshot) => (
                                    <div ref={provided.innerRef} {...provided.draggableProps} className={`flex border p-3 sm:p-4 rounded-xl items-center gap-3 sm:gap-4 bg-bg-main ${snapshot.isDragging ? "shadow-lg border-blue-400 rotate-1" : "border-border"}`}>
                                        <div aria-label={tAria("changeOrder")} role="button" {...provided.dragHandleProps} className="cursor-grab p-1 shrink-0 text-text-main active:cursor-grabbing">
                                            <PiDotsSixVertical aria-hidden="true" className="w-6 h-6"/>
                                        </div>

                                        <div className="flex-1 min-w-0">
                                            {renderItem(item, provided.dragHandleProps)}
                                        </div>
                                    </div>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    );
}