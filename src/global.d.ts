interface BaseParamsType {
  [key: string]: any; // Allow any other keys
}

type ParamsType = Omit<BaseParamsType, "skip">;

type CategoryType = {
  id: string;
  name: string;
  slug: string;
  image: string;
  createdAt: string;
  updatedAt: string;
};
type SubCategoryType = {
  userId: number;
  id: string;
  name: string;
  categoryId: string;
  completed: boolean;
};

type CouponType = {
  id: string;
  code: string;
  discount: number;
  expireAt: string;
  createdAt: string;
  updatedAt: string;
};

type CartType = {
  id: string;
  cartItems: CartItemType[];
  numberOfCartsItems: number;
  totalCartPrice: number;
  totalPriceAfterDiscount: number;
  appliedCoupon?: CouponType;
  invalidCart: null | {
    status: string;
    message: string;
  };
};

type CartStoreType = {
  cartItems: CartItemType[];
  totalCartPrice: number;
};

type CartItemType = {
  product: Product;
  color: string;
  quantity: number;
  price: number;
  size: ProductSize;
  id: string;
};

type Product = {
  id: string;
  title: string;
  slug: string;
  description: string;
  quantity: number;
  sold: number;
  price: number;
  colors: any[];
  availableSizes: ProductSize[];
  imageCover: string;
  images: string[];
  category: CategoryType;
  subCategories: any[];
  ratingsQuantity: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
  ratingsAverage: number;
  status: ProductStatus;
  reviews: ReviewType[];
  id: string;
};

type ProductStatus =
  | "trending"
  | "featured"
  | "popular"
  | "normal"
  | "most-sold"
  | "new-arrival";

type ProductSize = "S" | "M" | "L" | "XL" | "XXL";

type ReviewType = {
  id: string;
  title: string;
  rating: number;
  user: User;
  product: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

type User = {
  id: string;
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
  id: string;
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
    data: {
      message: string;
      error: string;
      statusCode: number;
    };
    status: number;
  };
}

type TokenPayload = {
  id: string;
  isAdmin: boolean;
  emailVerified: boolean;
  active: boolean;
};
