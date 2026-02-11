import CvBuilderNav from "@/components/cv-builder/Nav";
import Footer from "@/components/layout/Footer";
import { ResumeProvider } from "@/context/ResumeContext";
import { getResumeById } from "@/lib/resume/server";
import { createClient } from "@/lib/supabase/server";
import { ReactNode } from "react";
import { ToastContainer } from "react-toastify";

type MainLayoutType = {
    children: ReactNode;
    params: Promise<{ resumeId: string}>;
}

export default async function MainLayout({ children, params }: MainLayoutType) {
    const { resumeId } = await params
    const supabase = await createClient()

    const [initialData, { data: { user } }] = await Promise.all([ getResumeById(resumeId), supabase.auth.getUser() ])

    return (
        <ResumeProvider isAuthenticated={!!user} initialTitle={initialData.title } resumeId={resumeId}>
            <CvBuilderNav isAuthenticated={!!user} resumeId={resumeId} />
            {children}
            <Footer />

            <ToastContainer position="top-right" autoClose={3000} theme="colored"/>
        </ResumeProvider>
    );
}