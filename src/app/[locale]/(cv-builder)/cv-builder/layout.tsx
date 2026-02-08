import CvBuilderNav from "@/components/cv-builder/Nav";
import Footer from "@/components/layout/Footer";
import { ResumeProvider } from "@/context/ResumeContext";
import { createClient } from "@/lib/supabase/server";
import { ReactNode } from "react";

export default async function MainLayout({ children }: { children: ReactNode }) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    const isAuthenticated = !!user

    return (
        <ResumeProvider>
            <CvBuilderNav isAuthenticated={isAuthenticated} />
            {children}
            <Footer />
        </ResumeProvider>
    );
}