"use client";
import Add from "@/app/(website)/(pages)/product/_comps/add";

import Reviews from "../_comps/reviews/reviews";

import { useGetSpecificProduct } from "../_api/query";
import Container from "@/components/container";
import ProductImages from "../_comps/productImage";

const SinglePage = ({ params }: { params: { id: string } }) => {
  const { product, error, isLoading, refetch } = useGetSpecificProduct(
    params.id
  );

  return (
    <Container className="mt-8">
      <div className=" relative flex flex-col lg:flex-row gap-16">
        {/* IMG */}
        <div className="w-full lg:w-1/2 lg:sticky top-20 h-max">
          <ProductImages
            images={
              product.images ? [product.imageCover, ...product.images] : []
            }
          />
        </div>
        {/* TEXTS */}
        <div className="w-full lg:w-1/2 flex flex-col gap-6">
          <h1 className="text-4xl font-medium">{product?.title}</h1>
          <p className="text-gray-500">{product?.description}</p>
          <div className="h-[2px] bg-gray-100" />
          {/* price */}

          <div className="flex items-center gap-4">
            <h3 className="text-xl text-gray-500 line-through">
              ${product?.price + 100}
            </h3>
            <h2 className="font-medium text-2xl">${product?.price}</h2>
          </div>

          <div className="h-[2px] bg-gray-100" />
          {/* {product?.variants && product.productOptions ? (
            <CustomizeProducts
              productId={product._id!}
              variants={product.variants}
              productOptions={product.productOptions}
            />
          ) : (
            <Add
              productId={product._id!}
              variantId="00000000-0000-0000-0000-000000000000"
              stockNumber={product.quantity || 0}
            />
          )} */}
          <Add product={product} />
          <div className="h-[2px] bg-gray-100" />
          {/* {product?.additionalInfoSections?.map((section: any, index) => (
            <div className="text-sm" key={section.title + index}>
              <h4 className="font-medium mb-4">{section.title}</h4>
              <p>{section.description}</p>
            </div>
          ))} */}
          <div className="h-[2px] bg-gray-100" />
          {/* REVIEWS */}
          <h1 className="text-2xl">User Reviews</h1>

          <Reviews productId={product?._id!} />
        </div>
      </div>
    </Container>
  );
};

export default SinglePage;
