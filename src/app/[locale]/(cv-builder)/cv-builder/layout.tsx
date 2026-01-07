import CvBuilderNav from "@/components/layout/Cv-builder/Nav";
import Footer from "@/components/layout/Footer";
import { createClient } from "@/lib/supabase/server";
import { ReactNode } from "react";

export default async function MainLayout({ children }: { children: ReactNode }) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    const isAuthenticated = !!user

    return (
        <>
            <CvBuilderNav isAuthenticated={isAuthenticated} />
            {children}
            <Footer />
        </>
    );
}