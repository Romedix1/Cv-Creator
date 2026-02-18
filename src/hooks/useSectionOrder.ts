import { ResumeData } from "@/types/resumeData";
import { DEFAULT_SECTION_ORDER } from "@/lib/constants";

interface SectionConfig {
    title: string;
    position?: "left" | "center";
    isVisible: boolean;
    content: React.ReactNode;
}

export const useSectionOrder = (data: ResumeData, sectionsMap: Record<string, SectionConfig>) => {
    const customSections = data.customSection || []
    const customSectionIds = customSections.map(s => s.id)

    const fullDefaultOrder = [...DEFAULT_SECTION_ORDER, ...customSectionIds]
    const finalOrder = data.settings.sectionOrder || fullDefaultOrder

    const sectionsToRender = finalOrder.map(id => {
        if (sectionsMap[id]) {
            return { ...sectionsMap[id], id }
        }

        const customData = customSections.find(s => s.id === id)
        if (customData) {
            return {
                id: customData.id,
                title: customData.title,
                isVisible: true,
                content: null,
                isCustom: true,
                position: customData.layout
            }
        }

        return null
    }).filter(section => section !== null && section.isVisible)

    return sectionsToRender
}