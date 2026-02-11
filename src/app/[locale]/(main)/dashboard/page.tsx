import CreateCvBlock from "@/components/dashboard/CreateResumeBlock";
import ResumeBlock from "@/components/dashboard/ResumeBlock";
import { getResumeList } from "@/lib/resume/server";
import { createClient } from "@/lib/supabase/server";

export default async function DashboardSettings() {
  const { resumes, userId } = await getResumeList()
  const supabase = await createClient()

  const itemCount = (resumes && resumes.length < 5) ? resumes.length + 1 : 5

  return (
      <main className="mt-13 px-8 gap-8 pb-25">
        <div className="grid gap-6 w-full justify-center mx-auto" style={{ gridTemplateColumns: `repeat(auto-fit, 280px)`, maxWidth: `${itemCount * 280 + (itemCount - 1) * 24}px` }}>
          {resumes && resumes.length < 5 && (
            <CreateCvBlock />
          )}

          {resumes.map((resume) => {
            const { data: snapshotUrl } = supabase.storage.from("cv-images").getPublicUrl(`${userId}/${resume.id}/preview/preview.jpg`)
            const finalUrl = `${snapshotUrl.publicUrl}?t=${new Date(resume.updated_at).getTime()}`

            return (
              <ResumeBlock key={resume.id} data={resume} snapshotUrl={finalUrl} />
            )
          })}
        </div>
      </main>
  );
}
