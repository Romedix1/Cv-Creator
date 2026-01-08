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
    const tAria = useTranslations("Aria")

    return (
        <div role="search" className="flex flex-col items-center gap-8">
            <div className="w-full cursor-text bg-surface-hover rounded-full flex items-center px-5 py-2 gap-4 border-2 border-transparent hover:border-text-muted focus-within:hover:border-default focus-within:border-default transition-all duration-300 sm:w-125 md:mt-3 md:w-150 lg:w-175 2xl:w-212.5">
                <MagnitifyingGlass className="w-6 h-6" aria-hidden="true"/>
                <input aria-label={tAria("searchTemplate")} id="search" value={search} onChange={(e) => setSearch(e.target.value)} type="text" placeholder={tTemplates("searchBarPlaceholder")} className="outline-none w-full py-2 rounded-full text-ellipsis 2xl:text-[18px]" />
            </div>

            <fieldset className="grid grid-cols-2 gap-3 w-full sm:w-125 md:w-150 lg:w-225 2xl:w-300 lg:gap-6 lg:grid-cols-4">
                <legend className="sr-only">{tTemplates("filterByCategory")}</legend>
                {FILTER_CAPSULES.map((item, index) => {
                    return (
                        <FilterCapsule key={index} id={item} text={tTemplates(`Filters.${item}`)} setSelectedCategory={setSelectedCategory}/>
                    )
                })}
            </fieldset>
        </div>
    )
}