import DashboardNav from "@/components/layout/DashboardNav";
import { getUserProfile } from "@/lib/getUserProfile";
import { ReactNode } from "react";

export default async function DashboardLayout({ children }: { children: ReactNode,  }) {
    const userProfile = await getUserProfile()
    const firstName = userProfile?.firstName

    return (
        <main className="bg-surface-hover">
            <DashboardNav firstName={firstName} />

            {children}
        </main>
    );
}