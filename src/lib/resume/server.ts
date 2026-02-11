import { createClient } from "../supabase/server"

export async function getResumeList() {
    const supabase = await createClient()

    const { data: { user } } = await supabase.auth.getUser()

    if (!user) return { resumes: [], userId: null }

    const { data } = await supabase.from("resumes").select("id, title, updated_at").eq("user_id", user.id).order("updated_at", { ascending: false })

    return { resumes: data || [], userId: user.id }
}

export async function getResumeById(resumeId: string) {
    if (!resumeId) {
        return null
    }

    const supabase = await createClient()

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
        return null
    }

    const { data, error } = await supabase.from("resumes").select("*").eq("id", resumeId).eq("user_id", user.id).single()

    if (error) {
        return null
    }

    return data
}