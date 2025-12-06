import LanguageSwitcher from "../ui/LanguageSwitcher";
import CreateCvButton from "../ui/CreateCvButton";
import DynamicThemeSwitcher from "../ui/DynamicThemeSwitcher";
import NavLink from "../ui/NavLink";

type MobileMenuProps = {
    isOpen: boolean;
    onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
    return (
        <div className={`h-screen w-full absolute top-20 left-0 p-6 flex flex-col gap-8 z-60 ease-in-out duration-200 ${isOpen ? "opacity-100 translate-y-0 visible" : "opacity-0 -translate-y-5 invisible"}`}>
            <NavLink className="font-semibold text-xl" onClick={onClose} page="Templates"/>
            <NavLink className="font-semibold text-xl" onClick={onClose} page="Login"/>

            <div className="flex justify-center w-full">
                <span className="block h-px w-[96%] bg-border"></span>
            </div>

            <div className="flex justify-between items-center">
                <p className="text-text-muted font-normal">Language:</p>

                <LanguageSwitcher />
            </div>
            <div className="flex justify-between items-center">
                <p className="text-text-muted font-normal">Theme:</p>

                <DynamicThemeSwitcher />
            </div>

            <CreateCvButton className="w-full" />
        </div>
    )
}