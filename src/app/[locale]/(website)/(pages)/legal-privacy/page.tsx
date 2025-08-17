import Container from "@/components/ui/container";
import React from "react";
import { getTranslations } from "next-intl/server";
import { Metadata } from "next";

// Generate metadata for SEO
export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("legalPrivacy");

  return {
    title: t("title"),
    description: t("description"),
    keywords: [
      "privacy policy",
      "terms of service",
      "legal",
      "data protection",
    ],
    openGraph: {
      title: t("title"),
      description: t("description"),
      type: "website",
    },
  };
}

const LegalPrivacy = async () => {
  const t = await getTranslations("legalPrivacy");

  return (
    <Container className="flex flex-col items-center justify-center min-h-96 py-16">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">{t("title")}</h1>
      <p className="text-lg text-gray-600 max-w-3xl mb-6 text-center">
        {t("description")}
      </p>
      <div className="space-y-4 text-gray-600 max-w-3xl">
        <h2 className="text-2xl font-semibold">{t("privacy.title")}</h2>
        <p>{t("privacy.content")}</p>
        <h2 className="text-2xl font-semibold">{t("terms.title")}</h2>
        <p>{t("terms.content")}</p>
      </div>
    </Container>
  );
};

export default LegalPrivacy;
