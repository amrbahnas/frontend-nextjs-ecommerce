interface ReviewStructuredDataProps {
  productName: string;
  productImage: string;
  reviewRating: number;
  reviewAuthor: string;
  reviewText: string;
  datePublished: string;
}

const ReviewStructuredData = ({
  productName,
  productImage,
  reviewRating,
  reviewAuthor,
  reviewText,
  datePublished,
}: ReviewStructuredDataProps) => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Review",
    itemReviewed: {
      "@type": "Product",
      name: productName,
      image: productImage,
    },
    reviewRating: {
      "@type": "Rating",
      ratingValue: reviewRating,
      bestRating: "5",
    },
    author: {
      "@type": "Person",
      name: reviewAuthor,
    },
    reviewBody: reviewText,
    datePublished: datePublished,
    publisher: {
      "@type": "Organization",
      name: "store-Amr",
      logo: {
        "@type": "ImageObject",
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/logo.png`,
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

export default ReviewStructuredData;
