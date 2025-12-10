import { useTranslations } from "next-intl"
import Button from "../ui/Button";
import CvPreview from '../../../public/images/Templates/modern-blue.png'
import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
    const tHero = useTranslations("Hero");
    const tNav = useTranslations("Nav");
    const tButton = useTranslations("Button");

    return (
        <section className="py-12 px-5 flex flex-col gap-16 items-center lg:flex-row lg:px-24 2xl:px-30">
            <div className="gap-8 flex flex-col md:w-8/12">
                <div className="gap-8 flex flex-col">
                    <h1 className="text-4xl font-bold text-center leading-11 lg:text-left 2xl:text-[56px] 2xl:leading-16 2xl:w-8/12">{tHero("header")}</h1>
                    <p className="text-text-muted text-center lg:text-left 2xl:text-xl 2xl:w-9/12">{tHero("subtitle")}</p>
                </div>

                <div className="flex flex-col gap-4 lg:flex-row">
                    <Link href={"/cv-builder"}>
                        <Button className="w-full lg:w-fit lg:px-9 2xl:text-lg" variant="primary" text={tButton("createCV")} />
                    </Link>
                    <Link href={"/templates"}>
                        <Button className="w-full lg:w-fit lg:px-9 2xl:text-lg" variant="secondary" text={tNav("templates")} />
                    </Link>
                </div>
            </div>
            <div>
                <div className="aspect-3/4 relative w-[300px] 2xl:w-[400px]">
                    <div className="absolute w-[300px] 2xl:w-[500px] h-[400px] 2xl:h-[500px] bg-default -left-[25px] rounded-full opacity-25 blur-[100px]"></div>
                    <Image src={CvPreview} alt="CV preview" fill className="object-contain" />
                </div>
            </div>
        </section>
    )
}