import { getUserProfile } from "@/lib/getUserProfile";
import { createClient } from "@/lib/supabase/server";
import PersonalDataSection from "./_components/PersonalDataSection";
import PasswordSection from "./_components/PasswordSection";
import DeleteAccountSection from "./_components/DeleteAccountSection";
import { getIsAuthenticated } from "@/lib/isAuthenticated";

export default async function DashboardSettings() {
  const supabase = await createClient()
  const userProfile = await getUserProfile()

  const { data: { user } } = await supabase.auth.getUser()

  const providers = user?.app_metadata.providers || []

  const isAuthenticated = await getIsAuthenticated()
  const isEmailProvider = providers.includes('email')

  if (!userProfile) {
    throw new Error("SETTINGS_LOAD_FAILED")
  }

  return (
    <main className="mt-[52px] flex flex-col justify-center px-8 gap-8 pb-[100px] lg:items-center">
      <div className="border bg-surface w-full rounded-[12px] p-6 lg:w-[700px]">
        <PersonalDataSection isAuthenticated={isAuthenticated} uid={userProfile.uid} firstName={userProfile.firstName} lastName={userProfile.lastName} avatarUrl={userProfile.avatarUrl} jobTitle={userProfile.jobTitle} email={userProfile.email} phone={userProfile.phone} initials={userProfile.initials} />
      </div>

      {isEmailProvider &&
        <div className="border bg-surface w-full rounded-[12px] p-6 lg:w-[700px]">
          <PasswordSection email={user?.email || ""} />
        </div>
      }

      <div className="border dark:bg-[#1F0A0A] bg-[#FEF2F2] border-error w-full rounded-[12px] p-6 lg:w-[700px]">
        <DeleteAccountSection email={user?.email || ""} hasPassword={isEmailProvider} />
      </div>
    </main>
  );
}
