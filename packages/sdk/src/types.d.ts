// 类型定义模块类型定义
export interface UserType {
  ADMIN: string;
  USER: string;
  GUEST: string;
}

export interface ProductCategory {
  ELECTRONICS: string;
  CLOTHING: string;
  BOOKS: string;
  FOOD: string;
}

export interface OrderStatus {
  PENDING: string;
  CONFIRMED: string;
  SHIPPED: string;
  DELIVERED: string;
  CANCELLED: string;
}

export declare const UserType: UserType;
export declare const ProductCategory: ProductCategory;
export declare const OrderStatus: OrderStatus; 