"use client";
import Add from "@/app/[locale]/(website)/(pages)/product/_comps/add";
import Container from "@/components/ui/container";
import DisplayPrice from "@/components/ui/displayPrice";
import SavingPercentage from "@/components/ui/savingPercentage";
import { Rate } from "antd";
import { useTranslations } from "next-intl";
import RelatedProductList from "../../../_comps/product-stats/relatedProductList";
import ProductImages from "../../_comps/productImage";
import Reviews from "../../_comps/reviews";
import { useProductSeo } from "../../hooks/useProductSeo";

interface ClientProductPageProps {
  product: Product;
}

const ClientProductPage = ({ product }: ClientProductPageProps) => {
  const t = useTranslations("ProductDetails");

  useProductSeo(product);

  return (
    <Container className="mt-1 md:mt-2">
      <div className=" relative flex flex-col lg:flex-row gap-16">
        <div className="w-full lg:w-2/3 lg:sticky top-20 h-max z-10">
          <ProductImages
            images={
              product?.images ? [product.imageCover, ...product.images] : []
            }
          />
        </div>
        {/* TEXTS */}
        <div className="w-full lg:w-1/2 flex flex-col gap-6">
          <h1 className="text-4xl font-medium">{product?.title}</h1>
          <div className="flex items-center gap-4 ">
            <Rate
              disabled
              defaultValue={product.ratingsAverage}
              allowHalf
              className="!text-md"
            />
            <span className="text-sm text-gray-500 space-x-1">
              <span>{product.ratingsQuantity}</span>
              <span>{t("reviews")}</span>
            </span>
          </div>

          <p className="text-gray-500">{product?.description}</p>
          <div className="h-[2px] bg-gray-100" />

          <div className=" space-y-2">
            <DisplayPrice
              afterPrice={product.price}
              beforePrice={product.price + 200}
            />
            <SavingPercentage
              beforePrice={product.price + 200}
              afterPrice={product.price}
            />
          </div>
          <div className="h-[2px] bg-gray-100" />

          <Add product={product} />

          <div className="my-6" />

          <Reviews productId={product?.id!} />
        </div>
      </div>
      <RelatedProductList productId={product?.id!} />
    </Container>
  );
};

export default ClientProductPage;
