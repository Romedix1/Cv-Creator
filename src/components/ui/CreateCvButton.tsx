import { useTranslations } from "next-intl";

type CreateCvButton = {
    className?: string;
}

export default function CreateCvButton({ className }: CreateCvButton) {
    const t = useTranslations("Button");
    return (
        <button className={`${className} bg-default flex justify-center px-5 py-2.5 rounded-lg font-semibold text-button-text hover:bg-default-hover duration-200 cursor-pointer`}>
            <span className="w-22 text-center">
                {t("createCV")}
            </span>
        </button>
    )
}