"use client";

import { useState, ReactNode } from "react"
import EyeIcon from "@/components/icons/EyeIcon";
import EyeSlashIcon from "@/components/icons/EyeSlashIcon";

type SelectOption = {
    label: string;
    value: string;
}

type InputProps = {
    name: string;
    label: string;
    type: "text" | "password" | "select";
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    placeholderValue?: string;
    showPasswordIcon?: ReactNode;
    className?: string;
    inputClassName?: string;
    error?: string;
    options?: SelectOption[];
    disabled?: boolean;
}

export default function Input({ name, label, type, value, placeholderValue, showPasswordIcon, className, error, onChange, options = [], disabled, inputClassName }: InputProps) {
    const [showPassword, setShowPassword] = useState(false);

    const isPasswordType = type === "password";
    const currentType = isPasswordType ? (showPassword ? "text" : "password") : type;
    const isSelectType = type === "select";

    const baseStyles = `w-full p-3 bg-bg-main border border-border rounded-xl placeholder:text-text-muted outline-none duration-200 hover:border-text-muted focus:border-default appearance-none`;

    const errorId = `${name}-error`;

    return (
        <div className={`flex flex-col gap-2 w-full ${className}`}>
            <label htmlFor={name} className="text-text-main text-[14px] font-medium">{label}</label>

            <div className="relative flex items-center">
                {isSelectType ? (
                    <div className="relative w-full">
                        <select id={name} name={name} value={value} onChange={onChange} className={`${baseStyles} pr-10 cursor-pointer`}>
                            {options.map((opt) => (
                                <option key={opt.value} value={opt.value}>
                                    {opt.label}
                                </option>
                            ))}
                        </select>

                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-text-muted">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                            </svg>
                        </div>
                    </div>
                ) : (
                    <>
                        <input id={name} disabled={disabled} onChange={onChange} value={value} name={name} className={`w-full p-3 bg-bg-main border border-border rounded-xl placeholder:text-text-muted outline-none duration-200 hover:border-text-muted focus:border-default ${showPasswordIcon ? "pl-12" : ""}${isPasswordType ? "pr-12" : ""} ${inputClassName}`} type={currentType} placeholder={placeholderValue}  />

                        {isPasswordType && (
                            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 text-text-muted hover:text-text-main duration-200 cursor-pointer">
                                {showPassword ? (
                                    <EyeIcon className="w-6 h-6" />
                                ) : (
                                    <EyeSlashIcon className="w-6 h-6" />
                                )}
                            </button>
                        )}
                    </>
                )}
            </div>
            {error && (
                <span role="alert" id={errorId} className="text-xs text-error mt-1">{error}</span>
            )}
        </div>
    )
}