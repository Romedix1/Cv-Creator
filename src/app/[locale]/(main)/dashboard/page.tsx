import CreateCvBlock from "@/components/dashboard/CreateResumeBlock";
import ResumeBlock from "@/components/dashboard/ResumeBlock";
import { createClient } from "@/lib/supabase/server";

export default async function DashboardSettings() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return
  const userId = user.id

  const { data: resumes } = await supabase.from("resumes").select("id, title, updated_at").order("updated_at", { ascending: false })

  const itemCount = (resumes && resumes.length < 5) ? resumes.length + 1 : 5

  return (
      <main className="mt-13 px-8 gap-8 pb-25">
        <div className="grid gap-6 w-full justify-center mx-auto" style={{ gridTemplateColumns: `repeat(auto-fit, 280px)`, maxWidth: `${itemCount * 280 + (itemCount - 1) * 24}px` }}>
          {resumes && resumes.length < 5 && (
            <CreateCvBlock />
          )}

          {resumes?.map((resume) => {
            const { data: snapshotUrl } = supabase.storage.from("cv-images").getPublicUrl(`${userId}/${resume.id}/preview/preview.jpg`)

            return (
              <ResumeBlock key={resume.id} data={resume} snapshotUrl={snapshotUrl.publicUrl || ""} />
            )
          })}
        </div>
      </main>
  );
}
