// 示例：如何使用 package.json 中配置的 export 字段

// 1. 导入主模块
const sdk = require('package-b');

// 2. 导入工具函数
const { formatDate, generateId, validateEmail } = require('package-b/utils');

// 3. 导入常量
const { API_ENDPOINTS, HTTP_STATUS, CONFIG } = require('package-b/constants');

// 4. 导入类型定义
const { UserType, ProductCategory, OrderStatus } = require('package-b/types');

// 使用示例
console.log('=== SDK 主模块 ===');
console.log(sdk.getMessage());
console.log(sdk.getData());

console.log('\n=== 工具函数 ===');
console.log('格式化日期:', formatDate(new Date()));
console.log('生成ID:', generateId());
console.log('邮箱验证:', validateEmail('test@example.com'));

console.log('\n=== 常量 ===');
console.log('API端点:', API_ENDPOINTS.BASE_URL);
console.log('HTTP状态:', HTTP_STATUS.OK);
console.log('配置:', CONFIG.TIMEOUT);

console.log('\n=== 类型定义 ===');
console.log('用户类型:', UserType.ADMIN);
console.log('产品分类:', ProductCategory.ELECTRONICS);
console.log('订单状态:', OrderStatus.PENDING); 