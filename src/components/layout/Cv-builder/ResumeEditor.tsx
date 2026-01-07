"use client"

import EducationIcon from "@/components/icons/EducationIcon";
import ExperienceIcon from "@/components/icons/ExperienceIcon";
import LanguagesIcon from "@/components/icons/LanguagesIcon";
import PersonIcon from "@/components/icons/PersonIcon";
import PlusIcon from "@/components/icons/PlusIcon";
import SkillsIcon from "@/components/icons/SkillsIcon";
import { useEffect, useState } from "react"
import PersonalDataSection from "./PersonalDataSection"
import { useTranslations } from "next-intl"
import Capsule from "./Capsule"
import Button from "@/components/ui/Button";
import ResumePreview from "./ResumePreview";
import { ExperienceItem } from "@/types/experience";
import { EducationItem } from "@/types/education";
import ExperienceSection from "./ExperienceSection";
import EducationSection from "./EducationSection";
import { ResumeData } from "@/types/resumeData";
import SkillsSection from "./SkillSection";
import { SkillsCategory } from "@/types/skillsCategory";
import { LanguagesItem } from "@/types/languages";
import LanguagesSection from "./LanguagesSection";
import CustomSection from "./CustomSection";
import { CustomSection as CustomSectionType } from "@/types/customSection";

type ResumeEditorProps = {
    isAuthenticated: boolean;
    avatarUrl: string | null;
    initials: string | null;
    userFirstName: string | null;
    userLastName: string | null;
    jobTitle: string | null;
    email: string | null;
    phone: string | null;
    address: string | null;
}

export default function ResumeEditor({ isAuthenticated, avatarUrl, initials, userFirstName, userLastName, jobTitle, email, phone, address }: ResumeEditorProps) {
    const tCvBuilder = useTranslations("BuilderSteps")
    const tButton = useTranslations("Button")

    const iconStyles = "w-7 h-7"

    const STEPS = [
        {key: "personalData", name: tCvBuilder("personalData"), icon: <PersonIcon className={iconStyles} />},
        {key: "experience", name: tCvBuilder("experience"), icon: <ExperienceIcon className={iconStyles} />},
        {key: "education", name: tCvBuilder("education"), icon: <EducationIcon className={iconStyles} />},
        {key: "skills", name: tCvBuilder("skills"), icon: <SkillsIcon className={iconStyles} />},
        {key: "languages", name: tCvBuilder("languages"), icon: <LanguagesIcon className={iconStyles} />},
        {key: "addSection", name: tCvBuilder("addSection"), icon: <PlusIcon className={iconStyles} />},
    ]

    const [currentStep, setCurrentStep] = useState("personalData")
    const [selectedFile, setSelectedFile] = useState<File | null>(null)
    const [isEditingMode, setIsEditingMode] = useState(false)
    const [viewMode, setViewMode] = useState<"list" | "categories">("categories")

    const [data, setData] = useState<ResumeData>({
        personalInfo: {
            avatarUrl: avatarUrl || null,
            firstName: userFirstName || "",
            lastName: userLastName || "",
            jobTitle: jobTitle || "",
            phone: phone || "",
            email: email || "",
            address: address || "",
            links: []
        },
        experience: [] as ExperienceItem[],
        education: [] as EducationItem[],
        skills: [] as SkillsCategory[],
        languages: [] as LanguagesItem[],
        customSection: [] as CustomSectionType[]
    })

    const handleSectionChange = <K extends keyof ResumeData>(sectionKey: K, newValue: ResumeData[K]) => {
        setData((prev) => ({ ...prev, [sectionKey]: newValue }))
    }

    const displaySection = (currentStep: string) => {
        switch(currentStep) {
            case "personalData":
                return <PersonalDataSection personalData={data.personalInfo} onPersonalInfoChange={(newItems) => handleSectionChange("personalInfo", newItems)}  isAuthenticated={isAuthenticated} initials={initials} setSelectedFile={setSelectedFile} />
            case "experience":
                return <ExperienceSection experience={data.experience} onExperienceChange={(newItems) => handleSectionChange("experience", newItems)} setIsEditingMode={setIsEditingMode} />
            case "education":
                return <EducationSection education={data.education} onEducationChange={(newItems) => handleSectionChange("education", newItems)} setIsEditingMode={setIsEditingMode} />
            case "skills":
                return <SkillsSection categories={data.skills} viewMode={viewMode} setViewMode={setViewMode} onSkillsChange={(newItems) => handleSectionChange("skills", newItems)} />
            case "languages":
                return <LanguagesSection languages={data.languages} onLanguageChange={(newItems) => handleSectionChange("languages", newItems)} setIsEditingMode={setIsEditingMode} />
            case "addSection":
                return <CustomSection sections={data.customSection} onSectionChange={(newItems: CustomSectionType[]) => handleSectionChange("customSection", newItems)} setIsEditingMode={setIsEditingMode} />
        }
    }

    const handleNextButton = (currentStep: string) => {
        const currentIndex = STEPS.findIndex(link => link.key === currentStep)

        if (currentIndex < STEPS.length - 1) {
            setCurrentStep(STEPS[currentIndex+1].key)
        }
    }

    const handlePrevButton = (currentStep: string) => {
        const currentIndex = STEPS.findIndex(link => link.key === currentStep)

        if (currentIndex > 0) {
            setCurrentStep(STEPS[currentIndex-1].key)
        }
    }

    return (
        <div className="xl:flex w-full">
            <div className="p-4 flex overflow-y-hidden border-b border-border gap-4 xl:flex-col xl:border-r xl:py-10 xl:w-[300px]">
                {STEPS.map((item, index) => {
                    return <Capsule onClick={() => { setCurrentStep(item.key); setIsEditingMode(false) }} key={index} text={item.name} currentStep={currentStep} value={item.key} icon={item.icon} />
                })}
            </div>

            <div className="flex-1 overflow-y-auto pb-24 relative bg-surface-hover xl:pb-12">
                {displaySection(currentStep)}
                {!isEditingMode && (
                    <div className="w-full grid grid-cols-2 gap-8 mt-16 px-3 sm:px-12">
                        <Button variant="secondary" className={`w-full ${STEPS.findIndex(link => link.key === currentStep) === 0 ? "invisible pointer-events-none transition-none" : ""}`} text={tButton("prevBtn")} onClick={() => handlePrevButton(currentStep)} />
                        <Button variant="primary" className="w-full" text={tButton("nextBtn")} onClick={() => handleNextButton(currentStep)} />
                    </div>
                )}
            </div>

            <ResumePreview data={data} />
        </div>
    )
}