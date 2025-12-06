'use client'

import dynamic from "next/dynamic"
import { Skeleton } from "./skeleton"

const DynamicThemeSwitcher = dynamic(() => import("./ThemeSwitcher"), {
    ssr: false,
    loading: () => <Skeleton className="w-15 h-9 rounded-full" />
})

export default DynamicThemeSwitcher