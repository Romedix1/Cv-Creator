"use client"

import Input from "@/components/ui/Input";
import { useTranslations } from "next-intl";
import { Check } from "lucide-react";
import { ChangeEvent, useId } from "react";

type DateRangeProps = {
    type: "work" | "study" | "other";
    startDate: string | null;
    endDate: string | null;
    onChange: (field: "startDate" | "endDate", value: string) => void;
}

export default function DateRange({ type, startDate, endDate, onChange }: DateRangeProps) {
    const tInput = useTranslations("Inputs")
    const isCurrent = endDate === tInput("current")

    const handleCheckbox = (e: ChangeEvent<HTMLInputElement>) => {
        onChange("endDate", e.target.checked ? tInput("current") : "")
    }

    const id = useId()

    return (
        <>
            <Input type="text" name={`startDate-${id}`} label={tInput("startDateLabel")} value={startDate || ""} onChange={(e) => onChange("startDate", e.target.value)} />

            <div className="flex flex-col">
                <Input disabled={isCurrent} name={`endDate-${id}`} type="text" label={tInput("endDateLabel")} inputClassName={isCurrent ? "opacity-30 bg-text-muted cursor-not-allowed" : ""} value={endDate || ""} onChange={(e) => onChange("endDate", e.target.value)} />

                <div className="flex items-center gap-2 mt-3 relative">
                    <div className="relative flex items-center justify-center w-5 h-5">
                        <input onChange={handleCheckbox} type="checkbox" id={`still-${id}`} className="peer appearance-none w-5 h-5 border border-border rounded bg-bg-main cursor-pointer duration-200 checked:bg-default hover:border-default-hover"/>
                        <div className="absolute pointer-events-none opacity-0 peer-checked:opacity-100 text-text-main duartion-200">
                            <Check size={14} strokeWidth={3} />
                        </div>
                    </div>

                    <label htmlFor={`still-${id}`} className="text-sm text-text-muted cursor-pointer select-none hover:text-text-main duration-200">
                        {type === "study" ? tInput("stillStudying") : type === "work" ? tInput("stillWorking") : tInput("untilNow")}
                    </label>
                </div>
            </div>
        </>
    )
}