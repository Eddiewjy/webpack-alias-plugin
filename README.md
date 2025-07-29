# Webpack TypeScript 别名插件

这是一个用于 Webpack 的 TypeScript 别名插件，可以自动从 `devDependencies` 中的包的 `tsconfig.json` 文件中提取路径映射，并将其注册到 Webpack 的别名配置中。

## 项目结构

```
webpack-alias-plugin/
├── packages/
│   ├── package-a/          # 示例包 A
│   │   ├── src/
│   │   │   ├── index.ts
│   │   │   ├── utils/
│   │   │   ├── constants/
│   │   │   └── types/
│   │   ├── package.json
│   │   └── tsconfig.json
│   └── sdk/               # SDK 包
│       ├── src/
│       │   ├── index.ts
│       │   ├── utils.ts
│       │   ├── constants.ts
│       │   └── types.ts
│       ├── package.json
│       └── tsconfig.json
├── plugin.js              # 别名插件
├── webpack.config.js      # Webpack 配置
├── test-alias.js          # 测试脚本
└── package.json
```

## 功能特性

1. **自动别名提取**: 从 `devDependencies` 中的包的 `tsconfig.json` 文件中自动提取路径映射
2. **Webpack 集成**: 将提取的别名注册到 Webpack 的 `resolve.alias` 配置中
3. **TypeScript 支持**: 完全支持 TypeScript 的路径映射功能
4. **Monorepo 友好**: 专为 monorepo 项目设计

## 安装依赖

```bash
npm install
```

## 使用方法

### 1. 基本配置

在 Webpack 配置文件中引入插件：

```javascript
const TypeScriptAliasPlugin = require("./plugin")

module.exports = {
  // ... 其他配置
  plugins: [new TypeScriptAliasPlugin(__dirname)]
}
```

### 2. TypeScript 配置

确保你的 `tsconfig.json` 文件中包含路径映射：

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@utils/*": ["src/utils/*"],
      "@constants/*": ["src/constants/*"],
      "@types/*": ["src/types/*"]
    }
  }
}
```

### 3. 包依赖配置

在根目录的 `package.json` 中添加依赖：

```json
{
  "devDependencies": {
    "package-a": "workspace:*",
    "package-b": "workspace:*"
  }
}
```

## 运行测试

```bash
# 运行 webpack 构建测试
node test-alias.js

# 或者使用 webpack-cli
npx webpack --config webpack.config.js
```

## 插件工作原理

1. **扫描依赖**: 读取根目录 `package.json` 中的 `devDependencies`
2. **提取配置**: 遍历每个依赖包，读取其 `tsconfig.json` 文件
3. **解析路径**: 提取 `compilerOptions.paths` 中的路径映射
4. **注册别名**: 将提取的别名注册到 Webpack 的 `resolve.alias` 配置中

## 示例

### 包 A 的入口文件 (`packages/package-a/src/index.ts`)

```typescript
import { utils } from "@utils/helper"
import { constants } from "@constants/config"
import { types } from "@types/interfaces"

console.log("Package A - Main Entry")
console.log("Utils:", utils)
console.log("Constants:", constants)
console.log("Types:", types)
```

### SDK 包 (`packages/sdk/src/index.ts`)

```typescript
import { utils } from "./utils"
import { constants } from "./constants"
import { types } from "./types"

class SDK {
  // SDK 实现...
}

export default sdk
export { utils, constants, types }
```

## 注意事项

1. 确保所有依赖包都有正确的 `tsconfig.json` 配置
2. 路径映射中的通配符 `*` 会被自动处理
3. 插件会在构建时自动处理别名解析
4. 支持嵌套的 monorepo 结构

## 故障排除

如果遇到别名解析问题：

1. 检查 `tsconfig.json` 中的路径映射是否正确
2. 确认依赖包是否在 `devDependencies` 中
3. 验证文件路径是否存在
4. 查看构建日志中的错误信息

## 许可证

MIT
