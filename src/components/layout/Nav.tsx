import NavLink from "../ui/NavLink";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";

export default function Nav() {
    return (
        <nav className="bg-background px-5 md:px-8 md:py-4 sticky">
            <div className="flex justify-between w-full h-16 gap-8">
                <div className="flex gap-8 items-center">
                    <h1 className="text-main text-2xl font-medium">CV Creator</h1>
                    <NavLink className="hidden md:block text-text-muted mt-1" page="Templates"/>
                </div>

                <div className="flex items-center">
                    <MobileNav />
                    <DesktopNav />
                </div>
            </div>
        </nav>
    )
}