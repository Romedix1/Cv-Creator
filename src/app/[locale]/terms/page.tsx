import React from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { ArrowLeft, Scale, FileText, AlertCircle, Copyright, Mail } from 'lucide-react';

const SITE_CONFIG = {
    appName: "CV Creator",
    creatorName: "Michał Dobosz",
    address: "Elblągu",
    email: "doboszmichal4@gmail.com",
    date: "14 lutego 2026 r."
}

export default function TermsPage() {
    const t = useTranslations('Terms')

    const richFormat = {
        bold: (chunks: React.ReactNode) => <strong className="text-text-main font-semibold">{chunks}</strong>,
        mailStyle: (chunks: React.ReactNode) => <span className="text-default underline decoration-default/30">{chunks}</span>,
    }

    return (
        <div className="min-h-screen bg-surface-hover py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <Link href="/" className="flex items-center text-base text-text-muted hover:text-default mb-8 duration-200 transition-colors">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    {t('back')}
                </Link>

                <div className="bg-bg-main rounded-2xl border border-border px-4 py-8 md:p-12 shadow-sm">
                    <div className="flex items-center gap-4 mb-10">
                        <div className="p-3 bg-default/10 rounded-xl">
                            <Scale className="w-8 h-8 text-default" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-text-main">{t('title')}</h1>
                            <p className="text-text-muted text-sm mt-1">{t('lastUpdate', { date: SITE_CONFIG.date })}</p>
                        </div>
                    </div>

                    <div className="space-y-10 text-text-muted leading-relaxed">
                        <section>
                            <h2 className="text-xl font-semibold text-text-main mb-4 flex items-center gap-2">
                                <FileText className="w-5 h-5 text-default shrink-0" />
                                {t('section1')}
                            </h2>
                            <p>{t.rich('section1Text', { ...SITE_CONFIG, ...richFormat })}</p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-text-main mb-4">
                                {t('section2')}
                            </h2>
                            <p>{t('section2Text')}</p>
                        </section>

                        <section className="bg-surface-hover rounded-xl border border-border p-6 shadow-inner">
                            <h2 className="text-xl font-semibold text-text-main mb-4 flex items-center gap-2">
                                <AlertCircle className="w-5 h-5 text-default shrink-0" />
                                {t('section3')}
                            </h2>
                            <p className="mb-4">{t('section3Text')}</p>
                            <ul className="space-y-3 pl-2">
                                {[1, 2, 3].map((i) => (
                                    <li key={i} className="flex gap-3 items-start">
                                        <div className="w-1.5 h-1.5 rounded-full bg-default mt-2.5 shrink-0" />
                                        <span className="text-sm">{t(`section3Item${i}` as any)}</span>
                                    </li>
                                ))}
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-text-main mb-4 flex items-center gap-2">
                                <Copyright className="w-5 h-5 text-default shrink-0" />
                                {t('section4')}
                            </h2>
                            <p>{t('section4Text')}</p>
                        </section>

                        <section className="pt-8 border-t border-border">
                            <div className="flex items-center gap-3">
                                <Mail className="w-5 h-5 text-default" />
                                <p className="text-sm">{t.rich('section5Text', { email: SITE_CONFIG.email, ...richFormat })}</p>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    )
}