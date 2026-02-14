import DashboardNav from "@/app/[locale]/(main)/dashboard/_components/DashboardNav";
import { getUserProfile } from "@/lib/getUserProfile";
import { getTranslations } from "next-intl/server";
import { ReactNode } from "react";
import { ToastContainer } from "react-toastify";

export async function generateMetadata() {
    const tMetadata = await getTranslations("Metadata.dashboard")

    return {
        title: tMetadata("title"),
        description: tMetadata("description"),
        robots: { index: false },
    };
}

export default async function DashboardLayout({ children }: { children: ReactNode,  }) {
    const userProfile = await getUserProfile()
    const firstName = userProfile?.firstName

    return (
        <main className="bg-surface-hover">
            {userProfile && <DashboardNav firstName={firstName} />}

            <ToastContainer position="top-right" autoClose={3000} theme="colored"/>
            {children}
        </main>
    );
}