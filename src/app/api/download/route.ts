import { NextResponse } from 'next/server';
import { getBrowserInstance } from '@/lib/browser';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    const title = searchParams.get('title')
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

    if (!id) {
        return NextResponse.json({ error: "Missing ID" }, { status: 400 })
    }

    let browser

    try {
        const fileName = title ? `${title.replace(/\s+/g, '_')}.pdf`: `cv-${id}.pdf`

        browser = await getBrowserInstance()
        const page = await browser.newPage()

        await page.goto(`${baseUrl}/en/print/${id}`, { waitUntil: 'networkidle0', timeout: 30000 })

        const pdfData = await page.pdf({
            format: 'A4',
            printBackground: true,
            margin: { top: '0px', right: '0px', bottom: '0px', left: '0px' }
        })

        await browser.close()

        return new NextResponse(Buffer.from(pdfData), { status: 200, headers: { 'Content-Type': 'application/pdf', 'Content-Disposition': `attachment; filename="${encodeURIComponent(fileName)}"`}})
    } catch {
        if (browser) {
            await browser.close()
        }

        return NextResponse.json({ error: "Internal server error" }, { status: 500 })
    }
}