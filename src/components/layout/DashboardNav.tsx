"use client"

import { useTranslations } from "next-intl"
import { usePathname } from "next/navigation"
import NavLink from "../ui/NavLink"

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
            <h2 className="text-[28px] lg:text-[40px] font-semibold">{tDashboard("header")}, {firstName}</h2>

            <div className="flex justify-center gap-6 px-4 items-center">
                <NavLink className={`${getLinkClass("/dashboard")} lg:text-[17px]`} page={tDashboard("myCVs")} />
                <NavLink className={`${getLinkClass("/dashboard/settings")} lg:text-[17px]`} page={tDashboard("settings")} />
            </div>
        </div>
    )
}