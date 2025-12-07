'use client'

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";

export default function LanguageSwitcher() {
    const locale = useLocale()
    const router = useRouter();
    const pathname = usePathname();

    const toggleLanguage = () => {
        const newLocale = locale === "en" ? "pl" : "en";

        router.replace(pathname, { locale: newLocale});
        router.refresh();
    }

    return (
        <button onClick={toggleLanguage} className="text-text-muted hover:text-text-main font-semibold w-full text-right md:w-6 cursor-pointer duration-200">
            {locale.toUpperCase()}
        </button>
    )
}