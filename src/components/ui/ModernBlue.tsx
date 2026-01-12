import { ResumeData } from "@/types/resumeData";
import { Separator } from "@radix-ui/react-separator";
import { AtSign, Dot, Globe, Phone } from "lucide-react";
import { useTranslations } from "next-intl";
import { Inter } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { FaBehance, FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa6";
import { PiAddressBook } from "react-icons/pi";

const inter = Inter({
    subsets: ["latin"],
});

export default function ModernBlue({ data }: { data: ResumeData }) {
    const tTemplate = useTranslations("Template")
    const tAlt = useTranslations("ImgAlt")

    const getLinkIcon = (platform: string) => {
        switch(platform) {
            case "linkedin":
                return <FaLinkedin className="w-3 h-3" />
            case "github":
                return <FaGithub className="w-3 h-3" />
            case "website":
                return <Globe className="w-3 h-3" />
            case "behance":
                return <FaBehance className="w-3 h-3" />
            case "twitter":
                return <FaTwitter className="w-3 h-3" />
            case "other":
                return <Globe className="w-3 h-3" />
            default:
                return <Globe className="w-3 h-3" />
        }
    }

    const showContactSection = data.personalInfo.phone || data.personalInfo.email || data.personalInfo.address || (data.personalInfo.links && data.personalInfo.links.length > 0);

    return (
        <div className={`bg-white flex ${inter.className} w-full text-black`}>
            {/* LEFT */}
            <div className="p-6 bg-[#EFF6FF] w-50 shrink-0 flex flex-col items-center gap-8 min-h-210.5">
                <Image src={data.personalInfo.avatarUrl || ""} alt={tAlt("userImage")} width={100} height={100} className="rounded-full w-25 h-25 object-cover"/>

                {/* CONTACT */}
                {showContactSection && (
                    <div className="flex flex-col items-center gap-3">
                        <h2 className="text-[12px]">{tTemplate("contactHeader")}</h2>
                        <ul className="text-[10px] gap-2 flex flex-col">
                            {data.personalInfo.phone && <li className="flex gap-2 items-center break-all"><span className="shrink-0"><Phone className="w-3 h-3" /></span> {data.personalInfo.phone}</li>}
                            {data.personalInfo.email && <li className="flex gap-2 items-center break-all"><span className="shrink-0"><AtSign className="w-3 h-3" /></span> {data.personalInfo.email}</li>}
                            {data.personalInfo.address && <li className="flex gap-2 items-center break-all"><span className="shrink-0"><PiAddressBook className="w-3 h-3" /></span> {data.personalInfo.address}</li>}
                            {data.personalInfo.links?.map((link) => {
                                return (
                                    <li key={link.id} className="flex gap-2 items-center break-all"><span className="shrink-0">{getLinkIcon(link.platform)}</span> <Link href={link.url} className="break-all underline">{link.url}</Link></li>
                                )
                            })}
                        </ul>
                    </div>
                )}

                {/* SKILLS */}
                {data.skillsCat.length > 0 &&  (
                    <div className="flex flex-col items-center gap-3 w-full">
                        <h2 className="text-[12px]">{tTemplate("skillsHeader")}</h2>

                        <div className="text-[11px] w-full">
                            {data.skillsType === "categories" ? (
                                <div className="flex flex-col items-start gap-3">
                                    {data.skillsCat.map((cat) => (
                                        <div key={cat.id} className="w-full flex flex-col gap-3">
                                            <h3 className="font-bold text-[10px] wrap-break-word">{cat.name}:</h3>

                                            <ul className="flex flex-col gap-2">
                                                {cat.skills.map((skill) => (
                                                    <li key={skill.id} className="bg-white px-2 py-1 rounded-[6px] wrap-break-word">{skill.name}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <ul className="flex flex-col gap-2">
                                    {data.skillsCat.flatMap(cat => cat.skills).map((skill) => (
                                        <li key={skill.id} className="bg-white px-2 py-1 rounded-[6px] wrap-break-word">{skill.name}</li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>
                )}
                {/* LANGUAGES */}
                {data.languages.length > 0 && (
                    <div className="flex flex-col items-center gap-3 w-full">
                        <h2 className="text-[12px]">{tTemplate("languagesHeader")}</h2>

                        <div className="text-[11px] w-full">
                            <ul className="flex flex-col gap-2">
                                {data.languages.map((language) => (
                                    <li key={language.id} className="bg-white px-2 py-1 rounded-[6px] wrap-break-word">{language.value} - <span className="font-bold">{language.level}</span></li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )}
                {/* CUSTOM */}
                {data.customSection.map((section) => (section.layout === "left" && section.type === "list") && (
                    <div key={section.id} className="flex flex-col items-center gap-3 w-full min-w-0">
                        <h2 className="text-[12px] wrap-break-word w-full">{section.title}</h2>

                        <div className="text-[11px] w-full">
                            <ul className="flex flex-col gap-2">
                                {section.items.map((secItem) => {
                                    if (secItem.title) {
                                        return (
                                            <div key={secItem.id} className="w-full flex flex-col gap-3">
                                                <h3 className="font-bold text-[10px] wrap-break-word">{secItem.title}:</h3>
                                                <ul className="flex flex-col gap-2">
                                                    {secItem.elements?.map((element) => (
                                                        <li key={element.id} className="bg-white px-2 py-1 rounded-[6px] wrap-break-word">{element.value}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        );
                                    }
                                    return (
                                        <ul key={secItem.id} className="flex flex-col gap-2">
                                            {secItem.elements?.map((element) => (
                                                <li key={element.id} className="bg-white px-2 py-1 rounded-[6px] wrap-break-word">{element.value}</li>
                                            ))}
                                        </ul>
                                    );
                                })}
                            </ul>
                        </div>
                    </div>
                ))}
            </div>
            {/* RIGHT */}
            <div className="p-8 flex-1 min-w-0">
                {/* NAME */}
                {(data.personalInfo.firstName || data.personalInfo.lastName || data.personalInfo.jobTitle) && <div className="mb-6">
                    {(data.personalInfo.firstName || data.personalInfo.lastName) && <h1 className="font-bold text-3xl wrap-break-word">{data.personalInfo.firstName}{data.personalInfo.lastName && ` ${data.personalInfo.lastName}`}</h1>}
                    {data.personalInfo.jobTitle && <p className="font-medium text-default text-[16px] break-all">{data.personalInfo.jobTitle}</p>}
                </div>}
                <div className="flex flex-col gap-8">
                    {/* PROFILE */}
                    {data.personalInfo.profile && (
                        <div>
                            <h2 className="text-text-muted font-bold text-[16px] uppercase mb-2.5">{tTemplate("profileHeader")}</h2>
                            <Separator className="my-2 h-0.5 bg-[#E5E7EB] w-full" />
                            <p className="text-[11px] leading-3.75 wrap-break-word">{data.personalInfo.profile}</p>
                        </div>
                    )}
                    {/* EXPERIENCE */}
                    {data.experience.length > 0 && (
                        <div>
                            <h2 className="text-text-muted font-bold text-[16px] uppercase mb-2.5">{tTemplate("experienceHeader")}</h2>
                            <Separator className="mt-1 mb-2.5 h-0.5 bg-[#E5E7EB] w-full" />
                            <div className="flex flex-col gap-4">
                                {data.experience.map((item) => {
                                    return (
                                        <div key={item.id} className="flex flex-col gap-2.5">
                                            <div>
                                                <div className="flex justify-between items-baseline">
                                                    <h3 className="font-bold text-[13px] text-black wrap-break-word flex-1 min-w-0">{item.position}</h3>
                                                    <span className="text-[10px] text-text-muted font-medium whitespace-nowrap">{item.startDate} - {item.endDate}</span>
                                                </div>
                                                <p className="text-[11px] font-semibold text-default mb-1 wrap-break-word flex-1 min-w-0">{item.company}</p>
                                            </div>

                                            <ul className="list-none gap-1 flex flex-col text-black">
                                                {item.description?.map((descItem) => {
                                                    return (
                                                        <li className="text-[10px] flex items-start justify-items-start" key={descItem.id}><span className="shrink-0"><Dot className="stroke-3 w-4 h-4" /></span><span className="wrap-break-word flex-1 min-w-0">{descItem.value}</span></li>
                                                    )
                                                })}
                                            </ul>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    )}
                    {/* EDUCATION */}
                    {data.education.length > 0 && (
                        <div>
                            <h2 className="text-text-muted font-bold text-[16px] uppercase mb-2.5">{tTemplate("educationHeader")}</h2>
                            <Separator className="mt-1 mb-2.5 h-0.5 bg-[#E5E7EB] w-full" />
                            <div className="flex flex-col gap-4">
                                {data.education.map((item) => {
                                    return (
                                        <div key={item.id} className="flex flex-col gap-1">
                                            <div>
                                                <div className="flex justify-between items-baseline">
                                                    <h3 className="font-bold text-[13px] text-black wrap-break-word flex-1 min-w-0">{item.institution}</h3>
                                                    <span className="text-[10px] text-text-muted font-medium whitespace-nowrap">{item.startDate} - {item.endDate}</span>
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
                        </div>
                    )}
                    {/* CERTIFICATES & COURSES */}
                    {data.certificates.length > 0 && (
                        <div>
                            <h2 className="text-text-muted font-bold text-[16px] uppercase mb-2.5">{tTemplate("certificatesHeader")}</h2>
                            <Separator className="mt-1 mb-2.5 h-0.5 bg-[#E5E7EB] w-full" />
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
                        </div>
                    )}
                    {/* INTERESTS */}
                    {data.interests.length > 0 && (
                        <div>
                            <h2 className="text-text-muted font-bold text-[16px] uppercase mb-2.5">{tTemplate("interestsHeader")}</h2>
                            <Separator className="mt-1 mb-2.5 h-0.5 bg-[#E5E7EB] w-full" />
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
                        </div>
                    )}
                    {/* CUSTOM TEXT */}
                    {data.customSection.map((section) => (section.layout === "center" && section.type === "text") ? (
                        <div key={section.id}>
                            <h2 className="text-text-muted font-bold text-[16px] uppercase mb-2.5 wrap-break-word">{section.title}</h2>
                            <Separator className="mt-1 mb-2.5 h-0.5 bg-[#E5E7EB] w-full" />
                            <div className="flex flex-col gap-4">
                                {section.items.map((item) => {
                                    return (
                                        <div key={item.id} className="flex flex-col gap-1">
                                            <div>
                                                <div className="flex justify-between items-baseline">
                                                    <h3 className="font-bold text-[13px] text-black wrap-break-word flex-1 min-w-0">{item.title}</h3>
                                                    <span className="text-[10px] text-text-muted font-medium whitespace-nowrap">{item.startDate} - {item.endDate}</span>
                                                </div>
                                            </div>

                                            <div className="flex flex-col gap-0.5">
                                                <p className="text-text-muted text-[10px] wrap-break-word min-w-0">{item.description}</p>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    ) : (section.layout === "center" && section.type === "detailed") && (
                        <div>
                            <h2 className="text-text-muted font-bold text-[16px] uppercase mb-2.5 wrap-break-word">{section.title}</h2>
                            <Separator className="mt-1 mb-2.5 h-0.5 bg-[#E5E7EB] w-full" />
                            <div className="flex flex-col gap-4">
                                {section.items.map((item) => {
                                    return (
                                        <div key={item.id} className="flex flex-col gap-2.5">
                                            <div>
                                                <div className="flex justify-between items-baseline">
                                                    <h3 className="font-bold text-[13px] text-black wrap-break-word flex-1 min-w-0">{item.title}</h3>
                                                    <span className="text-[10px] text-text-muted font-medium whitespace-nowrap">{item.startDate} - {item.endDate}</span>
                                                </div>
                                            </div>

                                            <ul className="list-none gap-1 flex flex-col w-full min-w-0">
                                                {item.elements?.map((element) => {
                                                    return (
                                                        <li className={`text-[10px] flex items-start justify-items-start w-full min-w-0 ${element.type ==="label" ? "text-text-muted font-semibold text-[11px]" : "mb-0.5"}`} key={element.id}><span className="flex-1 min-w-0 wrap-break-word">{element.value}</span></li>
                                                    )
                                                })}
                                            </ul>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    )
                )}
                </div>
            </div>
        </div>
    )
}