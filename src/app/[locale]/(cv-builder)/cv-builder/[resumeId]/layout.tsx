import CvBuilderNav from "@/app/[locale]/(cv-builder)/cv-builder/[resumeId]/_components/Nav";
import Footer from "@/components/layout/Footer";
import { ResumeProvider } from "@/context/ResumeContext";
import { getIsAuthenticated } from "@/lib/isAuthenticated";
import { getResumeById } from "@/lib/resume/server";
import { createClient } from "@/lib/supabase/server";
import { getTranslations } from "next-intl/server";
import { ReactNode } from "react";
import { ToastContainer } from "react-toastify";

type MainLayoutType = {
    children: ReactNode;
    params: Promise<{ resumeId: string}>;
}

export async function generateMetadata() {
    const tMetadata = await getTranslations("Metadata.editorPage")

    return {
        title: `${tMetadata("editing")}`,
        robots: { index: false },
    }
}

export default async function MainLayout({ children, params }: MainLayoutType) {
    const tTemplate = await getTranslations("Template")

    const { resumeId } = await params
    const supabase = await createClient()

    const isAuthenticated = await getIsAuthenticated()

    const [initialData] = await Promise.all([ getResumeById(resumeId), supabase.auth.getUser() ])

    const defaultTitle = initialData?.title || tTemplate("noTitle")

    return (
        <ResumeProvider isAuthenticated={isAuthenticated} initialTitle={defaultTitle} resumeId={resumeId}>
            <CvBuilderNav isAuthenticated={isAuthenticated} resumeId={resumeId} />
            {children}
            <Footer />

            <ToastContainer position="top-right" autoClose={3000} theme="colored"/>
        </ResumeProvider>
    );
}