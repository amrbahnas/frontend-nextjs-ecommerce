export interface CartType {
  cartItems: CartItemType[];
  totalCartPrice: number;
}

export interface CartItemType {
  product: Product;
  color: string;
  quantity: number;
  price: number;
  _id: string;
}

export interface Product {
  _id: string;
  title: string;
  price: number;
  imageCover: string;
  category: Category;
  id: string;
}

export interface Category {
  name: string;
}
