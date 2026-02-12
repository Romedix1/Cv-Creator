"use server"

import { createClient } from "@/lib/supabase/server";
import { getTranslations } from "next-intl/server";
import { revalidatePath } from "next/cache";

export async function changeResumeTitle(resumeId: string, newTitle: string) {
    const tError = await getTranslations("Errors")

    if (!newTitle.trim()) {
        return { error: tError("emptyTitle") }
    }

    const supabase = await createClient()

    try {
        const { error } = await supabase.from("resumes").update({ title: newTitle }).eq("id", resumeId)

        if (error) {
            return { error: tError("changeTitle") }
        }

        revalidatePath("/dashboard")
        return { success: true }
    } catch {
        return { error: tError("unexpected") };
    }
}

export async function copyResume(resumeId: string) {
    const tError = await getTranslations("Errors")
    const tDocuments = await getTranslations("Dashboard.MyCVs")

    const supabase = await createClient()

    try {
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) {
            return { error: tError("unauthorized") }
        }

        const { count, error: countError } = await supabase.from("resumes").select("*", { count: "exact", head: true }).eq("user_id", user.id)

        if (count && count >= 5) {
            return { error: tError("resumeLimit") }
        } else if (countError) {
            return { error: tError("copy") }
        }

        const { data: original, error: fetchError } = await supabase.from("resumes").select("*").eq("id", resumeId).single()

        if (fetchError || !original) {
            return { error: tError("copy") }
        }

        const { id, created_at, ...resumeData } = original

        const newResume = { ...resumeData, title: `${original.title} ${tDocuments("copyText")}`, user_id: user.id }

        const { error: insertError } = await supabase.from("resumes").insert(newResume)

        if (insertError) return { error: tError("copy") }

        revalidatePath("/dashboard")
        return { success: true }
    } catch {
        return { error: tError("unexpected") }
    }
}

export async function deleteResume(resumeId: string) {
    const tError = await getTranslations("Errors")

    const supabase = await createClient()

    try {
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) {
            return { error: tError("unauthorized") }
        }

        const { error: dbError } = await supabase.from("resumes").delete().eq("id", resumeId).eq("user_id", user.id)

        if (dbError) {
            return { error: tError("delete") }
        }

        const { error: storageError } = await supabase.storage.from("cv-images").remove([`${user.id}/${resumeId}preview/preview.jpg`])

        if (storageError) {
            console.error("Unable to delete snapshot")
        }

        revalidatePath("/dashboard")
        return { success: true }
    } catch {
        return { error: tError("unexpected") }
    }
}