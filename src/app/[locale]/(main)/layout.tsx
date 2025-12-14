import Nav from "@/components/layout/Nav";
import { createClient } from "@/lib/supabase/server";
import { ReactNode } from "react";

export default async function MainLayout({ children }: { children: ReactNode }) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    return (
        <>
            <Nav user={user} />
            {children}
        </>
    );
}