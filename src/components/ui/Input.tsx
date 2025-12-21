"use client";

import { useState, ReactNode } from "react"
import EyeIcon from "@/components/icons/EyeIcon";
import EyeSlashIcon from "@/components/icons/EyeSlashIcon";

type InputProps = {
    name: string;
    label: string;
    type: string;
    defaultValue?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholderValue?: string;
    showPasswordIcon?: ReactNode;
    className?: string;
    error?: string;
}

export default function Input({ name, label, type, defaultValue, placeholderValue, showPasswordIcon, className, error, onChange }: InputProps) {
    const [showPassword, setShowPassword] = useState(false);

    const isPasswordType = type === "password";
    const currentType = isPasswordType ? (showPassword ? "text" : "password") : type;

    return (
        <div className={`flex flex-col gap-2 w-full ${className}`}>
            <label className="text-text-main text-[14px] font-medium">{label}</label>

            <div className="relative flex items-center">
                <input onChange={onChange} defaultValue={defaultValue} name={name} className={`w-full p-3 bg-bg-main border border-border rounded-xl placeholder:text-text-muted outline-none duration-200 hover:border-text-muted focus:border-default ${showPasswordIcon ? "pl-12" : ""}${isPasswordType ? "pr-12" : ""} `} type={currentType} placeholder={placeholderValue}  />

                {isPasswordType && (
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 text-text-muted hover:text-text-main transition-colors cursor-pointer">
                        {showPassword ? (
                            <EyeIcon className="w-6 h-6" />
                        ) : (
                            <EyeSlashIcon className="w-6 h-6" />
                        )}
                    </button>
                )}
            </div>
            {error && (
                <span className="text-xs text-error mt-1">{error}</span>
            )}
        </div>
    )
}