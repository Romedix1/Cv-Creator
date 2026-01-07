"use client"

import BinIcon from "@/components/icons/BinIcon";
import PlusIcon from "@/components/icons/PlusIcon";
import AvatarUpload from "@/components/ui/AvatarUpload";
import Button from "@/components/ui/Button";
import ElementAddButton from "@/components/ui/ElementAddButton";
import Input from "@/components/ui/Input";
import SectionHeader from "@/components/ui/SectionHeader";
import { PersonalInfo } from "@/types/personalInfo";
import { SocialLink } from "@/types/socialLink";
import { useTranslations } from "next-intl";
import { Dispatch, SetStateAction } from "react";

type PersonalDataSectionProps = {
    personalData: PersonalInfo;
    onPersonalInfoChange: (newData: PersonalInfo) => void;
    isAuthenticated: boolean;
    initials: string| null;
    setSelectedFile: Dispatch<SetStateAction<File | null>>;
}

const PLATFORM_OPTIONS = [
    { label: "LinkedIn", value: "linkedin" },
    { label: "GitHub", value: "github" },
    { label: "Strona WWW", value: "website" },
    { label: "Behance", value: "behance" },
    { label: "X (Twitter)", value: "twitter" },
    { label: "Inne", value: "other" },
]

export default function PersonalDataSection({ personalData, onPersonalInfoChange, isAuthenticated, initials, setSelectedFile }: PersonalDataSectionProps) {
    const tInput = useTranslations("Inputs")
    const tButton = useTranslations("Button")

    const handleChange = (field: keyof PersonalInfo, value: string | null) => {
        onPersonalInfoChange({ ...personalData, [field]: value })
    }

    const addLink = () => {
        const newLink: SocialLink = {
            id: crypto.randomUUID(),
            platform: "linkedin",
            url: ""
        }

        onPersonalInfoChange({ ...personalData, links: [...(personalData.links || []), newLink] })
    }

    const removeLink = (id: string | number) => {
        const updatedLinks = (personalData.links || []).filter(link => link.id !== id)
        onPersonalInfoChange({ ...personalData, links: updatedLinks })
    }

    const updateLink = (id: string | number, field: "platform" | "url", value: string) => {
        const updatedLinks = (personalData.links || []).map(link => {
            if (link.id === id) {
                return { ...link, [field]: value }
            }
            return link
        })

        onPersonalInfoChange({ ...personalData, links: updatedLinks })
    }

    return (
        <section className="px-3 mt-6 flex flex-col gap-6 sm:px-12 sm:grid sm:grid-cols-2">
            <SectionHeader step="personalData" />

            <AvatarUpload className="col-span-2" isAuthenticated={isAuthenticated} initials={initials} avatarUrl={personalData.avatarUrl} uploadedAvatarUrl={personalData.avatarUrl} setUploadedAvatarUrl={(newUrl) => handleChange("avatarUrl", newUrl)} setSelectedFile={setSelectedFile} />
            <Input onChange={(e) => handleChange("firstName", e.target.value)} name="firstName" label={tInput("firstNameLabel")} value={personalData.firstName || ""} placeholderValue={tInput("firstNameLabel")} type="text" />
            <Input onChange={(e) => handleChange("lastName", e.target.value)} name="lastName" label={tInput("lastNameLabel")} value={personalData.lastName || ""} placeholderValue={tInput("lastNamePlaceholder")} type="text" />
            <Input onChange={(e) => handleChange("jobTitle", e.target.value)} name="jobTitle" label={tInput("jobTitleLabel")} value={personalData.jobTitle || ""} placeholderValue={tInput("jobTitlePlaceholder")} type="text" />
            <Input onChange={(e) => handleChange("phone", e.target.value)} name="phone" label={tInput("phoneLabel")} value={personalData.phone || ""} placeholderValue={tInput("phonePlaceholder")} type="text" />
            <Input onChange={(e) => handleChange("email", e.target.value)} name="email" label={tInput("emailLabel")} value={personalData.email || ""} placeholderValue={tInput("emailPlaceholder")} type="text" />
            <Input onChange={(e) => handleChange("address", e.target.value)} name="address" label={tInput("addressLabel")} value={personalData.address || ""} placeholderValue={tInput("addressPlaceholder")} type="text" />

            <div className="sm:col-span-2">
                <h2 className="text-lg font-semibold my-4">{tInput("linksHeader")}</h2>

                <div className="flex flex-col gap-4">
                    {(personalData.links || []).map((link) => (
                        <div key={link.id} className="flex gap-4 items-end">
                            <div className="w-[120px] sm:w-[180px] shrink-0">
                                <Input name={`platform-${link.id}`} label={tInput("platformLabel")} type="select" value={link.platform} placeholderValue={tInput("platformPlaceholder")} onChange={(e) => updateLink(link.id, "platform", e.target.value)} options={PLATFORM_OPTIONS} />
                            </div>

                            <div className="flex-1">
                                <Input name={`link-${link.id}`} label="Link URL" type="text" value={link.url} placeholderValue="https://..." onChange={(e) => updateLink(link.id, "url", e.target.value)} />
                            </div>

                            <div className="mb-px">
                                <Button onClick={() => removeLink(link.id)} variant="remove" aria-label={`${tButton("deleteLink")} ${link.platform}`} icon={<BinIcon aria-hidden="true" className="w-7 h-7" />} />
                            </div>
                        </div>
                    ))}
                </div>

                <ElementAddButton step={"Link"} onAdd={addLink} />
            </div>
        </section>
    )
}