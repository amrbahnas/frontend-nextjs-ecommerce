interface OfferStructuredDataProps {
  productId: string;
  productName: string;
  price: number;
  priceCurrency: string;
  availability: "InStock" | "OutOfStock" | "PreOrder";
  condition?: "NewCondition" | "UsedCondition" | "RefurbishedCondition";
  validFrom?: string;
  priceValidUntil?: string;
  url: string;
}

const OfferStructuredData = ({
  productId,
  productName,
  price,
  priceCurrency,
  availability,
  condition = "NewCondition",
  validFrom,
  priceValidUntil,
  url,
}: OfferStructuredDataProps) => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Offer",
    itemOffered: {
      "@type": "Product",
      productID: productId,
      name: productName,
      url: url,
    },
    price: price,
    priceCurrency: priceCurrency,
    availability: `https://schema.org/${availability}`,
    itemCondition: `https://schema.org/${condition}`,
    ...(validFrom && { validFrom }),
    ...(priceValidUntil && { priceValidUntil }),
    seller: {
      "@type": "Organization",
      name: "store-Amr",
      url: process.env.NEXT_PUBLIC_SITE_URL,
    },
    priceSpecification: {
      "@type": "PriceSpecification",
      price: price,
      priceCurrency: priceCurrency,
      valueAddedTaxIncluded: true,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
};

export default OfferStructuredData;
