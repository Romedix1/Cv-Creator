"use client"

import { ChangeEvent, FormEvent, useState } from "react"
import { useTranslations } from "next-intl"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import Input from "@/components/ui/Input"
import Button from "@/components/ui/Button"
import AvatarUpload from "@/components/AvatarUpload"
import { cn } from "@/lib/utils"

type PersonalDataProps = {
    isAuthenticated: boolean;
    uid: string;
    firstName: string;
    lastName: string;
    jobTitle: string | null;
    email: string;
    phone: string | null;
    avatarUrl: string;
    initials: string;
}

export default function PersonalDataSection({ isAuthenticated, uid, firstName, lastName, avatarUrl, jobTitle, email, phone, initials }: PersonalDataProps) {
    const tSettings = useTranslations("Dashboard.Settings")
    const tInputs = useTranslations("Inputs")
    const tValidation = useTranslations("Validation")

    const router = useRouter()

    const [formData, setFormData] = useState({
        firstName: firstName || "",
        lastName: lastName || "",
        jobTitle: jobTitle || "",
        email: email || "",
        phone: phone || ""
    })

    const [uploadedAvatarUrl, setUploadedAvatarUrl] = useState<string | null>(avatarUrl || null)
    const [selectedFile, setSelectedFile] = useState<File | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)

    const isEmailChanged = formData.email !== email

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsLoading(true)
        setMessage(null)

        const supabase = createClient()

        const submitData = new FormData(e.currentTarget)
        const updates: Record<string, unknown> = {}

        const newFirstName = submitData.get("firstName")?.toString().trim()
        const newLastName = submitData.get("lastName")?.toString().trim()
        const newJobTitle = submitData.get("jobTitle")?.toString().trim()
        const newEmail = submitData.get("email")?.toString().trim()
        const newPhone = submitData.get("phone")?.toString().trim()

        if (newFirstName && newFirstName !== (firstName || "")){
            updates.first_name = newFirstName
        }
        if (newLastName && newLastName !== (lastName || "")){
            updates.last_name = newLastName
        }
        if (newJobTitle !== undefined && newJobTitle !== (jobTitle || "")) {
            updates.job_title = newJobTitle
        }
        if (newEmail && newEmail !== (email || "")) {
            updates.email = newEmail
        }
        if (newPhone !== undefined && newPhone !== (phone || "")) {
            updates.phone = newPhone
        }

        try {
            if(selectedFile) {
                const filePath = `${uid}/profile_avatar`

                const { error: uploadError } = await supabase.storage.from("avatars").upload(filePath, selectedFile,{ upsert: true, cacheControl: "0", contentType: selectedFile.type })

                if (uploadError) {
                    throw uploadError
                }

                const { data: { publicUrl } } = supabase.storage.from("avatars").getPublicUrl(filePath)

                updates.avatar_url = `${publicUrl}?t=${Date.now()}`
            }

            if (Object.keys(updates).length === 0) {
                setIsLoading(false)
                return
            }

            const { error: updateError } = await supabase.from("profiles").update(updates).eq("id", uid)

            if (updateError) {
                throw updateError
            }

            setMessage({ type: 'success', text: tSettings("dataUpdated")})
            setSelectedFile(null)
            router.refresh()
        } catch {
            setMessage({ type: 'error', text: tValidation("genericSaveError")})
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <h3 className="text-[20px] font-semibold">{tSettings("dataHeader")}</h3>

            <AvatarUpload isAuthenticated={isAuthenticated} avatarUrl={avatarUrl} uploadedAvatarUrl={uploadedAvatarUrl} initials={initials} setUploadedAvatarUrl={setUploadedAvatarUrl} setSelectedFile={setSelectedFile} />

            <div className="flex flex-col gap-5 md:grid md:grid-cols-2">
                <Input name="firstName" type="text" label={tInputs("firstNameLabel")} value={formData.firstName ||  ""} onChange={handleInputChange}/>
                <Input name="lastName" type="text" label={tInputs("lastNameLabel")} value={formData.lastName ||  ""} onChange={handleInputChange}/>
                <Input name="jobTitle" type="text" label={tInputs("jobTitleLabel")} value={formData.jobTitle ||  ""} onChange={handleInputChange}/>
                <div className="flex flex-col gap-1">
                    <Input name="email" type="email" label={tInputs("emailLabel")} value={formData.email ||  ""} onChange={handleInputChange}/>
                    {isEmailChanged && (
                        <div className="bg-error/40 text-text-main p-2 rounded-md border border-error mt-2 flex gap-2 items-start">
                            <p>{tSettings("emailNotice")}</p>
                        </div>
                    )}
                </div>
                <Input name="phone" type="phone" label={tInputs("phoneLabel")} value={formData.phone || ""} className="md:col-span-2" onChange={handleInputChange} />
            </div>

            {message && <p className={cn("font-semibold", message.type === "success" ? "text-success" : "text-error")}>{message.text}</p>}

            <div className="flex w-full md:justify-end">
                <Button disabled={isLoading} type="submit" variant="primary" text={tSettings("saveChangesBtn")} className="mt-6 w-full md:w-[300px]" />
            </div>
        </form>
    )
}
