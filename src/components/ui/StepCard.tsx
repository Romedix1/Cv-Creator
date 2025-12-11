import { ReactElement } from "react";

type StepsSectionProps = {
    icon: ReactElement;
    headerText: string;
    mainText: string;
}

export default function StepCard({ icon, headerText, mainText }: StepsSectionProps) {
    return (
        <div className="flex flex-col w-[280px] lg:w-[300px] xl:w-[320px] gap-4 items-center">
            <div className="w-16 h-16 xl:h-18 xl:w-18 rounded-full bg-default/10 flex items-center justify-center shrink-0">
                {icon}
            </div>

            <h3 className="text-xl xl:text-[22px] leading-7 text-text-main font-semibold">{headerText}</h3>
            <p className="text-center text-text-muted text-[14px] xl:text-[16px] leading-5">{mainText}</p>
        </div>
    )
}