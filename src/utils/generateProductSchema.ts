interface ProductDetails {
  id: string;
  name: string;
  description: string;
  image: string[];
  price: number;
  currency: string;
  sku?: string;
  brand?: string;
  category?: string;
  availability: "InStock" | "OutOfStock" | "PreOrder";
  condition?: "NewCondition" | "UsedCondition" | "RefurbishedCondition";
  reviews?: Array<{
    author: string;
    rating: number;
    content: string;
    date: string;
  }>;
  aggregateRating?: {
    ratingValue: number;
    reviewCount: number;
  };
  variants?: Array<{
    sku: string;
    name: string;
    price: number;
    availability: "InStock" | "OutOfStock" | "PreOrder";
  }>;
  weight?: {
    value: number;
    unit: string;
  };
  dimensions?: {
    length: number;
    width: number;
    height: number;
    unit: string;
  };
}

const generateProductSchema = (product: ProductDetails) => {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;

  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${baseUrl}/products/${product.id}#product`,
    name: product.name,
    description: product.description,
    image: product.image,
    sku: product.sku,
    ...(product.brand && {
      brand: {
        "@type": "Brand",
        name: product.brand,
      },
    }),
    ...(product.category && {
      category: product.category,
    }),
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: product.currency,
      availability: `https://schema.org/${product.availability}`,
      ...(product.condition && {
        itemCondition: `https://schema.org/${product.condition}`,
      }),
      url: `${baseUrl}/products/${product.id}`,
      seller: {
        "@type": "Organization",
        name: "Shope-Amr",
        url: baseUrl,
      },
    },
    ...(product.aggregateRating && {
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: product.aggregateRating.ratingValue,
        reviewCount: product.aggregateRating.reviewCount,
      },
    }),
    ...(product.reviews && {
      review: product.reviews.map((review) => ({
        "@type": "Review",
        author: {
          "@type": "Person",
          name: review.author,
        },
        reviewRating: {
          "@type": "Rating",
          ratingValue: review.rating,
        },
        reviewBody: review.content,
        datePublished: review.date,
      })),
    }),
    ...(product.variants && {
      hasVariant: product.variants.map((variant) => ({
        "@type": "Product",
        name: variant.name,
        sku: variant.sku,
        offers: {
          "@type": "Offer",
          price: variant.price,
          priceCurrency: product.currency,
          availability: `https://schema.org/${variant.availability}`,
        },
      })),
    }),
    ...(product.weight && {
      weight: {
        "@type": "QuantitativeValue",
        value: product.weight.value,
        unitText: product.weight.unit,
      },
    }),
    ...(product.dimensions && {
      height: {
        "@type": "QuantitativeValue",
        value: product.dimensions.height,
        unitText: product.dimensions.unit,
      },
      width: {
        "@type": "QuantitativeValue",
        value: product.dimensions.width,
        unitText: product.dimensions.unit,
      },
      depth: {
        "@type": "QuantitativeValue",
        value: product.dimensions.length,
        unitText: product.dimensions.unit,
      },
    }),
  };

  return schema;
};

export default generateProductSchema;
