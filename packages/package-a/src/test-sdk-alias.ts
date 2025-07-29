// 测试SDK的alias是否正常工作
import sdk from 'package-b';

console.log('=== SDK Alias 测试 ===');
console.log('SDK 实例:', sdk);
console.log('SDK 消息:', sdk.getMessage());
console.log('SDK 数据:', sdk.getData());
console.log('SDK Utils:', sdk.getUtils());
console.log('SDK Constants:', sdk.getConstants());
console.log('SDK Types:', sdk.getTypes());

// 测试通过alias直接访问SDK源码
console.log('=== 通过Alias访问SDK源码 ===');
try {
  // 这些导入应该通过alias解析到SDK的源码
  const sdkUtils = (globalThis as any).require('@utils/helper');
  const sdkConstants = (globalThis as any).require('@constants/config');
  const sdkTypes = (globalThis as any).require('@types/interfaces');
  
  console.log('SDK Utils (via alias):', sdkUtils);
  console.log('SDK Constants (via alias):', sdkConstants);
  console.log('SDK Types (via alias):', sdkTypes);
} catch (error: any) {
  console.error('Alias解析失败:', error.message);
}

export default {
  name: 'test-sdk-alias',
  version: '1.0.0'
}; 