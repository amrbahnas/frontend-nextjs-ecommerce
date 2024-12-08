import { useGetProducts } from "@/_api/query";
import ProductList from "@/components/productList";
import { useTranslations } from 'next-intl';
import React from "react";

const FeaturedProducts = () => {
  const { isLoading, products } = useGetProducts();
  const t = useTranslations('HomePage');

  return (
    <div>
      <h1 className="text-2xl mt-6">{t('featuredProducts')}</h1>
      <ProductList products={products} isLoading={isLoading} />
    </div>
  );
};

export default FeaturedProducts;
