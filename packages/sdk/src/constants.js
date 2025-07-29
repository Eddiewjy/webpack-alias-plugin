// 常量定义模块
const API_ENDPOINTS = {
  BASE_URL: 'https://api.example.com',
  USERS: '/users',
  PRODUCTS: '/products',
  ORDERS: '/orders'
};

const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500
};

const CONFIG = {
  TIMEOUT: 30000,
  RETRY_ATTEMPTS: 3,
  CACHE_DURATION: 3600
};

module.exports = {
  API_ENDPOINTS,
  HTTP_STATUS,
  CONFIG
}; 