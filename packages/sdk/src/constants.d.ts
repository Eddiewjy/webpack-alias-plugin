// 常量模块类型定义
export interface APIEndpoints {
  BASE_URL: string;
  USERS: string;
  PRODUCTS: string;
  ORDERS: string;
}

export interface HTTPStatus {
  OK: number;
  CREATED: number;
  BAD_REQUEST: number;
  UNAUTHORIZED: number;
  NOT_FOUND: number;
  INTERNAL_SERVER_ERROR: number;
}

export interface Config {
  TIMEOUT: number;
  RETRY_ATTEMPTS: number;
  CACHE_DURATION: number;
}

export declare const API_ENDPOINTS: APIEndpoints;
export declare const HTTP_STATUS: HTTPStatus;
export declare const CONFIG: Config; 