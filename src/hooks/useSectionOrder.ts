import { ResumeData } from "@/types/resumeData";
import { DEFAULT_SECTION_ORDER } from "@/lib/constants";

interface SectionConfig {
    title: string;
    position?: "left" | "center";
    isVisible: boolean;
    content: React.ReactNode;
}

export const useSectionOrder = (data: ResumeData,  sectionsMap: Record<string, SectionConfig>) => {
    const customSectionIds = data.customSection?.map(section => section.id) || []

    const fullDefaultOrder = [...DEFAULT_SECTION_ORDER, ...customSectionIds]

    const finalOrder = data.settings.sectionOrder || fullDefaultOrder

    const sectionsToRender = finalOrder.map(id => ({...sectionsMap[id], id})).filter(section => section && section.isVisible)

    return sectionsToRender;
};