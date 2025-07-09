# SEO Implementation Guide

## Table of Contents

1. [Overview](#overview)
2. [Components](#components)
   - [Structured Data Components](#structured-data-components)
   - [UI Components](#ui-components)
   - [SEO Components](#seo-components)
3. [Implementation](#implementation)
4. [Best Practices](#best-practices)
5. [Testing](#testing)

## Overview

This guide covers all SEO implementations in the store-Amr e-commerce platform.

### Key Features

- Structured Data
- Meta Tags
- Sitemaps
- SEO-friendly URLs
- Performance Optimization

### Recently Added Features

1. **Video Structured Data**

   - Product video metadata
   - Tutorial video information
   - Video thumbnails and descriptions

2. **How-To Structured Data**

   - Step-by-step product guides
   - Assembly instructions
   - Usage tutorials

3. **Product Comparison**

   - Feature comparison tables
   - Price comparisons
   - Specification details

4. **Enhanced Meta Descriptions**
   - Dynamic product descriptions
   - Category page optimization
   - Blog post summaries

## Components

### 1. Structured Data Components

#### ProductStructuredData

```typescript
<ProductStructuredData
  name="Product Name"
  description="Product Description"
  price={99.99}
  currency="USD"
  // ... other props
/>
```

#### VideoStructuredData

```typescript
// src/components/structured-data/VideoStructuredData.tsx
interface VideoStructuredDataProps {
  name: string;
  description: string;
  thumbnailUrl: string;
  uploadDate: string;
  contentUrl: string;
  duration?: string;
  embedUrl?: string;
}

<VideoStructuredData
  name="How to Use Product X"
  description="Step-by-step guide for Product X"
  thumbnailUrl="/thumbnails/product-x.jpg"
  uploadDate="2024-12-13"
  contentUrl="/videos/product-x.mp4"
  duration="PT2M30S"
/>;
```

#### HowToStructuredData

```typescript
// src/components/structured-data/HowToStructuredData.tsx
interface HowToStructuredDataProps {
  name: string;
  description: string;
  steps: Array<{
    name: string;
    text: string;
    image?: string;
  }>;
  totalTime?: string;
  estimatedCost?: {
    value: number;
    currency: string;
  };
  supply?: string[];
  tools?: string[];
}

<HowToStructuredData
  name="How to Assemble Product X"
  description="Easy assembly guide"
  steps={[
    { name: "Step 1", text: "Unbox all parts" },
    { name: "Step 2", text: "Connect A to B" },
  ]}
  totalTime="PT30M"
  estimatedCost={{ value: 0, currency: "USD" }}
  tools={["Screwdriver", "Wrench"]}
/>;
```

### 2. UI Components

#### SEOHeading

```typescript
// src/components/ui/SEOHeading.tsx
interface SEOHeadingProps {
  level: 1 | 2 | 3 | 4 | 5 | 6;
  highlight?: string[];
  children: React.ReactNode;
  className?: string;
  id?: string;
}

<SEOHeading level={1} highlight={["sale", "discount"]}>
  Special Sale: 20% Discount
</SEOHeading>;
```

#### SEOImage

```typescript
<SEOImage
  src="/path/to/image.jpg"
  alt="Detailed image description"
  width={400}
  height={400}
  priority={true}
/>
```

#### ProductComparison

```typescript
// src/components/ui/ProductComparison.tsx
interface ProductComparisonProps {
  products: Array<{
    id: string;
    name: string;
    image: string;
    price: number;
    currency: string;
    features: Record<string, string | boolean>;
  }>;
}

<ProductComparison
  products={[
    {
      id: "1",
      name: "Product A",
      image: "/products/a.jpg",
      price: 99.99,
      currency: "USD",
      features: {
        "Battery Life": "24h",
        Waterproof: true,
      },
    },
    // ... more products
  ]}
/>;
```

### 3. SEO Components

#### SEOMetaDescription

```typescript
// src/components/ui/SEOMetaDescription.tsx
interface MetaDescriptionProps {
  type: "product" | "category" | "article";
  data: {
    name?: string;
    price?: number;
    currency?: string;
    category?: string;
    brand?: string;
    // For articles
    title?: string;
    excerpt?: string;
    author?: string;
    date?: string;
  };
}

// Usage for Product
const productDescription = generateProductDescription({
  name: "iPhone 15 Pro",
  price: 999,
  currency: "USD",
  category: "Smartphones",
  brand: "Apple",
});

// Usage for Category
const categoryDescription = generateCategoryDescription({
  name: "Smartphones",
  productCount: 50,
  minPrice: 199,
  maxPrice: 1299,
  currency: "USD",
});
```

## Implementation

### 1. Page Setup

```typescript
// pages/product/[id].tsx
export default function ProductPage({ product }) {
  return (
    <>
      <ProductStructuredData {...product} />
      <SEOHeading level={1}>{product.name}</SEOHeading>
      <SEOImage
        src={product.image}
        alt={product.name}
        width={400}
        height={400}
        priority
      />
    </>
  );
}
```

### 2. Meta Tags

```typescript
// app/layout.tsx
export const metadata = {
  title: {
    default: "Elbahnsawt-store | Your Premier E-commerce Destination",
    template: "%s | Elbahnsawy-store",
  },
  description: "Your premier destination for online shopping",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://shop-elbahnsawy.vercel.app/",
    siteName: "Elbahnsawy-store",
  },
};
```

### 3. Sitemap Generation

```typescript
// app/sitemap.ts
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://your-domain.com";

  // Static routes
  const routes = [
    "",
    "/list",
    "/about-us",
    // ... more routes
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "daily" as const,
    priority: 1,
  }));

  // Dynamic routes (products, categories)
  try {
    const products = await fetchProducts();
    const categories = await fetchCategories();

    const productRoutes = products.map((product) => ({
      url: `${baseUrl}/product/${product.id}`,
      lastModified: new Date(product.updatedAt).toISOString(),
      changeFrequency: "daily" as const,
      priority: 0.8,
    }));

    // ... category routes

    return [...routes, ...productRoutes];
  } catch (error) {
    console.error("Error generating sitemap:", error);
    return routes;
  }
}
```

### 4. Page Implementation Example

```typescript
// pages/product/[id].tsx
export default function ProductPage({ product, videos, howTo }) {
  return (
    <>
      <ProductStructuredData {...product} />

      {videos.map((video) => (
        <VideoStructuredData key={video.id} {...video} />
      ))}

      {howTo && <HowToStructuredData {...howTo} />}

      <SEOHeading level={1}>{product.name}</SEOHeading>

      <ProductComparison products={[product, ...similarProducts]} />
    </>
  );
}
```

## Best Practices

1. **Structured Data**

   - Use the most specific type possible
   - Include all required properties
   - Test using Google's Rich Results Test
   - Keep data up to date

2. **Meta Descriptions**

   - Keep within 150-160 characters
   - Include primary keywords
   - Make them actionable
   - Be specific and relevant

3. **Sitemaps**

   - Update frequently
   - Include all important pages
   - Set correct priorities
   - Monitor in Search Console

4. **Performance**
   - Use Next.js Image optimization
   - Implement lazy loading
   - Monitor Core Web Vitals
   - Optimize bundle size

## Testing

1. **Tools**

   - Google Search Console
   - Rich Results Test
   - Mobile-Friendly Test
   - PageSpeed Insights

2. **Regular Checks**
   - Structured data validation
   - Meta tag verification
   - Sitemap status
   - Core Web Vitals

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Google Search Console](https://search.google.com/search-console)
- [Schema.org](https://schema.org)
- [Core Web Vitals](https://web.dev/vitals/)

## Regular Maintenance

1. **Weekly Tasks**

   - Check Search Console for issues
   - Update content as needed
   - Monitor performance

2. **Monthly Tasks**

   - Review analytics
   - Update sitemaps
   - Check competitor SEO

3. **Quarterly Tasks**
   - Full SEO audit
   - Update meta descriptions
   - Review keyword strategy
