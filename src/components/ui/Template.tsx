import Image, { StaticImageData } from "next/image";
import { Separator } from "./separator";

type TemplateProps = {
    name: string;
    image: StaticImageData;
}

export default function Template({ name, image }: TemplateProps) {
    return (
        <article className="px-2.5 py-2.5 bg-surface border rounded-2xl lg:w-[350px] 2xl:w-[450px]">
            <div>
                <Image src={image} alt=""/>
            </div>
            <div className="flex flex-col items-center px-4 ">
                <Separator className="mt-6 mb-2.5" />
                <h3 className="w-full text-text-main font-semibold mt-2.5 mb-4">{name}</h3>
            </div>
        </article>
    )
}