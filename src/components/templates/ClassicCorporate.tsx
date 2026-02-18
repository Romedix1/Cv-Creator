import { ResumeData } from "@/types/resumeData";
import { Dot } from "lucide-react";
import { useTranslations } from "next-intl";
import { Merriweather } from "next/font/google";
import Link from "next/link";
import { useSectionOrder } from "@/hooks/useSectionOrder";
import SectionHeader from "./shared/SectionHeader";
import { Separator } from "../ui/separator";
import { cn } from "@/lib/utils";
import AppImage from "../ui/AppImage";

const merriweather = Merriweather({
    subsets: ["latin"],
    style: ["normal", "italic"],
});

export default function ClassicCorporate({ data }: { data: ResumeData }) {
    const tTemplate = useTranslations("Template")
    const tAlt = useTranslations("ImgAlt")

    const showContactSection = data.personalInfo.phone || data.personalInfo.email || data.personalInfo.address;

    const contactDetails = [
        data.personalInfo.phone && { id: 'phone', value: data.personalInfo.phone },
        data.personalInfo.email && { id: 'email', value: data.personalInfo.email },
        data.personalInfo.address && { id: 'address', value: data.personalInfo.address }
    ].filter(Boolean) as { id: string; value: string }[];

    const sectionsMap: Record<string, { title: string, isVisible: boolean, content: React.ReactNode, position?: "left" | "center" }> = {
        "contact": {
            title: tTemplate("contactHeader"),
            isVisible: !!showContactSection || !!(data.personalInfo.links && data.personalInfo.links.length > 0),
            content: (
                <>
                    {showContactSection && (
                        <ul className="text-[10px] gap-2 flex justify-center">
                            {contactDetails.map((item: { id: string; value: string; }, index) => (
                                <li key={item.id} className="flex gap-2 items-center break-all">
                                    <span>{item.value}</span>

                                    {index < contactDetails.length - 1 && (
                                        <Dot className="stroke-2" />
                                    )}
                                </li>
                            ))}
                        </ul>
                    )}

                    {data.personalInfo.links && data.personalInfo.links.length > 0 && (
                        <ul className="text-[10px] gap-2 flex justify-center">
                            {data.personalInfo.links.map((link, index) => {
                                return (
                                    <li key={link.id} className="flex gap-2 items-center break-all"><Link href={link.url} className="break-all underline">{link.platform}</Link>{index < (data.personalInfo.links?.length || 0) - 1 && <Dot className="stroke-2"/>}</li>
                                )
                            })}
                        </ul>
                    )}
                </>
            )
        },
        "profile": {
            title: tTemplate("profileHeader"),
            isVisible: !!data.personalInfo.profile,
            content: <p className="text-[11px] leading-3.75 wrap-break-word">{data.personalInfo.profile}</p>
        },
        "experience": {
            title: tTemplate("experienceHeader"),
            isVisible: data.experience && data.experience.length > 0,
            content: (
                <div className="flex flex-col gap-4">
                    {data.experience.map((item) => {
                        return (
                            <div key={item.id} className="flex flex-col gap-2.5">
                                <div>
                                    <div className="flex justify-between items-baseline">
                                        <h3 className="font-bold text-[13px] text-black wrap-break-word flex-1 min-w-0">{item.position}</h3>
                                        <span className="text-[10px] text-text-muted font-medium whitespace-nowrap">{item.startDate} {item.endDate && "-"} {item.endDate}</span>
                                    </div>
                                    <p className="text-[11px] font-semibold text-[#2563EB] mb-1 wrap-break-word flex-1 min-w-0">{item.company}</p>
                                </div>

                                <ul className="list-none gap-1 flex flex-col text-black">
                                    {item.description?.map((descItem) => {
                                        return (
                                            <li className="text-[10px] flex items-start justify-items-start" key={descItem.id}><span className="shrink-0"><Dot className="stroke-2 w-4 h-4" /></span><span className="wrap-break-word flex-1 min-w-0">{descItem.value}</span></li>
                                        )
                                    })}
                                </ul>
                            </div>
                        )
                    })}
                </div>
            )
        },
        "education": {
            title: tTemplate("educationHeader"),
            isVisible: data.education && data.education.length > 0,
            content: (
                <div className="flex flex-col gap-4">
                    {data.education.map((item) => {
                        return (
                            <div key={item.id} className="flex flex-col gap-1">
                                <div>
                                    <div className="flex justify-between items-baseline">
                                        <h3 className="font-bold text-[13px] text-black wrap-break-word flex-1 min-w-0">{item.institution}</h3>
                                        <span className="text-[10px] text-text-muted font-medium whitespace-nowrap">{item.startDate} {item.endDate && "-"} {item.endDate}</span>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-0.5">
                                    <p className="text-text-muted text-[10px] shrink-0">{tTemplate("majorLabel")}: <span className="break-all">{item.major}</span></p>
                                    <p className="text-text-muted text-[10px] shrink-0">{tTemplate("degreeLabel")}: <span className="break-all">{item.degree}</span></p>
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
            content: (
                <div className="text-[11px] w-full">
                    <ul className="flex flex-wrap gap-x-6 gap-y-1.5 justify-start">
                        {data.skillsCat.flatMap(cat => cat.skills).map((skill) => (
                            <li key={skill.id} className="wrap-break-word">{skill.name}</li>
                        ))}
                    </ul>
                </div>
            )
        },
        "languages": {
            title: tTemplate("languagesHeader"),
            isVisible: data.languages.length > 0,
            content: (
                <div className="text-[11px] w-full">
                    <ul className="flex flex-col gap-2">
                        {data.languages.map((language) => (
                            <li key={language.id} className="wrap-break-word">{language.value} - <span className="font-bold">{language.level}</span></li>
                        ))}
                    </ul>
                </div>
            )
        },
        "certificates": {
            title: tTemplate("certificatesHeader"),
            isVisible: data.certificates.length > 0,
            content: (
                <div className="flex flex-col gap-4">
                    {data.certificates.map((item) => {
                        return (
                            <div key={item.id} className="flex flex-col gap-1">
                                <div>
                                    <div className="flex justify-between items-baseline">
                                        <h3 className="font-bold text-[13px] text-black wrap-break-word flex-1 min-w-0">{item.name}</h3>
                                        <span className="text-[10px] text-text-muted font-medium whitespace-nowrap">{item.date}</span>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-0.5">
                                    <p className="text-text-muted text-[10px]">{tTemplate("organizerLabel")}: <span className="break-all">{item.organizer}</span></p>
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
            content: (
                <div className="flex flex-col gap-4">
                    {data.interests.map((item) => {
                        return (
                            <div key={item.id} className="flex flex-col gap-1">
                                <div>
                                    <div className="flex justify-between items-baseline">
                                        <h3 className="font-bold text-[13px] text-black wrap-break-word flex-1 min-w-0">{item.name}</h3>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-0.5">
                                    <p className="text-text-muted text-[10px] wrap-break-word">{item.value}</p>
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
                        (section.layout === "center" && section.type === "detailed") ? (
                            <div className="flex flex-col gap-4">
                                {section.items.map((item) => {
                                    return (
                                        <div key={item.id} className="flex flex-col gap-1">
                                            <div>
                                                <div className="flex justify-between items-baseline">
                                                    <h3 className="font-bold text-[13px] text-black wrap-break-word flex-1 min-w-0">{item.title}</h3>
                                                    <span className="text-[10px] text-text-muted font-medium whitespace-nowrap">{item.startDate} {item.endDate && "-"} {item.endDate}</span>
                                                </div>
                                            </div>

                                            <div className="flex flex-col gap-0.5">
                                                <p className="text-text-muted text-[10px] wrap-break-word min-w-0">{item.description}</p>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        ) : (section.layout === "center" && section.type === "text") && (
                            <div className="flex flex-col gap-4">
                                {section.items.map((item) => {
                                    return (
                                        <div key={item.id} className="flex flex-col gap-2.5">
                                            <div>
                                                <div className="flex justify-between items-baseline">
                                                    <h3 className="font-bold text-[13px] text-black wrap-break-word flex-1 min-w-0">{item.title}</h3>
                                                    <span className="text-[10px] text-text-muted font-medium whitespace-nowrap">{item.startDate} {item.endDate && "-"} {item.endDate}</span>
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
                                    )
                                })}
                            </div>
                        )
                    )
                })()
            }
        }
    })

    const sectionsToRender = useSectionOrder(data, sectionsMap)

    return (
        <div className={cn("bg-white flex flex-col gap-8", merriweather.className, "w-full text-black p-12.5")}>
            {/* NAME */}
            <div className="relative flex justify-center items-start w-full min-h-33.25">
                <div className="flex flex-col gap-2.5 items-center text-center">
                    {(data.personalInfo.firstName || data.personalInfo.lastName) && <h1 className="font-bold text-[32px] uppercase wrap-break-word max-w-61.75">{data.personalInfo.firstName}{data.personalInfo.lastName && ` ${data.personalInfo.lastName}`}</h1>}
                    {data.personalInfo.jobTitle && <p className="font-medium text-[#374151] italic text-[14px] break-all">{data.personalInfo.jobTitle}</p>}

                    <Separator className="mt-1 mb-2.5 h-0.5 bg-[#E5E7EB] w-25" />
                </div>

                {data.personalInfo.avatarUrl && (
                    <div className="absolute right-0 top-0 shrink-0">
                        <AppImage src={data.personalInfo.avatarUrl || ""} alt={tAlt("userImage")} width={400} height={532} quality={100} className="w-full h-full object-cover" containerClassName="w-25 h-33.25 overflow-hidden"/>
                    </div>
                )}
            </div>

            {sectionsToRender.map((section, index) => {
                if (!section) return
                return (
                    <div key={index}>
                        {(section.id !== "contact" && section.position !== "left") && <SectionHeader text={section.title} />}
                        {section.content}
                    </div>
                )
            })}

            {/* CLAUSE */}
            {data.rodoSection.length > 0 && (
                <div className="mt-4">
                    <p className="text-text-muted text-[10px] text-justify leading-tight">
                        {data.rodoSection[0].value}
                    </p>
                </div>
            )}
        </div>
    )
}