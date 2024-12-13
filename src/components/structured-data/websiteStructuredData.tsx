const WebsiteStructuredData = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Shope-Amr",
    url: process.env.NEXT_PUBLIC_SITE_URL,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${process.env.NEXT_PUBLIC_SITE_URL}/search?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    },
    sameAs: [
      "https://www.facebook.com/amr.bahnas.75",
      "https://www.linkedin.com/in/amr-elbahnsawy/",
      "https://www.instagram.com/amr_elbahnsawy/"
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
};

export default WebsiteStructuredData;
