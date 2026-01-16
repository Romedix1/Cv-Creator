import { ReactNode } from "react";

type CapsuleProps = {
    text: string;
    value: string;
    currentStep: string;
    onClick: () => void;
    icon: ReactNode;
}

export default function Capsule({ text, value, currentStep, onClick, icon }: CapsuleProps) {
    const isActive = currentStep === value

    return (
        <button type="button" aria-current={isActive ? "step" : undefined} onClick={onClick} className={`${isActive ? "border border-default bg-default xl:bg-default/10 xl:border-default/10 xl:text-default" : "border bg-bg-main xl:text-text-muted hover:bg-default-hover/80 hover:text-text-main"} duration-200 px-4 py-2 cursor-pointer rounded-full flex gap-2 items-center xl:rounded-xl xl:py-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-default focus-visible:ring-offset-2`}>
            <span aria-hidden="true" className="shrink-0">{icon}</span>
            <span className="w-full xl:w-fit whitespace-nowrap">{text}</span>
        </button>
    )
}