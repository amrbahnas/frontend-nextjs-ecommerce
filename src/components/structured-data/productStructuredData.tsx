const ProductStructuredData = ({ product }: { product: Product }) => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product?.title,
    description: product?.description,
    image: [product?.imageCover, ...(product?.images || [])],
    sku: product?.id,
    mpn: product?.id,
    brand: {
      "@type": "Brand",
      name: "Shope-Amr",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product?.ratingsAverage,
      reviewCount: product?.ratingsQuantity,
    },
    offers: {
      "@type": "Offer",
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/product/${product?.id}`,
      priceCurrency: "USD",
      price: product?.price,
      itemCondition: "https://schema.org/NewCondition",
      availability: "https://schema.org/InStock",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
};

export default ProductStructuredData;
