"use client"

import Input from "../ui/Input"
import Button from "../ui/Button"
import AvatarUpload from "../ui/AvatarUpload"
import { FormEvent, useState } from "react"
import { useTranslations } from "next-intl"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"

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
    const tValidation = useTranslations("Validation")

    const [uploadedAvatarUrl, setUploadedAvatarUrl] = useState<string | null>(avatarUrl || null)
    const [selectedFile, setSelectedFile] = useState<File | null>(null)
    const [emailValue, setEmailValue] = useState<string>(email)
    const [isLoading, setIsLoading] = useState(false)
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)

    const isEmailChanged = emailValue !== email

    const router = useRouter()

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsLoading(true)
        setMessage(null)

        const supabase = createClient()
        const formData = new FormData(e.currentTarget)

        const updates: Record<string, unknown> = {}

        const newFirstName = formData.get("firstName")?.toString().trim()
        const newLastName = formData.get("lastName")?.toString().trim()
        const newJobTitle = formData.get("jobTitle")?.toString().trim()
        const newEmail = formData.get("email")?.toString().trim()
        const newPhone = formData.get("phone")?.toString().trim()

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
                const fileExt = selectedFile.name.split(".").pop()
                const filePath = `${uid}/${crypto.randomUUID()}.${fileExt}`

                const { error: uploadError } = await supabase.storage.from("avatars").upload(filePath, selectedFile)

                if (uploadError) {
                    throw uploadError
                }

                const { data: { publicUrl } } = supabase.storage.from("avatars").getPublicUrl(filePath)

                updates.avatar_url = publicUrl
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
                <Input name="firstName" type="text" label={tSettings("firstNameLabel")} defaultValue={firstName || ""} />
                <Input name="lastName" type="text" label={tSettings("lastNameLabel")} defaultValue={lastName || ""} />
                <Input name="jobTitle" type="text" label={tSettings("jobTitleLabel")} defaultValue={jobTitle || ""} />
                <div className="flex flex-col gap-1">
                    <Input name="email" type="email" label={tSettings("emailLabel")} defaultValue={email || ""} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmailValue(e.target.value)}/>
                    {isEmailChanged && (
                        <div className="bg-error/40 text-text-main p-2 rounded-md border border-error mt-2 flex gap-2 items-start">
                            <p>{tSettings("emailNotice")}</p>
                        </div>
                    )}
                </div>
                <Input name="phone" type="phone" label={tSettings("phoneLabel")} defaultValue={phone || ""} className="md:col-span-2" />
            </div>

            {message && <p className={`font-semibold ${message.type === "success" ? "text-success" : "text-error"}`}>{message.text}</p>}

            <div className="flex w-full md:justify-end">
                <Button variant="primary" text={tSettings("saveChangesBtn")} className="mt-6 w-full md:w-[300px]" />
            </div>
        </form>
    )
}