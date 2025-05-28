import React, { useEffect } from "react";

export const useProductSeo = (product: Product) => {
  useEffect(() => {
    // Dynamically update meta tags since this is a client component
    if (product) {
      document.title = `${product.title} | Shope-Amr`;
      const metaDescription = document.querySelector(
        'meta[name="description"]'
      );
      if (metaDescription) {
        metaDescription.setAttribute("content", product.description || "");
      }

      // Update Open Graph tags
      let ogTitle = document.querySelector('meta[property="og:title"]');
      let ogDesc = document.querySelector('meta[property="og:description"]');
      let ogImage = document.querySelector('meta[property="og:image"]');

      if (!ogTitle) {
        ogTitle = document.createElement("meta");
        ogTitle.setAttribute("property", "og:title");
        document.head.appendChild(ogTitle);
      }
      if (!ogDesc) {
        ogDesc = document.createElement("meta");
        ogDesc.setAttribute("property", "og:description");
        document.head.appendChild(ogDesc);
      }
      if (!ogImage) {
        ogImage = document.createElement("meta");
        ogImage.setAttribute("property", "og:image");
        document.head.appendChild(ogImage);
      }

      ogTitle.setAttribute("content", product.title);
      ogDesc.setAttribute("content", product.description || "");
      ogImage.setAttribute("content", product.imageCover);
    }
  }, [product]);
};
