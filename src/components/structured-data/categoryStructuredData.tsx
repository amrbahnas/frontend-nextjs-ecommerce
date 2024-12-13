interface CategoryStructuredDataProps {
  name: string;
  description: string;
  image: string;
  parentCategory?: string;
  url: string;
}

const CategoryStructuredData = ({
  name,
  description,
  image,
  parentCategory,
  url,
}: CategoryStructuredDataProps) => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ProductGroup",
    name: name,
    description: description,
    image: image,
    url: url,
    ...(parentCategory && {
      isPartOf: {
        "@type": "ProductGroup",
        name: parentCategory,
      },
    }),
    offers: {
      "@type": "AggregateOffer",
      availability: "https://schema.org/InStock",
      priceCurrency: "USD",
      seller: {
        "@type": "Organization",
        name: "Shope-Amr",
        url: process.env.NEXT_PUBLIC_SITE_URL,
      },
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
};

export default CategoryStructuredData;
