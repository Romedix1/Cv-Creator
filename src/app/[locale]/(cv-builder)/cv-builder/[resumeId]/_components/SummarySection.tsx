"use client"

import { useTranslations } from "next-intl"
import Input from "@/components/ui/Input"
import SortableList from "./SortableList";
import SectionHeader from "./SectionHeader";
import { cn } from "@/lib/utils";

type CustomSectionSubset = {
    id: string;
    title?: string;
    name?: string;
}

type SummarySectionProps = {
    sections: string[];
    onSectionsOrderChange: (newOrder: string[]) => void;
    customSections: CustomSectionSubset[];
    onTemplateChange: (newValue: string) => void;
    onColorChange: (newValue: string) => void;
    template: string | null;
    color: string;
}

const TEMPLATE_COLORS = ["#2563EB", "#059669", "#7C3AED", "#DC2626", "#4B5563", "#BE185D"]

export default function SummarySection({ sections, onSectionsOrderChange, customSections, onTemplateChange, onColorChange, template, color }: SummarySectionProps) {
    const tTemplate = useTranslations("Template")
    const tInput = useTranslations("Inputs")
    const tAria = useTranslations("Aria")

    const COLOR_NAMES: Record<string, string> = {
        "#2563EB": tTemplate("blue"),
        "#059669": tTemplate("green"),
        "#7C3AED": tTemplate("purple"),
        "#DC2626": tTemplate("red"),
        "#4B5563": tTemplate("gray"),
        "#BE185D": tTemplate("pink")
    }

    const identifiableSections = sections.map(id => ({ id }));

    const CHANGE_TEMPLATE_OPTIONS = [
        {label: "Modern Blue", value: "modern-blue"},
        {label: "Classic Corporate", value: "classic-corporate"},
        {label: "Tech Minimal", value: "tech-minimal"},
        {label: "Timeline Modern", value: "timeline-modern"},
        {label: "Swiss Minimalist", value: "swiss-minimalist"},
        {label: "Creative Accent", value: "creative-accent"},
    ]

    const handleReorder = (newItems: { id: string }[]) => {
        const newOrderIds = newItems.map(item => item.id)
        onSectionsOrderChange(newOrderIds)
    }

    const getSectionTitle = (id: string) => {
        const custom = customSections.find(section => section.id === id)

        if (custom) {
            return custom.title || custom.name || tTemplate("noTitle")
        }

        try {
            return tTemplate(`${id}Header`)
        } catch (error) {
            return tTemplate("noTitle")
        }
    }

    return (
        <section className="px-3 mt-6 flex flex-col gap-6 sm:px-12 w-full">
            <div className="flex justify-between items-center mb-6">
                <SectionHeader step="summary" />
            </div>

            <div className="py-4 border-b border-border w-full flex flex-col gap-6 items-center md:flex-row md:justify-between md:gap-10">
                <div className="w-full md:w-6/12">
                    <Input name={tInput("changeTemplate")} value={template || ""} label={tInput("changeTemplate")} type="select" options={CHANGE_TEMPLATE_OPTIONS} onChange={(e) => onTemplateChange(e.target.value)} className="text-sm"/>
                </div>
                <div className="w-full md:w-fit">
                    {template === "creative-accent" && (
                        <>
                            <h2 className="text-text-main text-[14px] font-medium mb-2">{tInput("changeColor")}</h2>
                            <div className="flex gap-2.5 mb-2">
                                    {TEMPLATE_COLORS.map((col, index) => {
                                        return (
                                            <button aria-label={`${tAria("selectColor")}: ${COLOR_NAMES[col] || col}`} onClick={() => onColorChange(col)} key={index} style={{ background: col }} className={cn("w-10 h-10 rounded-full cursor-pointer hover:scale-110 duration-200", col === color && "ring-2 ring-text-main")} />
                                        )
                                    })}
                            </div>
                        </>
                    )}
                </div>
            </div>
            <div className="flex flex-col gap-6">
                <SortableList items={identifiableSections} onReorder={handleReorder} droppableId="sections-list"
                    renderItem={(item) => (
                        <div className="flex items-center gap-4">
                            <div className="flex flex-col flex-1 min-w-0 gap-1">
                                <h2 className="font-semibold text-text-main text-base sm:text-lg leading-tight wrap-break-word">{getSectionTitle(item.id)}</h2>
                            </div>
                        </div>
                    )}
                />
            </div>
        </section>
    )
}