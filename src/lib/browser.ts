import chromium from '@sparticuz/chromium';
import { getTranslations } from 'next-intl/server';
import puppeteer from 'puppeteer-core';

export async function getBrowserInstance() {
    const tError = await getTranslations("Errors")

    const isLocal = process.env.NODE_ENV === 'development'

    if (isLocal) {
        const executablePath = process.env.CHROME_PATH

        if (!executablePath) {
            throw new Error(tError("chrome"))
        }

        return puppeteer.launch({ args: [], executablePath, headless: true })
    }

    return puppeteer.launch({ args: chromium.args, executablePath: await chromium.executablePath(), headless: true})
}