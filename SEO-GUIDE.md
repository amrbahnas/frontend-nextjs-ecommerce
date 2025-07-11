# SEO Implementation Guide for store-Amr E-commerce

## Table of Contents

1. [Basic Setup](#basic-setup)
2. [Structured Data Components](#structured-data-components)
3. [UI Components](#ui-components)
4. [Meta Tags and Descriptions](#meta-tags-and-descriptions)
5. [PWA Setup](#pwa-setup)
6. [Implementation Examples](#implementation-examples)

## Basic Setup

### 1. Layout Configuration (layout.tsx)

```typescript
// src/app/[locale]/layout.tsx
export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
  ),
  title: {
    template: "%s | Elbahnswy store",
    default: "Elbahnsawy store | Your Premier E-commerce Destination",
  },
  // ... other metadata
};
```

### 2. Environment Variables (.env)

```env
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=your-verification-code
```

## Structured Data Components

### 1. Product Structured Data

Location: `src/components/structured-data/ProductStructuredData.tsx`
Usage:

```typescript
<ProductStructuredData
  name="Product Name"
  description="Product Description"
  price={99.99}
  currency="USD"
  // ... other props
/>
```

### 2. Local Business Data

Location: `src/components/structured-data/LocalBusinessStructuredData.tsx`
Usage:

```typescript
<LocalBusinessStructuredData />
```

### 3. Review Data

Location: `src/components/structured-data/ReviewStructuredData.tsx`
Usage:

```typescript
<ReviewStructuredData
  productName="Product Name"
  reviewRating={4.5}
  reviewAuthor="Author Name"
  reviewText="Review content"
  datePublished="2024-12-13"
/>
```

### 4. Article Data

Location: `src/components/structured-data/ArticleStructuredData.tsx`
Usage:

```typescript
<ArticleStructuredData
  title="Article Title"
  description="Article Description"
  image="/path/to/image.jpg"
  datePublished="2024-12-13"
  dateModified="2024-12-13"
  authorName="Author Name"
  authorUrl="https://author-profile.com"
/>
```

## UI Components

### 1. SEO Image Component

Location: `src/components/ui/SEOImage.tsx`
Usage:

```typescript
<SEOImage
  src="/path/to/image.jpg"
  alt="Image description"
  width={400}
  height={400}
  priority={true}
/>
```

### 2. SEO Link Component

Location: `src/components/ui/SEOLink.tsx`
Usage:

```typescript
<SEOLink href="/products/123" title="View Product" isExternal={false}>
  Product Name
</SEOLink>
```

### 3. SEO Heading Component

Location: `src/components/ui/SEOHeading.tsx`
Usage:

```typescript
<SEOHeading level={1} highlight={["sale", "discount"]}>
  Special Sale: 20% Discount
</SEOHeading>
```

### 4. Product Comparison Component

Location: `src/components/ui/ProductComparison.tsx`
Usage:

```typescript
<ProductComparison
  products={[
    {
      id: "1",
      name: "Product A",
      image: "/products/a.jpg",
      price: 99.99,
      currency: "USD",
      features: {
        Feature1: "Value1",
        Feature2: true,
      },
    },
  ]}
/>
```

## Meta Tags and Descriptions

### 1. Meta Description Generator

Location: `src/components/ui/SEOMetaDescription.tsx`
Usage:

```typescript
const productDescription = generateProductDescription({
  name: "Product Name",
  price: 99.99,
  currency: "USD",
  category: "Category",
  brand: "Brand",
});
```

## PWA Setup

### 1. Manifest File

Location: `public/manifest.json`

```json
{
  "name": "store-Amr",
  "short_name": "store-Amr",
  "description": "Your Premier E-commerce Destination",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#000000"
  // ... other settings
}
```

### 2. Icons

Location: `public/icons/`
Required sizes:

- icon-72x72.png
- icon-96x96.png
- icon-128x128.png
- icon-144x144.png
- icon-152x152.png
- icon-192x192.png
- icon-384x384.png
- icon-512x512.png

## Implementation Examples

### 1. Product Page Example

```typescript
// src/app/[locale]/(website)/(pages)/product/[id]/page.tsx
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
      {/* Product details */}
    </>
  );
}
```

### 2. Category Page Example

```typescript
// src/app/[locale]/(website)/(pages)/category/[id]/page.tsx
export default function CategoryPage({ category, products }) {
  return (
    <>
      <CategoryStructuredData {...category} />
      <SEOHeading level={1}>{category.name}</SEOHeading>
      {products.map((product) => (
        <SEOLink
          key={product.id}
          href={`/product/${product.id}`}
          title={product.name}
        >
          {/* Product card content */}
        </SEOLink>
      ))}
    </>
  );
}
```

## Best Practices

1. **Always Include Required Meta Tags**

   - Title
   - Description
   - OpenGraph tags
   - Twitter cards

2. **Structured Data Guidelines**

   - Use the most specific type possible
   - Include all required properties
   - Test using Google's Rich Results Test

3. **Image Optimization**

   - Always use SEOImage component
   - Provide meaningful alt text
   - Use appropriate image sizes
   - Set priority for above-the-fold images

4. **Link Best Practices**

   - Use descriptive anchor text
   - Add title attributes where appropriate
   - Mark external links properly
   - Use proper rel attributes

5. **Heading Hierarchy**

   - One H1 per page
   - Maintain proper heading structure
   - Use meaningful heading text

6. **Performance**
   - Optimize images
   - Use lazy loading where appropriate
   - Implement proper caching
   - Monitor Core Web Vitals

## Testing Tools

1. Google Search Console
2. Google's Rich Results Test
3. Mobile-Friendly Test
4. PageSpeed Insights
5. Schema.org Validator

## Regular Maintenance

1. Monitor search console for issues
2. Update structured data as needed
3. Keep meta descriptions current
4. Review and update content regularly
5. Check for broken links
6. Monitor site performance

Remember to always test your implementation in both development and production environments.
