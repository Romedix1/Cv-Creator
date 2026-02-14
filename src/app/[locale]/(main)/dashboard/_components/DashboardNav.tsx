"use client"

import NavLink from "@/components/ui/NavLink"
import { cn } from "@/lib/utils"
import { useTranslations } from "next-intl"
import { usePathname } from "next/navigation"

type DashboardNavProps = {
    firstName: string
}

export default function DashboardNav({ firstName }: DashboardNavProps) {
    const tDashboard = useTranslations("Dashboard")

    const pathname = usePathname()

    const getLinkClass = (href: string) => {
        const isActive = pathname === href

        const baseStyles = "px-2 pt-3 pb-2 text-[16px] duration-200 border-b transition-colors"
        const stateStyles = isActive ? "text-default border-b-default" : "text-text-muted border-b-transparent hover:text-default-hover hover:border-b-default-hover"

        return `${baseStyles} ${stateStyles}`
    }

    return (
        <div className="flex flex-col items-center pt-6 gap-2">
            <h2 className="text-[28px] lg:text-[40px] font-semibold wrap-break-word w-8/12 text-center">{tDashboard("header")}, {firstName}</h2>

            <div className="flex justify-center gap-6 px-4 items-center">
                <NavLink className={cn(getLinkClass("/dashboard"), "lg:text-[17px]")} href="/dashboard" text={tDashboard("myCVs")} />
                <NavLink className={cn(getLinkClass("/dashboard/settings"), "lg:text-[17px]")} href="/dashboard/settings" text={tDashboard("settings")} />
            </div>
        </div>
    )
}