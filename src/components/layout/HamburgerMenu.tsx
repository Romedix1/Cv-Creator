import { useTranslations } from "next-intl";

type HamburgerMenuProps = {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function HamburgerMenu({ isOpen, setIsOpen }: HamburgerMenuProps) {
    const tAria = useTranslations("Aria")

    function handleClick() {
        setIsOpen((prev) => !prev)
    }

    return (
        <button aria-label={isOpen ? tAria("openNavMeu") : tAria("closeNavMenu")} onClick={handleClick} className="flex flex-col justify-center items-center cursor-pointer">
            <span className={`bg-bg-second block transition-all ease-out h-0.75 w-5 rounded-sm ${isOpen ? 'rotate-45 translate-y-1.25' : '-translate-y-0.5'}`}>
            </span>
            <span className={`bg-bg-second block transition-all ease-out h-0.75 w-5 rounded-sm my-0.5 ${isOpen ? 'opacity-0' : 'opacity-100'}`}>
            </span>
            <span className={`bg-bg-second block transition-all ease-out h-0.75 w-5 rounded-sm ${isOpen ? '-rotate-45 -translate-y-1.25' : 'translate-y-0.5'}`}>
            </span>
        </button>
    )
};