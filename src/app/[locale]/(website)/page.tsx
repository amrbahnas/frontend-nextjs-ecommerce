import { Metadata } from "next";
import ClientHomePage from "./_components/ClientHomePage";

// Generate metadata for SEO
export const metadata: Metadata = {
  title: "El-bahnsawy store | Your Premier E-commerce Destination",
  description:
    "Discover amazing products at great prices. Shop the latest trends in fashion, electronics, and more.",
  keywords: [
    "e-commerce",
    "online shopping",
    "fashion",
    "electronics",
    "best deals",
  ],
  openGraph: {
    title: "El-bahnsawy store",
    description: "Your Premier E-commerce Destination",
    type: "website",
  },
};

// Enable ISR with revalidation every 3600 seconds (1 hour)
export const revalidate = 3600;

const HomePage = async () => {
  return <ClientHomePage />;
};

export default HomePage;
