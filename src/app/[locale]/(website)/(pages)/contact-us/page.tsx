import Container from "@/components/ui/container";
import React from "react";
import { Divider } from "antd";
import { getTranslations } from "next-intl/server";
import { Metadata } from "next";
import ClientContactForm from "./_components/ClientContactForm";

// Generate metadata for SEO
export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("contactUs");

  return {
    title: t("title"),
    description: t("description"),
    keywords: ["contact", "contact us", "support", "help", "get in touch"],
    openGraph: {
      title: t("title"),
      description: t("description"),
      type: "website",
    },
  };
}

const ContactUs = async () => {
  const t = await getTranslations("contactUs");

  return (
    <Container className="flex flex-col items-center justify-center min-h-96 py-16">
      <Divider className="mb-4">
        <h3 className="text-4xl font-bold text-gray-800">{t("title")}</h3>
      </Divider>
      <p className="text-lg text-gray-600 mb-6 max-w-2xl text-center">
        {t("description")}
      </p>
      <ClientContactForm />
    </Container>
  );
};

export default ContactUs;
