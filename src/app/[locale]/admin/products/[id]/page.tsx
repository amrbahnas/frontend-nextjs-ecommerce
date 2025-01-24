import React from "react";
import ProductForm from "../_comps/productForm";

const EditProduct = async ({ params }: { params: Params }) => {
  const { id } = await params;

  return (
    <div className=" flex items-center justify-center  ">
      <ProductForm id={id} />
    </div>
  );
};

export default EditProduct;
