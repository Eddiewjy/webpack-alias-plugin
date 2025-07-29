// 类型定义模块
const UserType = {
  ADMIN: 'admin',
  USER: 'user',
  GUEST: 'guest'
};

const ProductCategory = {
  ELECTRONICS: 'electronics',
  CLOTHING: 'clothing',
  BOOKS: 'books',
  FOOD: 'food'
};

const OrderStatus = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  SHIPPED: 'shipped',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled'
};

module.exports = {
  UserType,
  ProductCategory,
  OrderStatus
}; 