import ClassicCorporate from "@/components/templates/ClassicCorporate"
import CreativeAccent from "@/components/templates/CreativeAccent"
import ModernBlue from "@/components/templates/ModernBlue"
import SwissMinimalist from "@/components/templates/SwissMinimalist"
import TechMinimal from "@/components/templates/TechMinimal"
import TimelineModern from "@/components/templates/TimelineModern"
import { ResumeData } from "@/types/resumeData"

export const getTemplate = (template: string | null, data: ResumeData) => {
    switch(template) {
        case "modern-blue":
            return <ModernBlue data={data} />
        case "classic-corporate":
            return <ClassicCorporate data={data} />
        case "tech-minimal":
            return <TechMinimal data={data} />
        case "timeline-modern":
            return <TimelineModern data={data} />
        case "swiss-minimalist":
            return <SwissMinimalist data={data} />
        case "creative-accent":
            return <CreativeAccent data={data} />
        default:
            return <ModernBlue data={data} />
    }
}