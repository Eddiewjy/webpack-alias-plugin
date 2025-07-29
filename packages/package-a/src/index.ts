// 项目A 主文件 - 使用SDK依赖
import sdk, { SDKData } from 'package-b';
import { formatDate, generateId, validateEmail } from 'package-b/utils';
import { API_ENDPOINTS, HTTP_STATUS, CONFIG } from 'package-b/constants';
import { UserType, ProductCategory, OrderStatus } from 'package-b/types';

// 使用SDK主模块
console.log('=== 项目A 使用 SDK ===');
console.log('SDK名称:', sdk.name);
console.log('SDK版本:', sdk.version);
console.log('SDK消息:', sdk.getMessage());

const sdkData: SDKData = sdk.getData();
console.log('SDK数据:', sdkData);

// 使用工具函数
console.log('\n=== 使用工具函数 ===');
const formattedDate = formatDate(new Date());
const newId = generateId();
const isValidEmail = validateEmail('test@example.com');

console.log('格式化日期:', formattedDate);
console.log('生成ID:', newId);
console.log('邮箱验证:', isValidEmail);

// 使用常量
console.log('\n=== 使用常量 ===');
console.log('API基础URL:', API_ENDPOINTS.BASE_URL);
console.log('用户API:', API_ENDPOINTS.USERS);
console.log('HTTP状态码:', HTTP_STATUS.OK);
console.log('超时配置:', CONFIG.TIMEOUT);

// 使用类型定义
console.log('\n=== 使用类型定义 ===');
console.log('管理员类型:', UserType.ADMIN);
console.log('电子产品分类:', ProductCategory.ELECTRONICS);
console.log('待处理状态:', OrderStatus.PENDING);

// 项目A的特定功能
export class ProjectAService {
  private sdkInstance = sdk;

  public async processData(): Promise<void> {
    console.log('项目A处理数据中...');
    
    // 使用SDK功能
    const data = this.sdkInstance.getData();
    const formattedDate = formatDate(data.timestamp);
    
    console.log(`处理时间: ${formattedDate}`);
    console.log(`数据ID: ${data.id}`);
  }

  public validateUserInput(email: string): boolean {
    return validateEmail(email);
  }

  public getApiConfig() {
    return {
      baseUrl: API_ENDPOINTS.BASE_URL,
      timeout: CONFIG.TIMEOUT,
      retryAttempts: CONFIG.RETRY_ATTEMPTS
    };
  }
}

// 导出项目A的主要功能
export default ProjectAService; 