interface HowToStep {
  name: string;
  text: string;
  image?: string;
  url?: string;
}

interface HowToStructuredDataProps {
  name: string;
  description: string;
  image?: string;
  totalTime?: string; // Format: "PT1H2M3S"
  estimatedCost?: {
    currency: string;
    value: number;
  };
  supply?: string[];
  tool?: string[];
  steps: HowToStep[];
}

const HowToStructuredData = ({
  name,
  description,
  image,
  totalTime,
  estimatedCost,
  supply,
  tool,
  steps,
}: HowToStructuredDataProps) => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name,
    description,
    ...(image && { image }),
    ...(totalTime && { totalTime }),
    ...(estimatedCost && {
      estimatedCost: {
        "@type": "MonetaryAmount",
        currency: estimatedCost.currency,
        value: estimatedCost.value,
      },
    }),
    ...(supply && {
      supply: supply.map((item) => ({
        "@type": "HowToSupply",
        name: item,
      })),
    }),
    ...(tool && {
      tool: tool.map((item) => ({
        "@type": "HowToTool",
        name: item,
      })),
    }),
    step: steps.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: step.name,
      text: step.text,
      ...(step.image && { image: step.image }),
      ...(step.url && { url: step.url }),
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
};

export default HowToStructuredData;
