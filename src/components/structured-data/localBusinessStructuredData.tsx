const LocalBusinessStructuredData = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Shope-Amr",
    url: process.env.NEXT_PUBLIC_SITE_URL,
    logo: `${process.env.NEXT_PUBLIC_SITE_URL}/logo.png`,
    sameAs: [
      "https://www.facebook.com/amr.bahnas.75",
      "https://www.linkedin.com/in/amr-elbahnsawy/",
      "https://www.instagram.com/amr_elbahnsawy/",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+201064480375",
      contactType: "customer service",
      areaServed: "Worldwide",
      availableLanguage: ["English", "Arabic"],
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: "Your Street Address",
      addressLocality: "Your City",
      addressRegion: "Your Region",
      postalCode: "Your Postal Code",
      addressCountry: "Your Country",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
};

export default LocalBusinessStructuredData;
