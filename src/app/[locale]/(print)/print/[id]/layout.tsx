import { createClient } from "@/lib/supabase/server";
import { Metadata } from "next";

type PrintLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
};

export const metadata: Metadata = {
  title: "Curriculum vitae",
  robots: {
    index: false,
    follow: false,
  },
};

export default function PrintLayout({ children }: PrintLayoutProps) {
  return <>{children}</>;
}
