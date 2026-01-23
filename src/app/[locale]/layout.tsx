import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { locales, type Locale } from "@/i18n/config";
import "../globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: "%s | CRQ Prompt Generator",
    default: "CRQ Prompt Generator | AI-Driven Content Creation Tool",
  },
  description:
    "Generate high-quality, structured AI prompts using the CRQ (Context-Refinement-Quality) Framework. Free tool for ChatGPT, Claude, and Gemini.",
  keywords: [
    "AI prompt generator",
    "CRQ framework",
    "prompt engineering",
    "ChatGPT prompts",
    "Claude prompts",
    "content creation",
    "LLM prompts",
  ],
  authors: [{ name: "Inocta.io" }],
  creator: "Inocta.io",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://inocta.io/prompt-generator",
    siteName: "CRQ Prompt Generator",
    title: "CRQ Prompt Generator | AI-Driven Content Creation Tool",
    description:
      "Generate high-quality, structured AI prompts using the CRQ Framework.",
  },
  twitter: {
    card: "summary_large_image",
    title: "CRQ Prompt Generator",
    description:
      "Generate high-quality, structured AI prompts using the CRQ Framework.",
  },
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  // Validate locale at runtime
  const validLocale = locales.includes(locale as Locale) ? (locale as Locale) : 'en';
  setRequestLocale(validLocale);
  const messages = await getMessages();

  return (
    <html lang={validLocale} suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
      </head>
      <body className={`${poppins.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NextIntlClientProvider messages={messages}>
            {children}
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
