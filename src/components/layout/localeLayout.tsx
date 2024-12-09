import { NextIntlClientProvider } from "next-intl";

const locales = ["en", "ar"];

export default async function LocaleLayout({
  children,
  locale = "en", // default to English if no locale provided
}: {
  children: React.ReactNode;
  locale?: string;
}) {
  if (!locales.includes(locale as any)) {
    locale = "en"; // fallback to English if invalid locale
  }

  let messages;
  try {
    messages = (await import(`../../../messages/${locale}.json`)).default;
  } catch (error) {
    messages = (await import(`../../../messages/en.json`)).default;
  }

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}
