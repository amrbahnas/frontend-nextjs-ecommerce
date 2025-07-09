interface VideoStructuredDataProps {
  name: string;
  description: string;
  thumbnailUrl: string;
  uploadDate: string;
  contentUrl: string;
  duration?: string; // Format: "PT1H2M3S" for 1 hour, 2 minutes, 3 seconds
  embedUrl?: string;
  width?: number;
  height?: number;
}

const VideoStructuredData = ({
  name,
  description,
  thumbnailUrl,
  uploadDate,
  contentUrl,
  duration,
  embedUrl,
  width,
  height,
}: VideoStructuredDataProps) => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name,
    description,
    thumbnailUrl,
    uploadDate,
    contentUrl,
    ...(duration && { duration }),
    ...(embedUrl && { embedUrl }),
    ...(width &&
      height && {
        width,
        height,
      }),
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

export default VideoStructuredData;
