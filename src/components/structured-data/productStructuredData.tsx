interface ProductStructuredDataProps {
  product: {
    _id: string;
    title: string;
    description: string;
    price: number;
    imageCover: string;
    ratingsAverage: number;
    ratingsQuantity: number;
    images: string[];
  };
}

const ProductStructuredData = ({ product }: ProductStructuredDataProps) => {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    description: product.description,
    image: [product.imageCover, ...product.images],
    sku: product._id,
    mpn: product._id,
    brand: {
      '@type': 'Brand',
      name: 'Shope-Amr',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: product.ratingsAverage,
      reviewCount: product.ratingsQuantity,
    },
    offers: {
      '@type': 'Offer',
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/product/${product._id}`,
      priceCurrency: 'USD',
      price: product.price,
      itemCondition: 'https://schema.org/NewCondition',
      availability: 'https://schema.org/InStock',
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
