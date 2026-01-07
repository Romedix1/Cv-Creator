import ResumeEditor from "@/components/layout/Cv-builder/ResumeEditor";
import { getUserProfile } from "@/lib/getUserProfile";
import { createClient } from "@/lib/supabase/server";

export default async function CvBuilder() {
    const userProfile = await getUserProfile()

    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    const isAuthenticated = !!user

    return (
        <main className="xl:flex">
            <ResumeEditor isAuthenticated={isAuthenticated} avatarUrl={userProfile?.avatarUrl} initials={userProfile?.initials || null} userFirstName={userProfile?.firstName} userLastName={userProfile?.lastName} jobTitle={userProfile?.jobTitle} email={userProfile?.phone} phone={userProfile?.phone} address={null} />
        </main>
    )
}
