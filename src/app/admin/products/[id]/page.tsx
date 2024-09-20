import React from "react";
import ProductForm from "../_comps/productForm";

const EditProduct = ({ params: { id } }: { params: { id: string } }) => {
  return <ProductForm id={id} />;
};

export default EditProduct;
