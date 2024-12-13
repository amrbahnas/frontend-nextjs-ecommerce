interface AggregateRatingStructuredDataProps {
  productName: string;
  ratingValue: number;
  reviewCount: number;
  bestRating?: number;
  worstRating?: number;
}

const AggregateRatingStructuredData = ({
  productName,
  ratingValue,
  reviewCount,
  bestRating = 5,
  worstRating = 1,
}: AggregateRatingStructuredDataProps) => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: productName,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: ratingValue,
      reviewCount: reviewCount,
      bestRating: bestRating,
      worstRating: worstRating,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
};

export default AggregateRatingStructuredData;
