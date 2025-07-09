import { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import ProgressBarLayout from "@/components/layout/progressBarLayout";
import AntDLayout from "@/components/layout/antDLayout";
import ReactQueryLayout from "@/components/layout/reactQueryLayout";
import OnlineStatus from "@/components/layout/onlineStatus";
import DayjsConfig from "@/components/layout/dayjsConfig";
import { NextIntlClientProvider } from "next-intl";
import { Toaster } from "react-hot-toast";
import WebsiteStructuredData from "@/components/structured-data/websiteStructuredData";
import LocalBusinessStructuredData from "@/components/structured-data/localBusinessStructuredData";
import ChatLayout from "@/components/layout/chatLayout";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
  ),
  title: {
    template: "%s | Elbahnsawy-shop",
    default: "Elbahnsawy-shop | Your Premier E-commerce Destination",
  },
  description:
    "Discover a wide range of quality products at Elbahnsawy-shop. Shop the latest trends in fashion, electronics, and more with secure payment and fast delivery.",
  keywords: [
    "e-commerce",
    "online shopping",
    "fashion",
    "electronics",
    "home goods",
    "accessories",
    "best deals",
    "secure shopping",
    "fast delivery",
    "Elbahnsawy-shop",
  ],
  authors: [
    {
      name: "Amr Elbahnsawy-shop",
      url: "https://www.linkedin.com/in/amr-Elbahnsawy-shop/",
    },
  ],
  creator: "Amr Elbahnsawy-shop",
  publisher: "Elbahnsawy-shop",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/en",
      "ar-EG": "/ar",
    },
  },
  openGraph: {
    title: "Elbahnsawy-shop | Your Premier E-commerce Destination",
    description:
      "Discover a wide range of quality products at Elbahnsawy-shop. Shop the latest trends in fashion, electronics, and more with secure payment and fast delivery.",
    url: process.env.NEXT_PUBLIC_SITE_URL,
    siteName: "Elbahnsawy-shop",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/preview.png`,
        width: 1200,
        height: 630,
        alt: "Elbahnsawy-shop - Your Premier E-commerce Destination",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Elbahnsawy-shop | Your Premier E-commerce Destination",
    description:
      "Discover a wide range of quality products at Elbahnsawy-shop. Shop the latest trends in fashion, electronics, and more with secure payment and fast delivery.",
    images: [`${process.env.NEXT_PUBLIC_SITE_URL}/preview.png`],
    creator: "@amr_Elbahnsawy-shop",
    site: "@amr_Elbahnsawy-shop",
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "E-commerce",
};

type Params = Promise<{ locale: string }>;
export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Params;
}) {
  const { locale } = await params;

  const dir = locale === "ar" ? "rtl" : "ltr";

  return (
    <html lang={locale} dir={dir}>
      <head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/icons/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/icons/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/icons/favicon-16x16.png"
        />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black" />
        <meta name="apple-mobile-web-app-title" content="Elbahnsawy-shop" />
        <meta name="theme-color" content="#F35C7A" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <WebsiteStructuredData />
        <LocalBusinessStructuredData />
        <NextIntlClientProvider locale={locale}>
          <ReactQueryLayout>
            <AntDLayout locale={locale}>
              <ProgressBarLayout>
                <DayjsConfig />
                <OnlineStatus>{children}</OnlineStatus>
                <ChatLayout />
              </ProgressBarLayout>
            </AntDLayout>
          </ReactQueryLayout>
          <Toaster />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
