import { ResumeData } from "@/types/resumeData";
import { AtSign, Award, Briefcase, Dot, GraduationCap, Heart, Layers, Mail, Phone, Star, User } from "lucide-react";
import { useTranslations } from "next-intl";
import { Inter } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { PiAddressBook } from "react-icons/pi";
import LeftSectionHeader from "./shared/LeftSectionHeader";
import SectionHeader from "./shared/SectionHeader";
import { useSectionOrder } from "@/hooks/useSectionOrder";
import { createLine } from "./shared/TemplateLine";
import { LinkIcon } from "@/app/[locale]/(cv-builder)/cv-builder/[resumeId]/_components/LinkIcon";
import { cn } from "@/lib/utils";

const inter = Inter({
    subsets: ["latin"],
});

export default function CreativeAccent({ data }: { data: ResumeData }) {
    const tTemplate = useTranslations("Template")
    const tAlt = useTranslations("ImgAlt")

    const showContactSection = data.personalInfo.phone || data.personalInfo.email || data.personalInfo.address || (data.personalInfo.links && data.personalInfo.links.length > 0)

    const CenterItemHeader = (text: string) => {
        return <h3 className="font-bold text-[13px] text-black wrap-break-word flex-1 min-w-0">{text}</h3>
    }

    const CenterItemDate = (date: string) => {
        return <span className="text-[10px] text-text-muted font-medium whitespace-nowrap">{date}</span>
    }

    const SectionIcon = (id: string, title: string) => {
        const standardIcons: Record<string, React.ComponentType<{ className?: string }>> = {
            contact: Mail,
            profile: User,
            experience: Briefcase,
            education: GraduationCap,
            certificates: Award,
            interests: Heart,
            skills: Star,
        }

        let Icon = standardIcons[id]

        if (!Icon) {
            const sectionTitle = title.toLowerCase()

            const match = (keywords: string[]) => keywords.some(key => sectionTitle.includes(key))

            if (match(["nagrod", "award", "wyróżn", "achievement", "osiągn", "priz", "sukces"])) {
                Icon = Award
            } else if (match(["hobby", "interest", "zainteresowan", "pasja", "passion", "wolont", "volunt", "charity", "pomoc", "społeczn"])) {
                Icon = Heart
            } else if (match(["kurs", "course", "szkolen", "training", "warsztat", "workshop", "cert"])) {
                Icon = GraduationCap
            } else if (match(["publika", "publicat", "artykuł", "article", "paper"])) {
                Icon = AtSign
            }
            else {
                Icon = Layers
            }
        }
        return Icon ? <Icon className="w-4 h-4 text-[#ffffff]" /> : null
    }

    const userColor = data.settings.color || "#2563EB"

    const sectionsMap: Record<string, { title: string, position: "left" | "center", isVisible: boolean, content: React.ReactNode }> = {
        "contact": {
            title: tTemplate("contactHeader"),
            isVisible: !!showContactSection,
            position: "left",
            content: (
                <ul className="text-[10px] gap-2 flex flex-col">
                    {data.personalInfo.phone && <li className="flex gap-2 items-center break-all"><span className="shrink-0"><Phone className="w-3 h-3" /></span> {data.personalInfo.phone}</li>}
                    {data.personalInfo.email && <li className="flex gap-2 items-center break-all"><span className="shrink-0"><AtSign className="w-3 h-3" /></span> {data.personalInfo.email}</li>}
                    {data.personalInfo.address && <li className="flex gap-2 items-center break-all"><span className="shrink-0"><PiAddressBook className="w-3 h-3" /></span> {data.personalInfo.address}</li>}
                    {data.personalInfo.links?.map((link) => {
                        return (
                            <li key={link.id} className="flex gap-2 items-center break-all"><span className="shrink-0">{<LinkIcon platform={link.platform} />}</span> <Link href={link.url} className="break-all underline">{link.url}</Link></li>
                        )
                    })}
                </ul>
            )
        },
        "profile": {
            title: tTemplate("profileHeader"),
            isVisible: !!data.personalInfo.profile,
            position: "center",
            content: (
                <div className="flex">
                    {createLine(true, userColor)}
                    <p className="text-[11px] leading-3.75 wrap-break-word">{data.personalInfo.profile}</p>
                </div>
            )
        },
        "experience": {
            title: tTemplate("experienceHeader"),
            isVisible: data.experience && data.experience.length > 0,
            position: "center",
            content: (
                <div className="flex flex-col gap-4">
                    {data.experience.map((item, index) => {
                        const isLast = index===data.experience.length-1

                        return (
                            <div key={item.id} className="flex">
                                {createLine(isLast, userColor)}
                                <div key={item.id} className="flex flex-col flex-1 gap-2.5">
                                    <div>
                                        <div className="flex justify-between items-baseline">
                                            {CenterItemHeader(item.position)}
                                            {CenterItemDate(`${item.startDate} ${item.endDate && "-"} ${item.endDate}`)}
                                        </div>
                                        <p className="text-[11px] font-semibold mb-1 wrap-break-word flex-1 min-w-0" style={{ color: userColor }}>{item.company}</p>
                                    </div>

                                    <ul className="list-none gap-1 flex flex-col text-black">
                                        {item.description?.map((descItem) => {
                                            return (
                                                <li className="text-[10px] flex items-start justify-items-start" key={descItem.id}><span className="shrink-0"><Dot className="stroke-3 w-4 h-4" /></span><span className="wrap-break-word flex-1 min-w-0">{descItem.value}</span></li>
                                            )
                                        })}
                                    </ul>
                                </div>
                            </div>
                        )
                    })}
                </div>
            )
        },
        "education": {
            title: tTemplate("educationHeader"),
            isVisible: data.education && data.education.length > 0,
            position: "center",
            content: (
                <div className="flex flex-col gap-4">
                    {data.education.map((item, index) => {
                        const isLast = index===data.education.length-1

                        return (
                            <div key={item.id} className="flex">
                                {createLine(isLast, userColor)}
                                <div className="flex flex-col flex-1 gap-1 w-full">
                                    <div>
                                        <div className="flex justify-between items-baseline">
                                            {CenterItemHeader(item.institution)}
                                            {CenterItemDate(`${item.startDate} ${item.endDate && "-"} ${item.endDate}`)}
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-0.5">
                                        <p className="text-text-muted text-[10px] shrink-0">{tTemplate("majorLabel")}: <span className="break-all">{item.major}</span></p>
                                        <p className="text-text-muted text-[10px] shrink-0">{tTemplate("degreeLabel")}: <span className="break-all">{item.degree}</span></p>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            )
        },
        "skills": {
            title: tTemplate("skillsHeader"),
            isVisible: data.skillsCat && data.skillsCat.length > 0,
            position: "left",
            content: (
                <div className="text-[11px] w-full">
                    {data.settings.skillsType === "categories" ? (
                        <div className="flex flex-col items-start gap-3">
                            {data.skillsCat.map((cat) => (
                                <div key={cat.id} className="w-full flex flex-col gap-3">
                                    <h3 className="font-bold text-[10px] wrap-break-word">{cat.name}:</h3>

                                    <ul className="flex flex-col gap-2 list-disc px-6">
                                        {cat.skills.map((skill) => (
                                            <li key={skill.id} className="rounded-[6px] wrap-break-word">{skill.name}</li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <ul className="flex flex-col gap-2 px-6">
                            {data.skillsCat.flatMap(cat => cat.skills).map((skill) => (
                                <li key={skill.id} className="rounded-[6px] wrap-break-word">{skill.name}</li>
                            ))}
                        </ul>
                    )}
                </div>
            )
        },
        "languages": {
            title: tTemplate("languagesHeader"),
            isVisible: data.languages.length > 0,
            position: "left",
            content: (
                <div className="text-[11px] w-full">
                    <ul className="flex flex-1 flex-col gap-2 list-disc px-3.5">
                        {data.languages.map((language) => (
                            <li key={language.id} className="rounded-[6px] wrap-break-word">{language.value} - <span className="font-bold">{language.level}</span></li>
                        ))}
                    </ul>
                </div>
            )
        },
        "certificates": {
            title: tTemplate("certificatesHeader"),
            isVisible: data.certificates.length > 0,
            position: "center",
            content: (
                <div className="flex flex-col gap-4">
                    {data.certificates.map((item, index) => {
                        const isLast = index===data.certificates.length-1

                        return (
                            <div key={item.id} className="flex">
                                {createLine(isLast, userColor)}
                                <div className="flex flex-col flex-1 gap-1">
                                    <div>
                                        <div className="flex justify-between items-baseline">
                                            {CenterItemHeader(item.name)}
                                            {CenterItemDate(`${item.date}`)}
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-0.5">
                                        <p className="text-text-muted text-[10px]">{tTemplate("organizerLabel")}: <span className="break-all">{item.organizer}</span></p>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            )
        },
        "interests": {
            title: tTemplate("interestsHeader"),
            isVisible: data.interests.length > 0,
            position: "center",
            content: (
                <div className="flex flex-col gap-4">
                    {data.interests.map((item, index) => {
                        const isLast = index===data.interests.length-1

                        return (
                            <div key={item.id} className="flex">
                                {createLine(isLast, userColor)}

                                <div className="flex flex-col gap-1">
                                    <div>
                                        <div className="flex justify-between items-baseline">
                                            {CenterItemHeader(item.name)}
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-0.5">
                                        <p className="text-text-muted text-[10px] wrap-break-word">{item.value}</p>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            )
        }
    }

    data.customSection?.forEach((section) => {
        if (section.items.length > 0) {
            sectionsMap[section.id] = {
                title: section.title,
                isVisible: section.items.length > 0,
                position: section.layout,
                content: (() => {
                    return (
                        (section.type === "text") ? (
                            <div className="flex flex-col gap-4">
                                {section.items.map((item, index) => {
                                    const isLast = index===section.items.length-1

                                    return (
                                        <div key={item.id} className="flex">
                                            {createLine(isLast, userColor)}
                                            <div className="flex flex-col gap-1">
                                                <div>
                                                    <div className="flex justify-between items-baseline">
                                                        {CenterItemHeader(item.title)}
                                                        {CenterItemDate(`${item.startDate} ${item.endDate && "-"} ${item.endDate}`)}
                                                    </div>
                                                </div>

                                                <div className="flex flex-col gap-0.5">
                                                    <p className="text-text-muted text-[10px] wrap-break-word min-w-0">{item.description}</p>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        ) : (section.type === "detailed") ? (
                            <div className="flex flex-col gap-4">
                                {section.items.map((item, index) => {
                                    const isLast = index===section.items.length-1

                                    return (
                                        <div key={item.id} className="flex">
                                            {createLine(isLast, userColor)}
                                        <div className="flex flex-col gap-2.5">
                                            <div>
                                                <div className="flex justify-between items-baseline">
                                                    {CenterItemHeader(item.title)}
                                                    {CenterItemDate(`${item.startDate} ${item.endDate && "-"} ${item.endDate}`)}
                                                </div>
                                            </div>

                                            <ul className="list-none gap-1 flex flex-col w-full min-w-0">
                                                {item.elements?.map((element) => {
                                                    return (
                                                        <li className={cn("text-[10px] flex items-start justify-items-start w-full min-w-0", element.type ==="label" ? "text-text-muted font-semibold text-[11px]" : "mb-0.5")} key={element.id}><span className="flex-1 min-w-0 wrap-break-word">{element.value}</span></li>
                                                    )
                                                })}
                                            </ul>
                                        </div>
                                    </div>
                                    )
                                })}
                            </div>
                        ) : (section.type === "list") && (
                            <div className="text-[11px] w-full">
                                <ul className="flex flex-col gap-4">
                                    {section.items.map((secItem) => (
                                        <li key={secItem.id} className="w-full list-none">
                                            {secItem.title ? (
                                                <div className="flex flex-col gap-3">
                                                    <h3 className="font-bold text-[10px] uppercase wrap-break-word">
                                                        {secItem.title}:
                                                    </h3>
                                                    <ul className="flex flex-col gap-2 list-disc px-6">
                                                        {secItem.elements.map((element) => (
                                                            <li key={element.id} className="wrap-break-word">{element.value}</li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            ) : (
                                                <ul className="flex flex-col gap-2 list-disc pl-5">
                                                    {secItem.elements?.map((element) => (
                                                        <li key={element.id} className="wrap-break-word">
                                                            {element.value}
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )
                    )
                })()
            }
        }
    })

    const sectionsToRender = useSectionOrder(data, sectionsMap)

    return (
        <div className={cn("bg-white flex flex-col", inter.className, "w-full text-black")}>
            {/* TOP */}
            <div className="flex w-full py-11 relative" style={{ background: userColor }}>
                <Image src={data.personalInfo.avatarUrl || ""} alt={tAlt("userImage")} width={100} height={100} className="rounded-full w-30 h-30 object-cover absolute ring-4 ring-white left-6 bottom-0 translate-y-1/2"/>

                {(data.personalInfo.firstName || data.personalInfo.lastName || data.personalInfo.jobTitle) &&
                    <div className="text-left w-full pl-42">
                        {(data.personalInfo.firstName || data.personalInfo.lastName) && <h1 className="font-bold text-3xl wrap-break-word text-white">{data.personalInfo.firstName}{data.personalInfo.lastName && ` ${data.personalInfo.lastName}`}</h1>}
                        {data.personalInfo.jobTitle && <p className="font-medium text-[16px] text-white break-all">{data.personalInfo.jobTitle}</p>}
                    </div>
                }
            </div>
            <div className="flex">
                {/* LEFT */}
                <div className="p-6 pt-25 bg-[#F3F4F6] w-50 shrink-0 flex flex-col items-center gap-8 min-h-210.5">
                    {sectionsToRender.map((section, index) => {
                        if(section.position === "left") {
                            return (
                                <div key={`left-${index}`} className="flex flex-col gap-3 w-full wrap-break-word">
                                    <LeftSectionHeader text={section.title} />
                                    <div className="flex-1 min-w-0 pt-0.5">
                                        {section.content}
                                    </div>
                                </div>
                            )
                        }
                    })}
                </div>
                {/* RIGHT */}
                <div className="p-8 pb-0 pl-6 flex-1 min-w-0">
                    <div className="flex flex-col gap-8">
                        {sectionsToRender.map((section, index) => {
                            if(section.position === "center") {
                                return (
                                    <div key={`center-${index}`}>
                                        <div className="flex">
                                            <div className="flex flex-col items-center w-7 -left-3 shrink-0 relative">
                                                <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: userColor }}>
                                                    {SectionIcon(section.id, section.title)}
                                                </div>

                                                <div className="bg-[#E5E7EB] w-1 z-10 flex-1 -mb-4" />
                                            </div>

                                            <div className="w-full wrap-break-word relative">
                                                <SectionHeader text={section.title} />
                                            </div>
                                        </div>
                                        <div className="ml-2 flex-1 min-w-0">
                                            {section.content}
                                        </div>
                                    </div>
                                )
                            }
                        })}
                    </div>
                </div>
            </div>
            {/* CLAUSE */}
            {data.rodoSection.length > 0 && (
                <div className="mt-4 p-6">
                    <p className="text-text-muted text-[10px] text-justify leading-tight">
                        {data.rodoSection[0].value}
                    </p>
                </div>
            )}
        </div>
    )
}