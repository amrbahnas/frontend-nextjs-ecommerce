import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://shop-amr.vercel.app';

  // Static routes - These will always be available
  const staticRoutes = [
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
    const products = await fetch(
      `${baseUrl}/api/products`
    ).then(res => res.json()).catch(() => []);

    // Get all categories
    const categories = await fetch(
      `${baseUrl}/api/categories`
    ).then(res => res.json()).catch(() => []);

    // Product routes
    const productRoutes = (Array.isArray(products) ? products : []).map((product: any) => ({
      url: `${baseUrl}/product/${product._id}`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'daily' as const,
      priority: 0.8,
    }));

    // Category routes
    const categoryRoutes = (Array.isArray(categories) ? categories : []).map((category: any) => ({
      url: `${baseUrl}/list?category=${category._id}`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }));

    return [...staticRoutes, ...productRoutes, ...categoryRoutes];
  } catch (error) {
    console.error('Error generating sitemap:', error);
    return staticRoutes;
  }
}
