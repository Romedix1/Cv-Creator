import { useTranslations } from "next-intl"
import MagnitifyingGlass from "../icons/MagnifyingGlassIcon"
import FilterCapsule from "./FilterCapsule"
import { Dispatch, SetStateAction } from "react";

type SearchBarProps = {
    setSelectedCategory: Dispatch<SetStateAction<string>>;
    search: string;
    setSearch: Dispatch<SetStateAction<string>>;
}

const FILTER_CAPSULES = ["all", "minimalist", "modern", "classic"]

export default function SearchBar({ setSelectedCategory, search, setSearch }: SearchBarProps) {
    const tTemplates = useTranslations("Templates")

    return (
        <>
            <label htmlFor="search" className="w-full cursor-text bg-surface-hover rounded-full flex items-center px-5 py-2 gap-4 border-2 border-transparent hover:border-text-muted focus-within:hover:border-default focus-within:border-default transition-all duration-300 sm:w-[500px] md:mt-3 md:w-[600px] lg:w-[700px] 2xl:w-[850px]">
                <MagnitifyingGlass className="w-6 h-6" />
                <input id="search" value={search} onChange={(e) => setSearch(e.target.value)} type="text" placeholder={tTemplates("searchBarPlaceholder")} className="outline-none w-full py-2 rounded-full text-ellipsis 2xl:text-[18px]" />
            </label>

            <div className="grid grid-cols-2 gap-3 w-full sm:w-[500px] md:w-[600px] lg:w-[900px] 2xl:w-[1200px] lg:gap-6 lg:grid-cols-4">
                {FILTER_CAPSULES.map((item, index) => {
                    return (
                        <FilterCapsule key={index} id={item} text={tTemplates(`Filters.${item}`)} setSelectedCategory={setSelectedCategory}/>
                    )
                })}
            </div>
        </>
    )
}