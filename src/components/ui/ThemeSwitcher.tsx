'use client'

import { useTheme } from "next-themes";
import { SunIcon } from "../icons/SunIcon";
import { MoonIcon } from "../icons/MoonIcon";

export default function ThemeSwitcher() {
    const { theme, setTheme } = useTheme();

    const toggleSwitch = () => {
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
        document.cookie = `theme=${newTheme}; path=/; max-age=31536000; SameSite=Lax`;
    }

    const isDark = theme === "dark";

    return (
        <button onClick={toggleSwitch} className="w-15 h-9 bg-[#D9D9D9] dark:bg-default rounded-full p-1 flex items-center cursor-pointer transition-colors ">
            <div className={`w-7 h-7 rounded-full bg-surface-static shadow-[0px_2px_4px_0px_rgba(0,0,0,0.33)] flex items-center justify-center transition-transform ${isDark && "translate-x-6"}`}>
                {!isDark ? (
                        <SunIcon className="w-5 h-5 transition-all"/>
                    ) : (
                        <MoonIcon className="w-6 h-6 transition-all -rotate-45"/>
                    )
                }
            </div>
        </button>
    )
}