"use client"

import { useEffect, useRef, useState } from "react"
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
import { Award, BriefcaseBusiness, FileText, GraduationCap, Heart, Languages, Plus, ShieldCheck, User2, Wrench } from "lucide-react";
import { Interests } from "@/types/interests";
import { Rodo as RodoSectionType } from "@/types/rodo"
import { Settings } from "@/types/settings"
import { redirect } from "next/navigation"
import PersonalDataSection from "./PersonalDataSection";
import ExperienceSection from "./ExperienceSection";
import EducationSection from "./EducationSection";
import SkillsSection from "./SkillSection";
import LanguagesSection from "./LanguagesSection";
import CertificatesSection from "./CertificatesSection";
import InterestsSection from "./IntrestsSection";
import CustomSection from "./CustomSection";
import RodoSection from "./RODOSection";
import ResumePreview from "./ResumePreview";
import Capsule from "./Capsule";
import SummarySection from "./SummarySection";
import { DEFAULT_SECTION_ORDER } from "@/lib/constants";
import { useDebounce } from "@/hooks/useDebounce";
import { createClient } from "@/lib/supabase/client";
import { useResume } from "@/context/ResumeContext";
import { toJpeg } from "html-to-image";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/utils";

type ResumeEditorProps = {
    initialData: ResumeData | null;
    resumeId: string;
    template: string;
    isAuthenticated: boolean;
    avatarUrl: string | null;
    initials: string | null;
    userFirstName: string | null;
    userLastName: string | null;
    jobTitle: string | null;
    email: string | null;
    phone: string | null;
}

