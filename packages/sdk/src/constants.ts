export const constants = {
  API_ENDPOINTS: {
    BASE_URL: 'https://api.sdk.com',
    USERS: '/users',
    PRODUCTS: '/products',
    ORDERS: '/orders'
  },
  HTTP_STATUS: {
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500
  },
  CONFIG: {
    TIMEOUT: 10000,
    RETRY_ATTEMPTS: 5,
    MAX_RETRY_DELAY: 30000
  },
  SDK: {
    NAME: 'Webpack Alias Plugin SDK',
    VERSION: '1.0.0',
    AUTHOR: 'Your Name'
  }
}; 