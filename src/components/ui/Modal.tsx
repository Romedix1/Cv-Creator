"use client"

import { cn } from "@/lib/utils";
import { Container, X } from "lucide-react";
import { ReactNode, useState } from "react"

type ModalType = {
    onClose: () => void;
    children: ReactNode | ((close: () => void) => ReactNode);
    header?: ReactNode;
    footer?: ReactNode | ((close: () => void) => ReactNode);
    containerClassName?: string
}

export default function Modal({ onClose, children, header, footer, containerClassName }: ModalType)  {
    const [isClosing, setIsClosing] = useState(false)

    const handleClose = () => {
        setIsClosing(true)

        setTimeout(() => {
            onClose()
            setIsClosing(false)
        }, 200)
    }

    return (
        <div className={cn("bg-black/50 w-screen h-screen fixed top-0 left-0 flex flex-col justify-center items-center backdrop-blur-sm z-9999  overflow-auto")} onClick={handleClose}>
            <div className={cn("bg-surface p-4 md:p-6 rounded-xl flex flex-col gap-3 w-11/12 items-end md:w-8/12 xl:w-3/12 animate-in fade-in zoom-in-85 duration-200 fill-mode-forwards", "animate-in fade-in zoom-in-95", containerClassName, isClosing && "animate-out fade-out zoom-out-95")} onClick={(e) => e.stopPropagation()}>
                {header ? header : (
                    <button>
                        <X className="cursor-pointer hover:text-error duration-200" onClick={handleClose} />
                    </button>
                )}

                {typeof children === "function" ? children(handleClose) : children}

                {footer && (
                    <>
                        {typeof footer === "function" ? footer(handleClose) : footer}
                    </>
                )}
            </div>
        </div>
    )
}