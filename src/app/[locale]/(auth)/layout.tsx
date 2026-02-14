import Nav from "@/components/layout/Nav";
import { getTranslations } from "next-intl/server";
import { ReactNode } from "react";

export async function generateMetadata() {
    const tMetadata = await getTranslations("Metadata.authPages")

    return {
        title: tMetadata("title"),
        description: tMetadata("description"),
    };
}

export default async function AuthLayout({ children }: { children: ReactNode }) {
    return (
        <>
            <Nav authPage={true} />
            <main className="flex justify-center px-5 py-8">
                {children}
            </main>
        </>
    )
}