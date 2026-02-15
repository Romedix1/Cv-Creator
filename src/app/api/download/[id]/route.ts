import { NextResponse } from 'next/server';
import { getBrowserInstance } from '@/lib/browser';
import { createClient as createClientAdmin } from "@supabase/supabase-js";

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const { searchParams } = new URL(request.url)
    const locale = searchParams.get('locale') || 'pl'
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

    let browser
    let finalResumeData = null
    let finalTemplate = "modern-blue"

    try {
        const contentType = request.headers.get("content-type")
        if (contentType && contentType.includes("application/json")) {
            try {
                const body = await request.json()
                if (body && body.resumeData) {
                    finalResumeData = body.resumeData
                    finalTemplate = body.resumeData?.settings?.template || "modern-blue"
                }
            } catch {}
        }

        if (!finalResumeData) {
            if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
                throw new Error("Missing SUPABASE_SERVICE_ROLE_KEY")
            }

            const supabaseAdmin = createClientAdmin(
                process.env.NEXT_PUBLIC_SUPABASE_URL!,
                process.env.SUPABASE_SERVICE_ROLE_KEY!
            )

            const { data: resume, error: dbError } = await supabaseAdmin.from("resumes").select("*").eq("id", id).maybeSingle()

            if (dbError) {
                return NextResponse.json({ error: dbError.message }, { status: 500 })
            }

            if (!resume) {
                return NextResponse.json({ error: "CV_NOT_FOUND_IN_DATABASE" }, { status: 404 })
            }

            finalResumeData = resume.content
            finalTemplate = resume.template || "modern-blue"
        }

        browser = await getBrowserInstance()
        const page = await browser.newPage()

        await page.goto(`${baseUrl}/${locale}/print/${id}`, { waitUntil: 'networkidle0' })

        await page.evaluate(({ resumeId, data, template }) => {
            localStorage.setItem(`guest_resume_${resumeId}`, JSON.stringify(data))
            localStorage.setItem(`guest_template_${resumeId}`, template)
        }, { resumeId: id, data: finalResumeData, template: finalTemplate })

        await page.reload({ waitUntil: 'networkidle0' })
        await page.waitForSelector('#resume-preview', { timeout: 10000 })

        const pdfData = await page.pdf({
            format: 'A4',
            printBackground: true,
            margin: { top: '0px', right: '0px', bottom: '0px', left: '0px' }
        })

        return new NextResponse(Buffer.from(pdfData), {
            status: 200,
            headers: {
                'Content-Type': 'application/pdf',
                'Content-Disposition': `attachment; filename="cv.pdf"`
            }
        })
    } catch {
        return NextResponse.json({ error: "Internal server error" }, { status: 500 })
    } finally {
        if (browser) {
            await browser.close()
        }
    }
}