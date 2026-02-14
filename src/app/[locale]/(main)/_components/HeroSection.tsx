import HeroImage from '@public/images/Templates/modern-blue.png';
import ScrollButton from "./ScrollButton";
import Button from "@/components/ui/Button";
import { useTranslations } from 'next-intl';
import AppImage from '@/components/ui/AppImage';

export default function HeroSection() {
    const tHero = useTranslations("Hero");
    const tNav = useTranslations("Nav");
    const tButton = useTranslations("Button");
    const tAlt = useTranslations("Alt");

    return (
        <section className="py-12 px-5 flex flex-col gap-16 items-center lg:flex-row lg:px-24 2xl:px-30">
            <div className="gap-8 flex flex-col md:w-8/12">
                <div className="gap-8 flex flex-col">
                    <h1 className="text-4xl font-bold text-center leading-11 lg:text-left 2xl:text-[56px] 2xl:leading-16 2xl:w-8/12">{tHero("header")}</h1>
                    <p className="text-text-muted text-center lg:text-left 2xl:text-xl 2xl:w-9/12">{tHero("subtitle")}</p>
                </div>

                <div className="flex flex-col gap-4 lg:flex-row">
                    <Button className="w-full lg:w-fit lg:px-9 2xl:text-lg" variant="primary" text={tButton("createCV")} href="/templates"/>
                    <ScrollButton text={tNav("templates")} />
                </div>
            </div>
            <div>
                <div className="aspect-3/4 relative w-75 2xl:w-[400px]">
                    <div className="absolute w-75 2xl:w-[500px] h-[400px] 2xl:h-[500px] bg-default -left-[25px] rounded-full opacity-25 blur-[100px]"></div>
                    <AppImage src={HeroImage} alt={tAlt("preview")} priority />
                </div>
            </div>
        </section>
    )
}