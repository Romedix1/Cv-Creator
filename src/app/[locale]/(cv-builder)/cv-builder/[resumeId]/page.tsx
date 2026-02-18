import ResumeEditor from "@/app/[locale]/(cv-builder)/cv-builder/[resumeId]/_components/ResumeEditor";
import { getUserProfile } from "@/lib/getUserProfile";
import { getIsAuthenticated } from "@/lib/isAuthenticated";
import { getResumeById, getUserResumeCount } from "@/lib/resume/server";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

type CvBuilderProps = {
    params: Promise<{ resumeId: string }>;
    searchParams: Promise<{ template?: string }>
}

export default async function CvBuilder({ params, searchParams }: CvBuilderProps) {
    const { resumeId } = await params;
    const { template } = await searchParams

    const isAuthenticated = await getIsAuthenticated()

    let userProfile = null
    let initialData = null

    if (isAuthenticated) {
        [userProfile, initialData] = await Promise.all([ getUserProfile(), getResumeById(resumeId) ])

        if (!initialData) {
            const count = await getUserResumeCount()

            if (count && count >= 5) {
                redirect("/dashboard?error=limit_reached")
            }
        }
    }

    const activeTemplate = template || "modern-blue"

    return (
        <main className="xl:flex">
            <ResumeEditor initialData={initialData?.content || null} resumeId={resumeId} template={activeTemplate} isAuthenticated={isAuthenticated} avatarUrl={userProfile?.avatarUrl} initials={userProfile?.initials || null} userFirstName={userProfile?.firstName} userLastName={userProfile?.lastName} jobTitle={userProfile?.jobTitle} email={userProfile?.email} phone={userProfile?.phone} />
        </main>
    )
}
