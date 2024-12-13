const truncateText = (text: string, maxLength: number = 160): string => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength - 3) + "...";
};

const generateProductDescription = (product: {
  name: string;
  price: number;
  currency: string;
  category?: string;
  brand?: string;
}): string => {
  const parts = [
    `Buy ${product.name}`,
    product.brand && `by ${product.brand}`,
    product.category && `in ${product.category}`,
    `for ${product.price} ${product.currency}`,
    "at Shope-Amr.",
    "Free shipping available.",
  ].filter(Boolean);

  return truncateText(parts.join(" "));
};

const generateCategoryDescription = (category: {
  name: string;
  productCount: number;
  minPrice?: number;
  maxPrice?: number;
  currency?: string;
}): string => {
  const parts = [
    `Explore ${category.name}`,
    `with ${category.productCount} products`,
    category.minPrice &&
      category.maxPrice &&
      category.currency &&
      `ranging from ${category.minPrice} to ${category.maxPrice} ${category.currency}`,
    "at Shope-Amr.",
    "Free shipping available.",
  ].filter(Boolean);

  return truncateText(parts.join(" "));
};

const generateArticleDescription = (article: {
  title: string;
  excerpt: string;
  author?: string;
  date?: string;
}): string => {
  const parts = [
    article.title,
    article.excerpt,
    article.author && `Written by ${article.author}`,
    article.date && `on ${article.date}`,
  ].filter(Boolean);

  return truncateText(parts.join(" "));
};

export { generateProductDescription, generateCategoryDescription, generateArticleDescription };
