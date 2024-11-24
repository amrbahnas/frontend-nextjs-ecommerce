import ProductCard from "./productCard/productCard";
import ProductCardSkeleton from "./productCard/productCard.skeleton";
import NoData from "./ui/noData";
import RenderedCardsGrid from "./ui/renderedCardsGrid";

const ProductList = ({
  products,
  isLoading,
}: {
  products: Product[];
  isLoading: boolean;
}) => {
  if (isLoading)
    return (
      <RenderedCardsGrid length={5}>
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </RenderedCardsGrid>
    );

  if (products?.length === 0)
    return (
      <p className="text-center text-2xl font-semibold mt-12">
        <NoData />
      </p>
    );

  return (
    <RenderedCardsGrid length={products?.length}>
      {products?.map((product: Product) => (
        <ProductCard product={product} key={product._id} />
      ))}
    </RenderedCardsGrid>
  );
};

export default ProductList;
