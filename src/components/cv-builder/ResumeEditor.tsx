"use client"

import { useState } from "react"
import { useTranslations } from "next-intl"
import { ExperienceItem } from "@/types/experience";
import { EducationItem } from "@/types/education";
import { ResumeData } from "@/types/resumeData";
import { SkillsCategory } from "@/types/skillsCategory";
import { LanguagesItem } from "@/types/languages";
import { CustomSection as CustomSectionType } from "@/types/customSection";
import { Rodo as RodoType } from "@/types/rodo";
import { PersonalInfo } from "@/types/personalInfo";
import { Certificates } from "@/types/certificates";
import { Award, BriefcaseBusiness, GraduationCap, Heart, Languages, Plus, ShieldCheck, User2, Wrench } from "lucide-react";
import { Interests } from "@/types/interests";
import { Rodo as RodoSectionType } from "@/types/rodo"
import { Settings } from "@/types/settings"
import { useSearchParams } from "next/navigation"
import PersonalDataSection from "./PersonalDataSection";
import ExperienceSection from "./ExperienceSection";
import EducationSection from "./EducationSection";
import SkillsSection from "./SkillSection";
import LanguagesSection from "./LanguagesSection";
import CertificatesSection from "./CertificatesSection";
import InterestsSection from "./IntrestsSection";
import CustomSection from "./CustomSection";
import RodoSection from "./RODOSection";
import Button from "../ui/Button";
import ResumePreview from "./ResumePreview";
import Capsule from "./Capsule";

type ResumeEditorProps = {
    isAuthenticated: boolean;
    avatarUrl: string | null;
    initials: string | null;
    userFirstName: string | null;
    userLastName: string | null;
    jobTitle: string | null;
    email: string | null;
    phone: string | null;
}

export default function ResumeEditor({ isAuthenticated, avatarUrl, initials, userFirstName, userLastName, jobTitle, email, phone }: ResumeEditorProps) {
    const tCvBuilderSteps = useTranslations("BuilderSteps")
    const tCvBuilder = useTranslations("Builder")
    const tButton = useTranslations("Button")

    const searchParams = useSearchParams()
    const template = searchParams.get('template')

    const iconStyles = "w-7 h-7"

    const STEPS = [
        {key: "personalData", name: tCvBuilderSteps("personalData"), icon: <User2 className={iconStyles} />},
        {key: "experience", name: tCvBuilderSteps("experience"), icon: <BriefcaseBusiness className={iconStyles} />},
        {key: "education", name: tCvBuilderSteps("education"), icon: <GraduationCap className={iconStyles} />},
        {key: "skills", name: tCvBuilderSteps("skills"), icon: <Wrench className={iconStyles} />},
        {key: "languages", name: tCvBuilderSteps("languages"), icon: <Languages className={iconStyles} />},
        {key: "certificates", name: tCvBuilderSteps("certificates"), icon: <Award className={iconStyles} />},
        {key: "interests", name: tCvBuilderSteps("interests"), icon: <Heart className={iconStyles} />},
        {key: "rodo", name: tCvBuilderSteps("rodo"), icon: <ShieldCheck className={iconStyles} />},
        {key: "addSection", name: tCvBuilderSteps("addSection"), icon: <Plus className={iconStyles} />},
    ]

    const [currentStep, setCurrentStep] = useState("personalData")
    const [selectedFile, setSelectedFile] = useState<File | null>(null)
    const [isEditingMode, setIsEditingMode] = useState(false)
    const [viewMode, setViewMode] = useState<Settings["skillsType"]>("categories")

    const [data, setData] = useState<ResumeData>({
        personalInfo: {
            avatarUrl: avatarUrl || null,
            firstName: userFirstName || "",
            lastName: userLastName || "",
            jobTitle: jobTitle || "",
            phone: phone || "",
            email: email || ""
        } as PersonalInfo,
        experience: [] as ExperienceItem[],
        education: [] as EducationItem[],
        skillsCat: [] as SkillsCategory[],
        languages: [] as LanguagesItem[],
        certificates: [] as Certificates[],
        interests: [] as Interests[],
        customSection: [] as CustomSectionType[],
        rodoSection: [{
            id: crypto.randomUUID(),
            type: "standard",
            value: tCvBuilder("rodoStandardClauseText"),
            company: ""
        }] as RodoType[],
        settings: {
            skillsType: viewMode,
            showSkillsLevel: false,
            showLanguageLevel: false,
            template: template
        } as Settings
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
                return <SkillsSection settings={data.settings} categories={data.skillsCat} viewMode={viewMode} setViewMode={setViewMode} onSkillsChange={(newItems) => handleSectionChange("skillsCat", newItems)} onSettingsChange={(newValue) => handleSectionChange("settings", newValue)} />
            case "languages":
                return <LanguagesSection languages={data.languages} onLanguageChange={(newItems) => handleSectionChange("languages", newItems)} setIsEditingMode={setIsEditingMode} />
            case "certificates":
                return <CertificatesSection certificates={data.certificates} onCertificatesChange={(newItems) => handleSectionChange("certificates", newItems)} setIsEditingMode={setIsEditingMode} />
            case "interests":
                return <InterestsSection interests={data.interests} onCertificatesChange={(newItems) => handleSectionChange("interests", newItems)} setIsEditingMode={setIsEditingMode} />
            case "addSection":
                return <CustomSection sections={data.customSection} onSectionChange={(newItems: CustomSectionType[]) => handleSectionChange("customSection", newItems)} setIsEditingMode={setIsEditingMode} />
            case "rodo":
                return <RodoSection rodo={data.rodoSection} onRodoChange={(newItems: RodoSectionType[]) => handleSectionChange("rodoSection", newItems)} />
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
            <div className="p-4 flex overflow-y-hidden border-b border-border gap-4 xl:flex-col xl:border-r xl:py-10 xl:w-75">
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

            <ResumePreview template={template} data={data} />
        </div>
    )
}