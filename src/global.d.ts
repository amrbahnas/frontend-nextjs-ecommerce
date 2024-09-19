type CategoryType = {
  _id: string;
  name: string;
  slug: string;
  image: string;
  createdAt: string;
  updatedAt: string;
};

type CartType = {
  cartItems: CartItemType[];
  numberOfCartsItems: number;
  totalCartPrice: number;
};

type CartItemType = {
  product: Product;
  color: string;
  quantity: number;
  price: number;
  _id: string;
};

type Product = {
  _id: string;
  title: string;
  price: number;
  imageCover: string;
  quantity: number;
  images: string[];
  colors: string[];
  category: Category;
  id: string;
};

type Category = {
  name: string;
};

type Product = {
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
};

type ProductSize = "S" | "M" | "L" | "XL" | "XXL";

type Category = {
  name: string;
};

type ReviewType = {
  _id: string;
  title: string;
  rating: number;
  user: User;
  product: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

type User = {
  _id: string;
  name: string;
  image: string;
};
