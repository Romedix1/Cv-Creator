import type { Metadata } from "next";
import "@/app/globals.css";
import { DM_Sans } from "next/font/google";
import {ThemeProvider as NextThemesProvider} from "next-themes";
import { cookies } from "next/headers";
import { NextIntlClientProvider } from "next-intl";
import { cn } from "@/lib/utils";
import { getTranslations } from "next-intl/server";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-dm-sans",
});

export async function generateMetadata() {
  const tMetadata = await getTranslations("Metadata.mainPage")

  return {
    title: {
      default: tMetadata("title"),
      template: `%s | ${tMetadata("siteName")}`
    },
    description: tMetadata("description"),
  }
}

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode}>) {
  const cookieStore = await cookies();
  const themeCookie = cookieStore.get("theme");
  const theme = themeCookie?.value || "light";

  return (
    <html lang="en" className={theme} suppressHydrationWarning>
        <body className={cn("transition-[background-color,color,border-color] duration-500 bg-background text-main antialiased", dmSans.variable)}>
          <NextIntlClientProvider>
            <NextThemesProvider attribute="class" defaultTheme={theme} enableSystem={false}>
              {children}
            </NextThemesProvider>
          </NextIntlClientProvider>
      </body>
    </html>
  );
}
