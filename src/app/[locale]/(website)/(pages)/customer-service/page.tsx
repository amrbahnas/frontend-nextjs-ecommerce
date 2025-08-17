import Container from "@/components/ui/container";
import React from "react";
import { getTranslations } from "next-intl/server";
import { Metadata } from "next";

// Generate metadata for SEO
export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("customerService");

  return {
    title: t("title"),
    description: t("description"),
    keywords: ["customer service", "support", "contact", "help"],
    openGraph: {
      title: t("title"),
      description: t("description"),
      type: "website",
    },
  };
}

const CustomerService = async () => {
  const t = await getTranslations("customerService");

  return (
    <Container className="flex flex-col items-center justify-center min-h-96 py-16">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">{t("title")}</h1>
      <p className="text-lg text-gray-600 max-w-3xl text-center mb-6">
        {t("description")}
      </p>
      <div className="space-y-4 max-w-lg text-center">
        <p className="text-gray-700">
          {t("contact.call")}:{" "}
          <span className="font-semibold">+201064480375</span>
        </p>
        <p className="text-gray-700">
          {t("contact.email")}:{" "}
          <span className="font-semibold">elbahnsawy.work@gmail.com</span>
        </p>
        <p className="text-gray-700">
          {t("contact.liveChat")}: {t("contact.liveChatHours")}
        </p>
      </div>
    </Container>
  );
};

export default CustomerService;
