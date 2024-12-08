import React from "react";
import ProductForm from "../_comps/productForm";

const EditProduct = ({ params: { id } }: { params: { id: string } }) => {
  return (
    <div className=" flex items-center justify-center  ">
      <ProductForm id={id} />
    </div>
  );
};

export default EditProduct;
