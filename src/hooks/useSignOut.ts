"use client"

import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useState } from "react"

export function useSignOut() {
    const router = useRouter();

    const [loading, setLoading] = useState(false);

    const signOut = async () => {
        try {
            setLoading(true);
            const supabase = createClient();

            await supabase.auth.signOut();

            router.push("/")
            router.refresh();
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    return  { signOut, loading };
}