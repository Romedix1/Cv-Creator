import ResumeEditor from "@/components/cv-builder/ResumeEditor";
import { getUserProfile } from "@/lib/getUserProfile";
import { getResumeById } from "@/lib/resume/server";
import { createClient } from "@/lib/supabase/server";

type CvBuilderProps = {
    params: Promise<{ resumeId: string }>;
    searchParams: Promise<{ template?: string }>
}

export default async function CvBuilder({ params, searchParams }: CvBuilderProps) {
    const { resumeId } = await params;
    const { template } = await searchParams
    const supabase = await createClient()

    const { data: { user } } = await supabase.auth.getUser()
    const isAuthenticated = !!user

    let userProfile = null
    let initialData = null

    if (isAuthenticated) {
        [userProfile, initialData] = await Promise.all([ getUserProfile(), getResumeById(resumeId) ])
    }

    const activeTemplate = template || "modern-blue"

    return (
        <main className="xl:flex">
            <ResumeEditor initialData={initialData?.content || null} resumeId={resumeId} template={activeTemplate} isAuthenticated={isAuthenticated} avatarUrl={userProfile?.avatarUrl} initials={userProfile?.initials || null} userFirstName={userProfile?.firstName} userLastName={userProfile?.lastName} jobTitle={userProfile?.jobTitle} email={userProfile?.email} phone={userProfile?.phone} />
        </main>
    )
}