export default function ResumeEditor({ initialData, resumeId, template, isAuthenticated, avatarUrl, initials, userFirstName, userLastName, jobTitle, email, phone }: ResumeEditorProps) {
    const tCvBuilderSteps = useTranslations("BuilderSteps")
    const tCvBuilder = useTranslations("Builder")
    const tBuilderNav = useTranslations("BuilderNav")
    const tButton = useTranslations("Button")
    const tError = useTranslations("Errors")

    if (!resumeId) redirect("/")

    const isFirstRender = useRef(true)

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
        {key: "summary", name: tCvBuilderSteps("summary"), icon: <FileText className={iconStyles} />},
        {key: "addSection", name: tCvBuilderSteps("addSection"), icon: <Plus className={iconStyles} />},
    ]

    const [currentStep, setCurrentStep] = useState("personalData")
    const [selectedFile, setSelectedFile] = useState<File | null>(null)
    const [isEditingMode, setIsEditingMode] = useState(false)
    const [viewMode, setViewMode] = useState<Settings["skillsType"]>("categories")

    const { title, setIsSaving, setSaveError } = useResume()

    const previewRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!isAuthenticated) {
            const localData = localStorage.getItem(`guest_resume_${resumeId}`);
            if (localData) {
                try {
                    setData(JSON.parse(localData));
                } catch {
                    console.error("Cookies error");
                }
            }
        }
    }, [isAuthenticated, resumeId]);

    const [data, setData] = useState<ResumeData>(initialData ? initialData : {
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
            template: template,
            color: "",
            sectionOrder: DEFAULT_SECTION_ORDER,
            resumeId: resumeId,
        } as Settings
    })

    const handleSectionChange = <K extends keyof ResumeData>(sectionKey: K, newValue: ResumeData[K]) => {
        setData((prev) => ({ ...prev, [sectionKey]: newValue }))
    }

    const handleSettingChange = (field: keyof Settings, value: string) => {
        setData((prev) => ({ ...prev, settings: {...prev.settings, [field]: value }}))
    }

    const debouncedData = useDebounce(data, 1500)
    const debouncedTitle = useDebounce(title, 1500)

    const supabase = createClient()

    useEffect(() => {
        if (isFirstRender.current) return

        setIsSaving(true)
    }, [data, title, setIsSaving])

    useEffect(() => {
        const saveData = async () => {
            if (isFirstRender.current) {
                isFirstRender.current = false
                return
            }

            if (!resumeId) return

            setSaveError(null)

            if (!isAuthenticated) {
                try {
                    localStorage.setItem(`guest_resume_${resumeId}`, JSON.stringify(debouncedData))
                    localStorage.setItem(`guest_title_${resumeId}`, title)
                } catch {
                    console.error("Local storage is full or disabled")
                } finally {
                    setIsSaving(false)
                }
            } else {
                try {
                    const { data: { user } } = await supabase.auth.getUser()
                    if (!user) return

                    const { error } = await supabase.from('resumes').upsert({ id: resumeId, content: debouncedData, template: debouncedData.settings.template, title: debouncedTitle || tBuilderNav("documentName"), user_id: user.id, updated_at: new Date().toISOString() })

                    if (error) {
                        if (error.message.includes("LIMIT_REACHED")) {
                            window.location.href = "/dashboard?error=limit_reached"
                            return
                        }

                        setSaveError(tError("saving"))
                        throw error
                    }
                } catch {
                    console.error("Saving error")
                } finally {
                    setTimeout(() => setIsSaving(false), 500)
                }
            }
        }

        saveData()
    }, [debouncedData, debouncedTitle])

    useEffect(() => {
        const uploadImage = async () => {
            if (!selectedFile || typeof selectedFile === 'string' || !resumeId) return

            if (!isAuthenticated) {
                const reader = new FileReader()
                reader.onloadend = () => {
                    const base64String = reader.result as string

                    handleSectionChange("personalInfo", { ...data.personalInfo, avatarUrl: base64String })

                    setSelectedFile(null)
                }

                reader.readAsDataURL(selectedFile)
                return
            }

            setIsSaving(true)
            try {
                const { data: { user } } = await supabase.auth.getUser()
                if (!user) return

                const filePath = `${user.id}/${resumeId}/avatar/avatar`

                const { error: uploadError } = await supabase.storage.from('cv-images').upload(filePath, selectedFile, { upsert: true, cacheControl: "0", contentType: selectedFile.type })

                if (uploadError) throw uploadError

                const { data: { publicUrl } } = supabase.storage.from('cv-images').getPublicUrl(filePath)

                const freshUrl = `${publicUrl}?t=${Date.now()}`

                setData(prev => ({...prev, personalInfo: { ...prev.personalInfo, avatarUrl: freshUrl }}))
            } catch {
                console.error("Uploading error")
            } finally {
                setSelectedFile(null)
            }
        }

        uploadImage()
    }, [selectedFile, resumeId, isAuthenticated, supabase])

    const isCapturing = useRef(false)

    const updatePreviewImage = async () => {
        if (isCapturing.current || !previewRef.current || !resumeId || !isAuthenticated) return

        try {
            isCapturing.current = true

            const { data: { user } } = await supabase.auth.getUser()
            if (!user) return

            const dataUrl = await toJpeg(previewRef.current, { quality: 0.9,  pixelRatio: 3, style: { transform: "scale(1)", transformOrigin: "top left" }, backgroundColor: "#ffffff", cacheBust: true, includeQueryParams: true, fetchRequestInit: { cache: "no-cache" }})

            const res = await fetch(dataUrl)
            const blob = await res.blob()

            const file = new File([blob], "preview.jpg", { type: "image/jpeg" })

            const filePath = `${user.id}/${resumeId}/preview/preview.jpg`

            const { error: uploadError } = await supabase.storage.from("cv-images").upload(filePath, file, { upsert: true, cacheControl: "0" })

            if (uploadError) throw uploadError

            const { data: { publicUrl } } = supabase.storage.from("cv-images").getPublicUrl(filePath)

            const freshUrl = `${publicUrl}?t=${Date.now()}`

            await supabase.from('resumes').update({ preview_url: freshUrl }).eq('id', resumeId)
        } catch {
            console.error("Snapshot error")
        } finally {
            isCapturing.current = false
        }
    }

    useEffect(() => {
        if (!resumeId || !isAuthenticated) return

        const timer = setTimeout(() => {
            updatePreviewImage()
        }, 200)

        return () => clearTimeout(timer)
    }, [currentStep, resumeId, isAuthenticated])

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
            case "rodo":
                return <RodoSection rodo={data.rodoSection} onRodoChange={(newItems: RodoSectionType[]) => handleSectionChange("rodoSection", newItems)} />
            case "summary":
                const customIds = data.customSection.map(s => s.id)
                const syncedOrder = [...data.settings.sectionOrder, ...customIds.filter(id => !data.settings.sectionOrder.includes(id))]

                return <SummarySection sections={syncedOrder} onSectionsOrderChange={(newOrder: string[]) => handleSectionChange("settings", {...data.settings, sectionOrder: newOrder})} customSections={data.customSection} onTemplateChange={(newValue) => handleSettingChange("template", newValue)} onColorChange={(newValue) => handleSettingChange("color", newValue)} template={data.settings.template} color={data.settings.color}/>
            case "addSection":
                return <CustomSection sections={data.customSection} template={data.settings.template} onSectionChange={(newItems: CustomSectionType[]) => handleSectionChange("customSection", newItems)} setIsEditingMode={setIsEditingMode} />
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
                        <Button variant="secondary" className={cn("w-full", STEPS.findIndex(link => link.key === currentStep) === 0 ? "invisible pointer-events-none transition-none" : "")} text={tButton("prevBtn")} onClick={() => handlePrevButton(currentStep)} />
                        <Button variant="primary" className="w-full" text={tButton("nextBtn")} onClick={() => handleNextButton(currentStep)} />
                    </div>
                )}
            </div>

            <ResumePreview previewRef={previewRef} data={data} template={data.settings.template} />
        </div>
    )
}