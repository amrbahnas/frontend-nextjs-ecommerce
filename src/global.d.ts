interface BaseParamsType {
  [key: string]: any; // Allow any other keys
}

type ParamsType = Omit<BaseParamsType, "skip">;

type CategoryType = {
  id: string;
  name: string;
  slug: string;
  image: string;
  subCategories: SubCategoryType[];
  _count: {
    products: number;
  };
  createdAt: string;
  updatedAt: string;
};
type SubCategoryType = {
  userId: number;
  id: string;
  name: string;
  categoryId: string;
  completed: boolean;
  productsCount: number;
  categoryName: string;
};

type CouponType = {
  id: string;
  code: string;
  discount: number;
  expireAt: Date;
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
  id: string;
  cartItems: CartItemType[];
  totalCartPrice: number;
};

type CartItemType = {
  id: string;
  productId: string;
  availableQuantity: number;
  color?: string | null;
  size?: string | null;
  quantity: number;
  price: number;
  title?: string;
  imageCover?: string;
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
  comment: comment;
  rating: number;
  user: User;
  product: Product;
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
  phone: string;
  emailVerified: boolean;
  active: boolean;
  profileImg: string;
  wishlist: string[];
};

type OrderType = {
  id: string;
  orderItems: CartItemType[];
  totalOrderPrice: number;
  addressId: string;
  paymentMethod: string;
  isPaid: boolean;
  paidAt: any;
  isDelivered: boolean;
  deliveredAt: any;
  status: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  user: User;
  address: AddressType;
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

type AddressType = {
  id: string;
  userId: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone: string;
};

type topSellingProducts = {
  title: string;
  sales: number;
  revenue: number;
};

type SalesByCategoryType = {
  category: string;
  totalSales: number;
  totalUnits: number;
};

type DashboardStatsType = {
  totalRevenue: number;
  totalOrders: number;
  totalProducts: number;
  totalUsers: number;
  recentOrders: OrderType[];
  topSellingProducts: topSellingProducts[];
  salesByCategory: SalesByCategoryType[];
};

type RevenueStatsType = {
  date: string;
  revenue: number;
};

type ProoductStatsType = {
  product: Product;
  stats: {
    totalOrders: number;
    totalRevenue: number;
    totalSold: number;
    averageRating: number;
    reviewsCount: number;
  };
  reviews: ReviewType[];
};

type UserReportType = User & {
  addresses: AddressType[];
  orders: OrderType[];
  reviews: ReviewType[];
  cart: CartType;
  stats: {
    totalOrders: number;
    totalSpent: number;
    averageOrderValue: number;
    totalReviews: number;
    averageRating: number;
    orderStatusSummary: {
      success: number;
    };
  };
};

type ConversationType = {
  id?: string;
  image?: string;
  name?: string;
  participants?: User[] | any;
  participantUserIds?: string[] | any;
  lastMessage?: lastMessageType;
  unreadCount?: number;
  createdAt?: string;
  updatedAt?: string;
  userId?: string;
  lastSeen?: Date;
};

type lastMessageType = {
  id: string;
  content: string;
  senderId: string;
  seenBy?: string[];
  type: string;
  conversationId: string;
  createdAt: string;
  unread: boolean;
};

type MessageType = {
  id: string;
  content: string;
  senderId: string;
  type: string;
  createdAt: Date;
  conversationId?: string;
  seenBy?: string[];
};

declare module "*.mp3" {
  const src: string;
  export default src;
}
