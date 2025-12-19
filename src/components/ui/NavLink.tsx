import Link from "next/link"

type NavLinkProps = {
    className?: string
    onClick?: () => void;
    page: string
}

const URL_MAP: Record<string, string> = {
    "Home": "/",
    "Templates": "/templates",
    "Szablony": "/templates",
    "Log In": "/login",
    "Zaloguj": "/login",
    "My CVs": "/dashboard",
    "Moje CV": "/dashboard",
    "Account settings": "/dashboard/settings",
    "Ustawienia konta": "/dashboard/settings",
    "Ustawienia": "/dashboard/settings",
    "Settings": "/dashboard/settings",
};

export default function NavLink({className, onClick, page}: NavLinkProps) {
    const url = URL_MAP[page];

    return (
        <Link className={`${className} hover:text-default duration-200`} onClick={onClick} href={url}>{page}</Link>
    )
}