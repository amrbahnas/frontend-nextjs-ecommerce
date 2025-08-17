"use client";
import Container from "@/components/ui/container";
import { Button } from "antd";
import { Suspense } from "react";
import ProductSection from "../_comps/productSection";
import Filter from "../_comps/filter";
import NextImage from "@/components/ui/nextImage";
import useParamsService from "@/hooks/global/useParamsService";
import { useTranslations } from "next-intl";

const ClientListPage = () => {
  const t = useTranslations("list");
  const { getParams } = useParamsService("okay I will");
  const search = getParams("search");

  return (
    <Container>
      {/* CAMPAIGN */}
      <div className="hidden bg-pink-50 dark:bg-pink-900/20 px-4 sm:flex justify-between h-64">
        <div className="w-2/3 flex flex-col items-center justify-center gap-8">
          <h1 className="text-4xl font-semibold leading-[48px] text-gray-700 dark:text-dark-text">
            {t("campaign.title")}
          </h1>
          <Button className="rounded-3xl w-max !py-4 px-5 text-sm">
            {t("campaign.button")}
          </Button>
        </div>
        <div className="relative w-1/3">
          <NextImage
            src="/woman.png"
            alt=""
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 100vw, 50vw"
            className="object-contain "
          />
        </div>
      </div>
      {/* FILTER */}
      <Filter />
      {/* PRODUCTS */}
      <h1 className="text-xl font-semibold mb-4">
        {search ? t("search.results", { search }) : t("search.bestPicks")}
      </h1>
      <ProductSection />
    </Container>
  );
};

export default ClientListPage;
