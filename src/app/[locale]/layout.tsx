import { Metadata } from "next";
import { Inter } from "next/font/google";
import ProgressBarLayout from "@/components/layout/progressBarLayout";
import AntDLayout from "@/components/layout/antDLayout";
import ReactQueryLayout from "@/components/layout/reactQueryLayout";
import OnlineStatus from "@/components/layout/onlineStatus";
import { NextIntlClientProvider } from "next-intl";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Shope-Amr",
  description: "A complete e-commerce application with Next.js and Node.js",
};

async function getMessages(locale: string) {
  try {
    return (await import(`../../../messages/${locale}.json`)).default;
  } catch (error) {
    return (await import(`../../../messages/en.json`)).default;
  }
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const messages = await getMessages(locale);
  const dir = locale === "ar" ? "rtl" : "ltr";

  return (
    <html lang={locale} dir={dir}>
      <head>
        <script src="https://unpkg.com/react-scan/dist/auto.global.js" async />
      </head>
      <body className={inter.className}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <AntDLayout>
            <ReactQueryLayout>
              <OnlineStatus>
                <ProgressBarLayout>{children}</ProgressBarLayout>
              </OnlineStatus>
            </ReactQueryLayout>
          </AntDLayout>
          <Toaster />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
