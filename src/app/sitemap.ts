import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://your-domain.com';

  // Static routes - These will always be available
  const routes = [
    '',
    '/list',
    '/about-us',
    '/contact-us',
    '/customer-service',
    '/blog',
    '/careers',
    '/legal-privacy',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'daily' as const,
    priority: 1,
  }));

  try {
    // Get all products
    const productsResponse = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/products`,
      { next: { revalidate: 3600 } } // Revalidate every hour
    );
    
    if (!productsResponse.ok) {
      throw new Error(`Failed to fetch products: ${productsResponse.statusText}`);
    }

    const products = await productsResponse.json();

    // Get all categories
    const categoriesResponse = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/categories`,
      { next: { revalidate: 3600 } } // Revalidate every hour
    );

    if (!categoriesResponse.ok) {
      throw new Error(`Failed to fetch categories: ${categoriesResponse.statusText}`);
    }

    const categories = await categoriesResponse.json();

    // Product routes
    const productRoutes = Array.isArray(products) ? products.map((product: any) => ({
      url: `${baseUrl}/product/${product._id}`,
      lastModified: new Date(product.updatedAt || new Date()).toISOString(),
      changeFrequency: 'daily' as const,
      priority: 0.8,
    })) : [];

    // Category routes
    const categoryRoutes = Array.isArray(categories) ? categories.map((category: any) => ({
      url: `${baseUrl}/list?category=${category._id}`,
      lastModified: new Date(category.updatedAt || new Date()).toISOString(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    })) : [];

    return [...routes, ...productRoutes, ...categoryRoutes];
  } catch (error) {
    console.error('Error generating sitemap:', error);
    // Return only static routes if there's an error
    return routes;
  }
}
