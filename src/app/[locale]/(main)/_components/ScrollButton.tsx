"use client"

import Button from "../../../../components/ui/Button";

type ScrollButtonType = {
    text: string;
}

export default function ScrollButton({ text }: ScrollButtonType) {
    const scrollToTemplates = () => {
        const element = document.getElementById('templates-section');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start'  })
        }
    }

    return (
        <Button className="w-full lg:w-fit lg:px-9 2xl:text-lg" variant="secondary" text={text} onClick={scrollToTemplates}/>
    )
}