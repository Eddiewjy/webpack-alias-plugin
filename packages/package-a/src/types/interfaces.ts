export enum UserType {
  ADMIN = 'admin',
  USER = 'user',
  GUEST = 'guest'
}

export enum ProductCategory {
  ELECTRONICS = 'electronics',
  CLOTHING = 'clothing',
  BOOKS = 'books'
}

export enum OrderStatus {
  PENDING = 'pending',
  PROCESSING = 'processing',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled'
}

export interface User {
  id: string;
  name: string;
  email: string;
  type: UserType;
}

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  price: number;
}

export interface Order {
  id: string;
  userId: string;
  products: Product[];
  status: OrderStatus;
  createdAt: Date;
}

export const types = {
  UserType,
  ProductCategory,
  OrderStatus
}; 