import { useTranslations } from "next-intl"
import FeatureCard from "../ui/FeatureCard"
import { CloudUpload, FileText, LayoutTemplate, Type } from "lucide-react"

export default function FeaturesSection() {
    const tFeatures = useTranslations("FeaturesSection");

    const FEATURES_DATA = [<CloudUpload className="w-5.75 xl:w-8 text-default" key="i1" />, <FileText className="w-5.75 xl:w-8 text-default" key="i2" />, <Type className="w-5.75 xl:w-8 text-default" key="i3" />, <LayoutTemplate className="w-5.75 xl:w-8 text-default" key="i4" />];

    return (
        <section className="px-5 py-16 xl:p-30 flex flex-col gap-16">
            <div className="flex flex-col gap-2.5">
                <h2 className="text-[28px] text-text-main leading-9 font-semibold text-center xl:text-[40px] xl:leading-12">{tFeatures("header")}</h2>
                <p className="text-[16px] text-text-muted leading-6 text-center  xl:text-[18px]">{tFeatures("subtitle")}</p>
            </div>

            <div className="flex justify-center">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 mt-8 xl:w-300">
                    {FEATURES_DATA.map((iconComponent, index) => {
                        return (
                            <FeatureCard key={index} icon={iconComponent} headerText={tFeatures(`cards.card${index+1}.header`)} mainText={tFeatures(`cards.card${index+1}.text`)} />
                        )
                    })}
                </div>
            </div>
        </section>
    )
}