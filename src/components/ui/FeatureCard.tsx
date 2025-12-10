import { ReactElement } from "react";

type FeatureCardProps = {
    icon: ReactElement;
    headerText: string;
    mainText: string;
}

export default function FeatureCard({ icon, headerText, mainText }: FeatureCardProps) {
    return (
        <div className="flex flex-row gap-6 p-2.5 md:p-3 bg-bg-main rounded-2xl border border-solid border-border xl:gap-8 xl:p-6 2xl:w-[580px]">
            <div>
                <div className="bg-default/10 w-14 h-14 xl:h-18 xl:w-18 rounded-2xl flex items-center justify-center shrink-0">
                    {icon}
                </div>
            </div>

            <div className="flex flex-col gap-6">
                <h3 className="font-semibold text-lg text-text-main mb-1 xl:text-xl leading-7">{headerText}</h3>
                <p className="text-text-muted text-[16px] leading-6 xl:text-[18px]">{mainText}</p>
            </div>
        </div>
    )
}