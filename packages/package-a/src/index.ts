import { utils } from '@utils/helper';
import { constants } from '@constants/config';
import { types } from '@types/interfaces';

// 使用别名导入的模块
console.log('Package A - Main Entry');
console.log('Utils:', utils);
console.log('Constants:', constants);
console.log('Types:', types);

export default {
  name: 'package-a',
  version: '1.0.0'
}; 