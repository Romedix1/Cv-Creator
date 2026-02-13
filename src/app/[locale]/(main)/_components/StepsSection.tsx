import { useTranslations } from "next-intl"
import { Download, LayoutTemplate, Pen } from "lucide-react";
import StepCard from "./StepCard";
import Button from "@/components/ui/Button";

export default function StepsSection() {
    const tSteps = useTranslations("StepsSection");

    const FEATURES_DATA = [<LayoutTemplate className="w-5.75 xl:w-8 text-default" key="i1" />, <Pen className="w-5.75 xl:w-8 text-default" key="i2" />, <Download className="w-5.75 xl:w-8 text-default" key="i3" />];

    return (
        <section className="px-5 py-16 flex flex-col gap-16 xl:gap-20 bg-surface-hover items-center">
            <div className="flex flex-col gap-4">
                <h2 className="text-[28px] xl:text-[40px] leading-9 text-text-main text-center font-semibold">{tSteps("header")}</h2>
                <p className="text-[16px] xl:text-[16px] leading-6 text-text-muted text-center">{tSteps("subtitle")}</p>
            </div>

            <div className="flex flex-col gap-16 lg:grid lg:grid-cols-3">
                {FEATURES_DATA.map((iconComponent, index) => {
                    return (
                        <StepCard key={index} icon={iconComponent} headerText={tSteps(`cards.card${index+1}.header`)} mainText={tSteps(`cards.card${index+1}.text`)} />
                    )
                })}
            </div>

            <Button className="w-70 xl:w-[320px] py-4" variant="primary" text={tSteps("startCreatingBtn")}/>
        </section>
    )
}