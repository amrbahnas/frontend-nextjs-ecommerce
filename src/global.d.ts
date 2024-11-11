interface BaseParamsType {
  [key: string]: any; // Allow any other keys
}

type ParamsType = Omit<BaseParamsType, "skip">;
type UseQueryOptionsType = {
  params?: ParamsType;
  skip?: boolean;
  retry?: number;
  staleTime?: string;
  refetchOnWindowFocus?: boolean;
  initialResults?: any;
};

type CategoryType = {
  _id: string;
  name: string;
  slug: string;
  image: string;
  createdAt: string;
  updatedAt: string;
};
type SubCategoryType = {
  userId: number;
  _id: string;
  title: string;
  completed: boolean;
};

type CartType = {
  _id: string;
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
  slug: string;
  description: string;
  quantity: number;
  sold: number;
  price: number;
  colors: any[];
  imageCover: string;
  images: string[];
  category: CategoryType;
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
  email: string;
  role: string;
  emailVerified: boolean;
  active: boolean;
  profileImg: string;
  wishlist: string[];
};

type OrderType = {
  _id: string;
  user: User;
  orderItems: CartItemType[];
  taxPrice: number;
  shippingPrice: number;
  totalOrderPrice: number;
  paymentMethod: string;
  address: string;
  isPaid: boolean;
  paidAt: string;
  isDelivered: boolean;
  createdAt: string;
  updatedAt: string;
};

interface CustomError extends Error {
  response: {
    data: string;
    status: number;
  };
}

type TokenPayload = {
  _id: string;
  isAdmin: boolean;
  emailVerified: boolean;
  active: boolean;
};
