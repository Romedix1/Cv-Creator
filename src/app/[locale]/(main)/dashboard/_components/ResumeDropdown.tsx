"use client"

import { Copy, Download, LucideIcon, PenSquare, Tag, Trash2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { Separator } from "../ui/separator";
import Link from "next/link";
import { ReactNode, useEffect, useRef, useState, useTransition } from "react";
import RenameTitle from "../../app/[locale]/(main)/dashboard/_components/RenameTitle";
import { copyResume } from "@/actions/resume";
import { toast } from "react-toastify";
import ConfirmDelete from "./ConfirmDelete";
import { cn } from "@/lib/utils";
import { handleDownload } from "@/lib/resume/client";

type ResumeDropdownType = {
    resumeId: string;
    title: string;
    onClose: () => void;
}

type DropdownItemType = {
    onClick?: () => void;
    icon: LucideIcon;
    children: ReactNode;
    className?: string;
}

const DropdownItem = ({ onClick, icon: Icon, children, className = "" }: DropdownItemType) => (
    <button type="button" onClick={onClick} className={cn("flex gap-3 w-full items-center hover:bg-default-hover rounded-[10px] px-1.5 py-1 cursor-pointer duration-200", className)}>
        <Icon size={24} />
        {children}
    </button>
)

export default function ResumeDropdown({ resumeId, title, onClose }: ResumeDropdownType) {
    const tDocuments = useTranslations("Dashboard.MyCVs")
    const [isRenaming, setIsRenaming] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)
    const [isDownloading, setIsDownloading] = useState(false)

    const [isPending, startTransition] = useTransition()

    const menuRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node) && !isRenaming && !isDeleting) {
                onClose()
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [onClose, isRenaming, isDeleting])

    const handleCopy = async () => {
        startTransition(async () => {
            const result = await copyResume(resumeId)

            if (result.success) {
                toast.success(tDocuments("copySuccess"))
            } else {
                toast.error(result.error)
            }
        })
    }

    return (
        <div ref={menuRef} className="absolute right-4 top-16 px-2 py-3 bg-surface-hover border-2 rounded-[8px] flex flex-col gap-2 z-60 animate-in fade-in zoom-in-95 slide-in-from-top-2 duration-300 origin-top-right">
            <Link href={`/cv-builder/${resumeId}`} className="flex gap-3 w-full items-center hover:bg-default-hover rounded-[10px] px-1.5 py-1 cursor-pointer duration-200">
                <PenSquare />
                {tDocuments("edit")}
            </Link>

            <DropdownItem icon={Tag} onClick={() => setIsRenaming(true)}>
                {tDocuments("changeTitle")}
            </DropdownItem>

            <DropdownItem icon={Copy} onClick={handleCopy}>
                {tDocuments("copy")}
            </DropdownItem>

            <DropdownItem icon={Download} onClick={() => handleDownload(resumeId, title, isDownloading, setIsDownloading, tDocuments)}>
                {tDocuments("download")}
            </DropdownItem>

            <Separator />
            <DropdownItem icon={Trash2} onClick={() => setIsDeleting(true)} className="text-error hover:bg-error/30">
                {tDocuments("delete")}
            </DropdownItem>

            {isRenaming && <RenameTitle resumeId={resumeId} setIsRenaming={setIsRenaming} />}
            {isDeleting && <ConfirmDelete resumeId={resumeId} setIsDeleting={setIsDeleting} />}
        </div>
    )
}