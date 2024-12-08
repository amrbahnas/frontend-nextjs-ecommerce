"use client";
import Add from "@/app/[locale]/(website)/(pages)/product/_comps/add";
import Container from "@/components/container";
import DisplayPrice from "@/components/ui/displayPrice";
import SavingPercentage from "@/components/ui/savingPercentage";
import { Rate } from "antd";
import { useGetSpecificProduct } from "../_api/query";
import ProductSkeleton from "../_comps/product.skeketon";
import ProductImages from "../_comps/productImage";
import Reviews from "../_comps/reviews";

const SinglePage = ({ params }: { params: { id: string } }) => {
  const { product, isLoading } = useGetSpecificProduct(params.id);

  if (isLoading) return <ProductSkeleton />;

  return (
    <Container className="mt-1 md:mt-2">
      <div className=" relative flex flex-col lg:flex-row gap-16">
        <div className="w-full lg:w-2/3 lg:sticky top-20 h-max">
          <ProductImages
            images={
              product.images ? [product.imageCover, ...product.images] : []
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
              <span>reviews</span>
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

          <div className="h-[2px] bg-gray-100" />

          <Reviews productId={product?._id!} />
        </div>
      </div>
    </Container>
  );
};

export default SinglePage;
