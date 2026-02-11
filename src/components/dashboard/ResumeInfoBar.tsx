"use client"

import { useState } from "react";
import { BiDotsVerticalRounded } from "react-icons/bi";
import ResumeDropdown from "./ResumeDropdown";

type ResumeInfobarType = {
    resumeId: string;
    title: string;
    lastEdited: string;
}

export default function ResumeInfobar({ resumeId, title, lastEdited }: ResumeInfobarType) {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <>
            <div>
                <h2 className="font-semibold">{title}</h2>
                <p className="text-text-muted">{lastEdited}</p>
            </div>
            <div>
                <BiDotsVerticalRounded className="w-7 h-7 cursor-pointer" onClick={() => setIsOpen((prev) => !prev)} />
            </div>
            {isOpen && <ResumeDropdown resumeId={resumeId} title={title} onClose={() => setIsOpen(false)} />}
        </>
    )
}