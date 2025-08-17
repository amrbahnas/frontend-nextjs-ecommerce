import axios from "axios";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  timeout: 10000,
});

export async function getProductById(id: string): Promise<Product | null> {
  try {
    const response = await apiClient.get(`/products/${id}`);
    return response.data.data;
  } catch (error) {
    console.error(`Failed to fetch product ${id}:`, error);
    return null;
  }
}

export async function getProductReviews(
  id: string,
  page: number = 1
): Promise<ReviewType[]> {
  try {
    const response = await apiClient.get(`/products/${id}/reviews`, {
      params: {
        page,
        sort: "-createdAt",
      },
    });
    return response.data.data || [];
  } catch (error) {
    console.error(`Failed to fetch product reviews for ${id}:`, error);
    return [];
  }
}
