"use client";
import Add from "@/app/(website)/(pages)/product/_comps/add";
import Reviews from "../_comps/reviews/reviews";
import Container from "@/components/container";
import { Rate } from "antd";
import { MdLocalOffer } from "react-icons/md";
import { useGetSpecificProduct } from "../_api/query";
import ProductSkeleton from "../_comps/product.skeketon";
import ProductImages from "../_comps/productImage";

const SinglePage = ({ params }: { params: { id: string } }) => {
  const { product, error, isLoading, refetch } = useGetSpecificProduct(
    params.id
  );

  if (isLoading) return <ProductSkeleton />;

  return (
    <Container className="mt-8">
      <div className=" relative flex flex-col lg:flex-row gap-16">
        {/* IMG */}
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
          {/* price */}

          <div>
            <div className="flex items-center gap-4">
              <h2 className="font-bold text-2xl">${product?.price}</h2>
              <h3 className="text-xl text-gray-500 line-through">
                ${product?.price + 100}
              </h3>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600  mt-2">
              <MdLocalOffer />
              <span>Save 50% right now</span>
            </div>
          </div>

          <div className="h-[2px] bg-gray-100" />

          <Add product={product} />

          <div className="h-[2px] bg-gray-100" />
          {/* REVIEWS */}

          <Reviews productId={product?._id!} />
        </div>
      </div>
    </Container>
  );
};

export default SinglePage;
