"use client"

import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button"
import { useTranslations } from "next-intl";
import BinIcon from "@/components/icons/BinIcon";
import DateRange from "@/components/ui/DateRange";
import { CustomSection as CustomSectionType } from "@/types/customSection";
import { Separator } from "@/components/ui/separator";
import Toggle from "@/components/ui/Toggle";
import { CustomElement } from "@/types/customElement";
import { CustomItem as CustomItemType } from "@/types/customItem";
import { PiDotsSixVertical } from "react-icons/pi";
import { CustomSectionLayout } from "@/types/customSectionTypeLayout";
import ExitEditingMode from "@/components/ui/ExitEditingMode";
import ElementAddButton from "@/components/ui/ElementAddButton";
import { Dot } from "lucide-react";

type CustomSectionProps = {
    item: CustomSectionType;
    onUpdate: (updatedItem: CustomSectionType) => void;
    onBack: () => void;
    onDelete: (index: string) => void;
    setIsEditingMode: (isEditing: boolean) => void;
}

export default function CustomItem({ item, onUpdate, onBack, onDelete, setIsEditingMode }: CustomSectionProps) {
    const tInput = useTranslations("Inputs")
    const tBuilder = useTranslations("Builder")
    const tButton = useTranslations("Button")
    const tAria = useTranslations("Aria")

    const handleAdd = (type: "item" | "element", parentId?: string) => {
        if (type === "item") {
            const newItem = {
                id: crypto.randomUUID(),
                title: "",
                description: "",
                dateStart: "",
                dateEnd: "",
                elements: []
            }
            onUpdate({ ...item, items: [...item.items, newItem] as CustomItemType[] })
        } else if (type === "element" && parentId) {
            const newElement: CustomElement = {
                id: crypto.randomUUID(),
                type: "label",
                value: ""
            }
            const updatedItems = item.items.map(item => item.id === parentId ? { ...item, elements: [...(item.elements || []), newElement] } : item)
            onUpdate({ ...item, items: updatedItems })
        }
    }

    const handleChange = (field: string, value: string | string[], itemId?: string, elementId?: string) => {
        if (!itemId) {
            onUpdate({ ...item, [field]: value })
            return
        }

        const updatedItems = item.items.map(subItem => {
            if (subItem.id !== itemId) return subItem

            if (!elementId) {
                return { ...subItem, [field]: value }
            }

            const updatedElements = (subItem.elements || []).map(el => el.id === elementId ? { ...el, [field]: value } : el)
            return { ...subItem, elements: updatedElements }
        })

        onUpdate({ ...item, items: updatedItems })
    }

    const handleLayoutChange = (newLayout: string) => {
        const typedLayout = newLayout as CustomSectionLayout

        const updatedItem = { ...item, layout: typedLayout }

        if (typedLayout !== "left" && item.type === "list") {
            updatedItem.type = "text"
        } else if (typedLayout === "left" && item.type !== "list") {
            updatedItem.type = "list"
        }

        onUpdate(updatedItem)
    }

    const handleDateChange = (itemId: string, field: "startDate" | "endDate", value: string) => {
        const updatedItems = item.items.map(subItem => subItem.id === itemId ? { ...subItem, [field]: value } : subItem)

        onUpdate({ ...item, items: updatedItems })
    }

    const handleRemove = (type: "item" | "element", itemId: string, elementId?: string) => {
        if (type === "item") {
             onUpdate({ ...item, items: item.items.filter(i => i.id !== itemId) })
        } else if (type === "element" && elementId) {
            const updatedItems = item.items.map(i => {
                if (i.id !== itemId) return i
                return { ...i, elements: i.elements?.filter(e => e.id !== elementId) }
            })
            onUpdate({ ...item, items: updatedItems })
        }
    }

    const POSITION_OPTIONS = [
        { value: "left", label: tInput("left") },
        { value: "center", label: tInput("center") }
    ]

    const CONTENT_TYPE_OPTIONS = [
        { value: "list", label: tInput("list") },
        { value: "text", label: tInput("text") },
        { value: "detailed", label: tInput("detailed") }
    ]

    const SUBITEM_ELEMENTS_OPTIONS = [
        { value: "label", label: tInput("label") },
        { value: "description", label: tInput("description") },
    ]

    const visibleContentTypeOptions = item.layout === "left" ? CONTENT_TYPE_OPTIONS.filter(option => option.value === "list") : CONTENT_TYPE_OPTIONS.filter(option => option.value !== "list")

    const renderSubitem = (type: string, index: number, subItem: CustomItemType) => {
        const headerAndDates = (
            <div className="flex flex-col md:flex-row gap-6 mt-2">
                <div className="flex-1 w-full">
                    <Input name={`subitemHeader${index}`} value={subItem.title || ""} onChange={(event) => handleChange("title", event.target.value, subItem.id)} label={tBuilder("subitemHeader")} type="text" />
                </div>
                <div className="sm:grid sm:grid-cols-2 flex flex-col gap-6">
                    <DateRange type="other" startDate={subItem.startDate} endDate={subItem.endDate} onChange={(field, value) => handleDateChange(subItem.id, field, value)} />
                </div>
            </div>
        )

        if (type === "detailed") {
            return (
                <>
                    {headerAndDates}

                    <div>
                        {subItem.elements?.map((element: CustomElement, index: number) => (
                            <div key={element.id} className="flex flex-row gap-2 sm:gap-4 w-full mb-6 mt-6 sm:mt-0">
                                <div className="w-4/12 sm:w-4/12 lg:w-3/12">
                                    <Input name={`label${element.id}`} type="select" label={tInput("type")} options={SUBITEM_ELEMENTS_OPTIONS} onChange={(e) => handleChange("type", e.target.value, subItem.id, element.id)} value={element.type} />
                                </div>
                                <div className="w-full flex-1">
                                    <Input name={`value${element.id}`} type="text" label={tInput("value")} onChange={(e) => handleChange("value", e.target.value, subItem.id, element.id)} value={element.value} />
                                </div>
                                <Button className="mt-6" aria-label={`${tButton("delete")} ${tInput("value")} ${index + 1}`} variant="remove" icon={<BinIcon aria-hidden="true" className="w-6 h-6"/>} onClick={() => handleRemove("element", subItem.id, element.id)} />
                            </div>
                        ))}
                    </div>

                    <ElementAddButton step="SubitemElement" onAdd={() => handleAdd("element", subItem.id)} />
                    <Button className="border dark:bg-[#1F0A0A] bg-[#FEF2F2] border-error w-full mt-6" variant="secondary" icon={<BinIcon aria-hidden="true" className="w-6 h-6"/>} text={tButton("delete")} onClick={() => handleRemove("item", subItem.id)} />
                </>
            )
        } else if (type === "text") {
            return (
                <>
                    {headerAndDates}
                    <textarea aria-label={tInput("insertText")} className="w-full h-37.5 p-3 border rounded-md bg-transparent focus:border-default outline-none placeholder:text-gray-400 mt-6" placeholder={tInput("insertText")} value={subItem.description || ""} onChange={(e) => handleChange("description", e.target.value, subItem.id)} />
                    <Button className="border dark:bg-[#1F0A0A] bg-[#FEF2F2] border-error w-full mt-6" variant="secondary" icon={<BinIcon aria-hidden="true" className="w-6 h-6"/>} text={tButton("delete")} onClick={() => handleRemove("item", subItem.id)} />
                </>
            )
        } else if (type === "list") {
             return (
                <div className="space-y-3">
                    <div className="flex items-center gap-3 mb-4">
                        <button type="button" aria-label={tBuilder("moveItem")} className="cursor-grab p-1 shrink-0 text-text-main active:cursor-grabbing">
                            <PiDotsSixVertical className="w-6 h-6"/>
                        </button>
                        <input placeholder={tInput("categoryName")} aria-label={tInput("categoryName")} value={subItem.title || ""} onChange={(event) => handleChange("title", event.target.value, subItem.id)} className="font-semibold text-text-main bg-transparent outline-none placeholder:text-text-muted/50 w-full" />
                        <Button variant="remove" onClick={() => handleRemove("item", subItem.id)} aria-label={`${tButton("delete")} ${subItem.title || tInput("categoryName")}`} icon={<BinIcon aria-hidden="true" className="w-6 h-6" />} />
                    </div>

                    {subItem.elements?.map((element: CustomElement, index) => (
                        <div key={element.id} className="flex items-center gap-4">
                            <Dot className="mt-7" aria-hidden="true"/>
                            <div className="flex-1">
                                <Input name={`listItem-${element.id}`} type="text" label={`${tInput("element")} ${index+1}`} value={element.value} onChange={(e) => handleChange("value", e.target.value, subItem.id, element.id)} />
                            </div>
                            <Button className="mt-1" aria-label={`${tButton("delete")} ${tInput("value")} ${index + 1}`} variant="remove" icon={<BinIcon aria-hidden="true" className="w-6 h-6"/>} onClick={() => handleRemove("element", subItem.id, element.id)} />
                        </div>
                    ))}
                    <ElementAddButton step="SubitemElement" onAdd={() => handleAdd("element", subItem.id)} />
                </div>
             )
        }
    }

    return (
        <div className="w-full px-3 mt-6 sm:px-12">
            <h1 className="text-xl font-bold mb-6">{tBuilder("editSection")}</h1>

            <div className="p-4 border bg-surface rounded-xl">
                <Input label={tBuilder("sectionName")} value={item.title || ""} onChange={(event) => handleChange("title", event.target.value)} name="sectionName" type="text" />

                <Separator className="my-4" />
                <div role="group" aria-label={tBuilder("sectionSettings")} className="flex justify-between">
                    <div>
                        <p id="pos-label" className="mb-4">{tBuilder("position")}</p>
                        <Toggle ariaLabel={tAria("changePos")} value={item.layout} onChange={(value) => handleLayoutChange(value)} name="sectionLayout" options={POSITION_OPTIONS} />
                    </div>

                    <div>
                        <p id="type-label" className="mb-4">{tBuilder("contentType")}</p>
                        <Toggle ariaLabel={tAria("changeType")} value={item.type} onChange={(value) => handleChange("type", value)} name="contentType" options={visibleContentTypeOptions} />
                    </div>
                </div>
            </div>

            <h2 className="mt-6 font-semibold text-lg">{tBuilder("sectionSubitems")}</h2>
            {item.items.map((subItem, index) => (
                <div className="p-4 border bg-surface rounded-xl my-6" key={subItem.id}>
                    {renderSubitem(item.type, index, subItem)}
                </div>
            ))}

            <ElementAddButton step={"Subitem"} onAdd={() => { handleAdd("item") }} />

            <ExitEditingMode itemId={item.id} onDelete={onDelete} setIsEditingMode={setIsEditingMode} onBack={onBack} />
        </div>
    )
}