import DeleteAccountSection from "@/components/layout/DeleteAccountSectio";
import PasswordSection from "@/components/layout/PasswordSection";
import PersonalDataSection from "@/components/layout/PersonalDataSection";
import { getUserProfile } from "@/lib/getUserProfile";

export default async function Dashboard() {
  const userProfile = await getUserProfile()

  if (!userProfile) return <div>Error</div> // TODO: ADD ERROR BLOCK

  return (
    <main className="mt-[52px] flex flex-col justify-center px-8 gap-8 pb-[100px] lg:items-center">
      <div className="border bg-surface w-full rounded-[12px] p-6 lg:w-[700px]">
        <PersonalDataSection firstName={userProfile.firstName} lastName={userProfile.lastName} avatarUrl={userProfile.avatarUrl} initials={userProfile.initials} />
      </div>

      <div className="border bg-surface w-full rounded-[12px] p-6 lg:w-[700px]">
        <PasswordSection />
      </div>

      <div className="border dark:bg-[#1F0A0A] bg-[#FEF2F2] border-error w-full rounded-[12px] p-6 lg:w-[700px]">
        <DeleteAccountSection />
      </div>
    </main>
  );
}
