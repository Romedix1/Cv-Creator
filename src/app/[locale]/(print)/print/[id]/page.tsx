import { getTemplate } from "@/lib/getTemplate"
import { createClient } from "@supabase/supabase-js"
import { getTranslations } from "next-intl/server"

export default async function PrintPage({ params }: { params: Promise<{ id: string }> }) {
    const tError = await getTranslations("Errors")
    const { id } = await params

    const supabaseAdmin = createClient( process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY! )

    const { data: resume } = await supabaseAdmin.from("resumes").select("*").eq("id", id).single()

    if (!resume) return <div>{tError("cvNotFound")}</div>

    return <main>{getTemplate(resume.template, resume.content)}</main>
}