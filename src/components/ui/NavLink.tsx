import Link from "next/link"

type NavLinkProps = {
    className?: string
    onClick?: () => void;
    page: PageName
}

type PageName = "Templates" | "Login" | "Home";

const URL_MAP: Record<PageName, string> = {
  "Home": "/",
  "Templates": "/templates",
  "Login": "/login",
};

export default function NavLink({className, onClick, page}: NavLinkProps) {
    const url = URL_MAP[page];

    return (
        <Link className={className} onClick={onClick} href={url}>{page}</Link>
    )
}