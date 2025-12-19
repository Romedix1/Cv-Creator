"use client"

import { Dispatch, SetStateAction } from "react";

type FilterCapsuleProps = {
    id: string;
    text: string;
    setSelectedCategory: Dispatch<SetStateAction<string>>;
}

export default function FilterCapsule({ id, text, setSelectedCategory }: FilterCapsuleProps) {
    return (
        <label onClick={() => setSelectedCategory(id)} htmlFor={id} className="px-3 py-3 cursor-pointer text-[14px] md:text-[16px] 2xl:text-[18px] bg-surface hover:bg-surface-hover hover:border-default rounded-full text-center text-text-main border duration-300 has-checked:bg-default has-checked:text-white has-checked:border-transparent">
            <input id={id} name="filterCapsule" type="radio" className="hidden" defaultChecked={id === "all"}/>
            {text}
        </label>
    )
}