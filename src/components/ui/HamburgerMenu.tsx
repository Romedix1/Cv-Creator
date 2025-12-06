'use client'

type HamburgerMenuProps = {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function HamburgerMenu({ isOpen, setIsOpen }: HamburgerMenuProps) {
    function handleClick() {
        setIsOpen((prev) => !prev)
    }

    return (
        <button onClick={handleClick} className="flex flex-col justify-center items-center cursor-pointer">
            <span className={`bg-bg-second block transition-all ease-out h-[3px] w-5 rounded-sm ${isOpen ? 'rotate-45 translate-y-[5px]' : '-translate-y-0.5'}`}>
            </span>
            <span className={`bg-bg-second block transition-all ease-out h-[3px] w-5 rounded-sm my-0.5 ${isOpen ? 'opacity-0' : 'opacity-100'}`}>
            </span>
            <span className={`bg-bg-second block transition-all ease-out h-[3px] w-5 rounded-sm ${isOpen ? '-rotate-45 -translate-y-[5px]' : 'translate-y-0.5'}`}>
            </span>
        </button>
    )
};