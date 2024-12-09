import React from "react";
import ProductForm from "../_comps/productForm";

const EditProduct = async (props: { params: Promise<{ id: string }> }) => {
  const params = await props.params;

  const {
    id
  } = params;

  return (
    <div className=" flex items-center justify-center  ">
      <ProductForm id={id} />
    </div>
  );
};

export default EditProduct;
