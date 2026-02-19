import Footer from "@/components/layout/Footer";
import Nav from "@/components/layout/Nav";
import { getTranslations } from "next-intl/server";
import { ReactNode } from "react";

export async function generateMetadata() {
    const tMetadata = await getTranslations("Metadata.mainPage")

    return {
        title: tMetadata("title"),
        description: tMetadata("description"),
    }
}

export default async function MainLayout({ children }: { children: ReactNode }) {
    return (
        <>
            <Nav />
            {children}
            <Footer />
        </>
    );
}