import React from "react";
import SEOHeading from "./sEOHeading";
import SEOImage from "./sEOImage";

interface Product {
  id: string;
  name: string;
  image: string;
  price: number;
  currency: string;
  features: Record<string, string | number | boolean>;
}

interface ProductComparisonProps {
  products: Product[];
  title?: string;
}

const ProductComparison = ({ products, title }: ProductComparisonProps) => {
  const allFeatures = Array.from(
    new Set(products.flatMap((p) => Object.keys(p.features)))
  ).sort();

  return (
    <div className="overflow-x-auto">
      {title && (
        <SEOHeading level={2} className="mb-6">
          {title}
        </SEOHeading>
      )}
      <table
        className="w-full border-collapse"
        aria-label="Product Comparison Table"
      >
        <thead>
          <tr>
            <th scope="col" className="p-4 border bg-gray-50">
              Features
            </th>
            {products.map((product) => (
              <th
                key={product.id}
                scope="col"
                className="p-4 border bg-gray-50"
              >
                <div className="flex flex-col items-center space-y-2">
                  <SEOImage
                    src={product.image}
                    alt={product.name}
                    width={100}
                    height={100}
                    className="rounded-lg"
                  />
                  <span className="font-bold">{product.name}</span>
                  <span className="text-lg font-semibold text-green-600">
                    {product.price} {product.currency}
                  </span>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {allFeatures.map((feature) => (
            <tr key={feature}>
              <th scope="row" className="p-4 border bg-gray-50 text-left">
                {feature}
              </th>
              {products.map((product) => (
                <td
                  key={`${product.id}-${feature}`}
                  className="p-4 border text-center"
                >
                  {formatFeatureValue(product.features[feature])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const formatFeatureValue = (
  value: string | number | boolean | undefined
): React.ReactNode => {
  if (value === undefined) return "—";
  if (typeof value === "boolean") {
    return value ? (
      <span className="text-green-600">✓</span>
    ) : (
      <span className="text-red-600">✗</span>
    );
  }
  return value;
};

export default ProductComparison;
