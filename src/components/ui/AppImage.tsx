"use client"

import { cn } from "@/lib/utils"
import { Skeleton } from "./skeleton";
import Image, { ImageProps } from "next/image";
import { useState } from "react";

interface AppImageProps extends ImageProps {
    containerClassName?: string;
    skeletonClassName?: string;
}

export default function AppImage({ containerClassName, skeletonClassName, className, src, alt, ...props }: AppImageProps) {
    const [isLoading, setIsLoading] = useState(true);

    return (
        <div className={cn("relative overflow-hidden", containerClassName)}>
            {isLoading && <Skeleton className={cn("absolute inset-0 z-10", skeletonClassName)} />}

            <Image src={src} alt={alt} onLoad={() => setIsLoading(false)}className={cn("transition-opacity duration-500", isLoading ? "opacity-0" : "opacity-100", className)} {...props} />
        </div>
    )
}