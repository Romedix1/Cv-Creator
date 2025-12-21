"use client"

import { useTranslations } from "next-intl";
import Image from "next/image";
import { ChangeEvent, Dispatch, SetStateAction, useRef, useState } from "react";
import PlusIcon from "../icons/PlusIcon";

type AvatarUploadProps = {
    uid: string,
    avatarUrl: string | null;
    uploadedAvatarUrl: string | null;
    initials: string;
    setUploadedAvatarUrl: Dispatch<SetStateAction<string | null>>;
    setSelectedFile: Dispatch<SetStateAction<File | null>>;
}

export default function AvatarUpload({ uid, avatarUrl, uploadedAvatarUrl, initials, setUploadedAvatarUrl, setSelectedFile }: AvatarUploadProps) {
    const tSettings = useTranslations("Dashboard.Settings")
    const tValidation = useTranslations("Validation")

    const fileInputRef = useRef<HTMLInputElement>(null)

    const [uploadError, setUploadError] = useState<string | null>(null)

    const uploadAvatar = (event: ChangeEvent<HTMLInputElement>) => {
        try {
            setUploadError(null)

            if (!event.target.files || event.target.files.length === 0) {
                return
            }

            const file = event.target.files[0]

            if(file.size > 2 * 1024 * 1024) {
                setUploadError(tValidation("fileTooBig"))
                if (fileInputRef.current) fileInputRef.current.value = ""
                return
            }

            setSelectedFile(file)

            const localAvatarUrl = URL.createObjectURL(file)
            setUploadedAvatarUrl(localAvatarUrl)
        } catch (error) {
            setUploadError(tValidation("uploadPreviewError"))
        }
    }

    const handleRemove = (e: React.MouseEvent) => {
        e.preventDefault()
        setUploadedAvatarUrl(avatarUrl)
        setSelectedFile(null)
        setUploadError(null)
        if (fileInputRef.current) fileInputRef.current.value = ""
    }

    return (
        <div>
            <div className="flex items-center gap-6">
                {uploadedAvatarUrl ? (
                    <div className="relative">
                        <div className="relative w-[60px] h-[60px] shrink-0 overflow-hidden rounded-full border border-border">
                            <Image priority referrerPolicy="no-referrer" src={uploadedAvatarUrl || ""} alt={tSettings("userProfileAlt")} fill className="object-cover" />
                        </div>

                        {uploadedAvatarUrl !== avatarUrl && (
                            <button onClick={handleRemove} className="absolute -top-1 -right-1 bg-error rounded-full p-0.5 w-5 h-5 flex items-center justify-center hover:bg-error/60 z-10 duration-200 cursor-pointer">
                                <PlusIcon className="rotate-45" />
                            </button>
                        )}
                    </div>
                ) : (
                    <div className="w-15 h-15 rounded-full bg-surface-hover flex justify-center items-center hover:border-border">
                        <p className="text-text-main font-bold select-none hover:text-default-hover">{initials}</p>
                    </div>
                )}

                <label htmlFor="avatar" className={`cursor-pointer rounded-md text-sm hover:text-default duration-200 md:text-[18px] `}>{tSettings("changeAvatar")}</label>

                <input ref={fileInputRef} style={{ visibility: "hidden", position: "absolute" }} type="file" id="avatar" accept="image/*" onChange={uploadAvatar} />
            </div>
            {uploadError && <p className="text-error mt-6">{uploadError}</p>}
        </div>
    )
}