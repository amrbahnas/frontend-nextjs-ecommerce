interface SearchResultsStructuredDataProps {
  query: string;
  totalResults: number;
  currentPage: number;
  resultsPerPage: number;
  results: Array<{
    name: string;
    url: string;
    image?: string;
    description?: string;
  }>;
}

const SearchResultsStructuredData = ({
  query,
  totalResults,
  currentPage,
  resultsPerPage,
  results,
}: SearchResultsStructuredDataProps) => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SearchResultsPage",
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: totalResults,
      itemListOrder: "https://schema.org/ItemListOrderDescending",
      itemListElement: results.map((result, index) => ({
        "@type": "ListItem",
        position: (currentPage - 1) * resultsPerPage + index + 1,
        item: {
          "@type": "Product",
          name: result.name,
          url: result.url,
          ...(result.image && { image: result.image }),
          ...(result.description && { description: result.description }),
        },
      })),
    },
    about: {
      "@type": "Thing",
      name: `Search results for "${query}"`,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
};

export default SearchResultsStructuredData;
