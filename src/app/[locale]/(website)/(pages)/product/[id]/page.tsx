import ProductStructuredData from "@/components/structured-data/productStructuredData";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProductById } from "../_api/server-actions";
import ClientProductPage from "./_components/ClientProductPage";

type Params = Promise<{ id: string }>;

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) {
    return {
      title: "Product Not Found",
    };
  }

  return {
    title: `${product.title} - El-bahnsawy Store`,
    description:
      product.description || `Shop ${product.title} at great prices.`,
    keywords: product.title
      ?.split(" ")
      .concat(["product", "shopping", "buy online"]),
    openGraph: {
      title: product.title,
      description: product.description,
      images: product.imageCover ? [{ url: product.imageCover }] : [],
      type: "website",
    },
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/product/${id}`,
    },
  };
}

const SinglePage = async ({ params }: { params: Params }) => {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) {
    notFound();
  }

  return (
    <>
      <ProductStructuredData product={product} />
      <ClientProductPage product={product} />
    </>
  );
};

export default SinglePage;
