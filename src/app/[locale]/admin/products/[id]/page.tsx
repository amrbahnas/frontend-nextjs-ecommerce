import React from "react";
import ProductForm from "../_comps/productForm";

const EditProduct = ({ params }: { params: { id: string } }) => {
  const { id } = params;

  return (
    <div className=" flex items-center justify-center  ">
      <ProductForm id={id} />
    </div>
  );
};

export default EditProduct;
