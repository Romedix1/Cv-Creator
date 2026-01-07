"use client"

import { ReactNode } from "react"

type ToggleOption<T extends string = string> = {
    value: T;
    label: string | ReactNode;
}

type ToggleProps<T extends string = string> = {
    value: T;
    onChange: (value: T) => void;
    options: ToggleOption<T>[];
    name?: string;
    ariaLabel: string;
}

export default function Toggle<T extends string>({ value, onChange, options, name = "toggle-group", ariaLabel }: ToggleProps<T>) {
    const textStyles = "flex items-center justify-center gap-2 w-full px-4 py-1.5 text-xs font-medium rounded-md duration-200 text-text-muted peer-checked:bg-default peer-checked:text-text-main peer-focus-visible:ring-2 peer-focus-visible:ring-default-hover cursor-pointer"

    return (
        <fieldset className="bg-bg-secondary p-1 rounded-lg border border-border flex flex-col sm:flex-row relative w-fit sm:w-full">
            <legend className="sr-only">{ariaLabel}</legend>

            {options.map((option) => (
                <label key={option.value} className="relative flex-1 text-center cursor-pointer">
                    <input type="radio" name={name} value={option.value} checked={value === option.value} onChange={() => onChange(option.value)} className="sr-only peer" />
                    <span className={`${textStyles} ${value !== option.value && "hover:text-text-main hover:bg-default-hover"}`}>
                        {option.label}
                    </span>
                </label>
            ))}
        </fieldset>
    )
}