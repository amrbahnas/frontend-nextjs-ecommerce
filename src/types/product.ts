export interface Product {
  _id: string;
  title: string;
  slug: string;
  description: string;
  quantity: number;
  sold: number;
  price: number;
  colors: any[];
  imageCover: string;
  images: string[];
  category: Category;
  subCategories: any[];
  ratingsQuantity: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
  ratingsAverage: number;
  reviews: ReviewType[];
  id: string;
}

export interface Category {
  name: string;
}

export interface ReviewType {
  _id: string;
  title: string;
  rating: number;
  user: User;
  product: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface User {
  _id: string;
  name: string;
  image: string;
}
