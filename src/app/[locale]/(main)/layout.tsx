import Footer from "@/components/layout/Footer";
import Nav from "@/components/layout/Nav";
import { createClient } from "@/lib/supabase/server";
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
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    return (
        <>
            <Nav />
            {children}
            <Footer />
        </>
    );
}