import { ReactElement } from "react"

type OAuthCardProps = {
    icon: ReactElement;
}

export default function OAuthCard({ icon }: OAuthCardProps) {
    return (
        <div className="px-5 py-3 border rounded-[12px] flex justify-center w-full cursor-pointer hover:bg-border duration-200">
            <div>
                {icon}
            </div>
        </div>
    )
}