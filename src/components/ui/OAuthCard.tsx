import { ReactElement } from "react"

type OAuthCardProps = {
    icon: ReactElement;
    onClick?: () => void;
}

export default function OAuthCard({ icon, onClick }: OAuthCardProps) {
    return (
        <button type="button" onClick={onClick} className="px-5 py-3 border rounded-[12px] flex justify-center w-full cursor-pointer hover:bg-border duration-200">
            {icon}
        </button>
    )
}