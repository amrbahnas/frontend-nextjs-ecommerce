import Container from "@/components/ui/container";
import React from "react";
import { useTranslations } from "next-intl";

const FindAStore = () => {
  const t = useTranslations("findStore");

  return (
    <Container className="flex flex-col items-center justify-center min-h-96 py-16">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">{t("title")}</h1>
      <p className="text-lg text-gray-600 mb-6 max-w-2xl text-center">
        {t("description")}
      </p>
      <div className="w-full max-w-md">
        <input
          type="text"
          placeholder={t("form.placeholder")}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        />
        <button
          type="button"
          className="w-full mt-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700"
        >
          {t("form.submit")}
        </button>
      </div>
    </Container>
  );
};

export default FindAStore;
