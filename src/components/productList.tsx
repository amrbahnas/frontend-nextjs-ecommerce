import ProductCard from "./productCard/productCard";
import ProductCardSkeleton from "./productCard/productCard.skeleton";

const layoutClassName = `mt-12 grid   grid-cols-autoFit-250   gap-4`;

const ProductList = ({
  products,
  isLoading,
}: {
  products: Product[];
  isLoading: boolean;
}) => {
  if (isLoading)
    return (
      <div className={layoutClassName}>
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    );

  if (products?.length === 0)
    return (
      <p className="text-center text-2xl font-semibold mt-12">
        No products found
      </p>
    );

  return (
    <div className={layoutClassName}>
      {products?.map((product: Product) => (
        <ProductCard product={product} key={product._id} />
      ))}
    </div>
  );
};

export default ProductList;
