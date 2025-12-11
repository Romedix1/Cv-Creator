import { useTranslations } from "next-intl"
import CloudIcon from "../icons/CloudIcon"
import PdfIcon from "../icons/PdfIcon"
import TextIcon from "../icons/TextIcon"
import SectionIcon from "../icons/SectionIcon"
import FeatureCard from "../ui/FeatureCard"

export default function FeaturesSection() {
    const tFeatures = useTranslations("FeaturesSection");

    const FEATURES_DATA = [<CloudIcon className="w-[23px] xl:w-8 text-default" key="i1" />, <PdfIcon className="w-[23px] xl:w-8 text-default" key="i2" />, <TextIcon className="w-[23px] xl:w-8 text-default" key="i3" />, <SectionIcon className="w-[23px] xl:w-8 text-default" key="i4" />];

    return (
        <section className="px-5 py-16 xl:p-[120px] flex flex-col gap-16">
            <div className="flex flex-col gap-2.5">
                <h2 className="text-[28px] text-text-main leading-9 font-semibold text-center xl:text-[40px] xl:leading-12">{tFeatures("header")}</h2>
                <p className="text-[16px] text-text-muted leading-6 text-center  xl:text-[18px]">{tFeatures("subtitle")}</p>
            </div>

            <div className="flex justify-center">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 mt-8 xl:w-[1200px]">
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