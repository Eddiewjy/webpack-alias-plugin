const path = require('path');
const TypescriptAliasPlugin = require('./plugin-fixed');

// 模拟webpack compiler
const mockCompiler = {
  options: {
    resolve: {
      alias: {}
    }
  },
  hooks: {
    afterEnvironment: {
      tap: function(name, callback) {
        console.log('Hook registered:', name);
        this.callback = callback;
      }
    }
  }
};

console.log('=== 插件调试开始 ===');

// 应用插件
const plugin = new TypescriptAliasPlugin(__dirname);
plugin.apply(mockCompiler);

// 触发hook
mockCompiler.hooks.afterEnvironment.callback();

console.log('注册的alias:', mockCompiler.options.resolve.alias);
console.log('=== 插件调试结束 ==='); 