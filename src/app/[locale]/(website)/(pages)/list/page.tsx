import { Metadata } from "next";
// import { getTranslations } from "next-intl/server";
import ClientListPage from "./_components/ClientListPage";

// Generate metadata for SEO
export const metadata: Metadata = {
  title: "Product Catalog - Browse Our Collection",
  description:
    "Browse our extensive collection of products. Find the best deals and latest arrivals.",
  keywords: ["products", "catalog", "shopping", "deals", "collection"],
  openGraph: {
    title: "Product Catalog",
    description: "Browse our extensive collection of products.",
    type: "website",
  },
};

// Enable ISR with revalidation every 1800 seconds (30 minutes)
export const revalidate = 1800;

const ListPage = async () => {
  return <ClientListPage />;
};

export default ListPage;
