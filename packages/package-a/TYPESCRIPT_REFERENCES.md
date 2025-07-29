# TypeScript References 配置指南

## 概述

TypeScript 的 `references` 字段允许项目引用其他 TypeScript 项目，实现项目间的依赖关系和增量编译。

## 当前配置

### SDK 项目 (packages/sdk/tsconfig.json)

```json
{
  "compilerOptions": {
    "composite": true, // 启用项目引用
    "declaration": true, // 生成声明文件
    "declarationMap": true // 生成声明映射
    // ... 其他配置
  }
}
```

### 项目 A (packages/package-a/tsconfig.json)

```json
{
  "compilerOptions": {
    "composite": true,
    "baseUrl": ".",
    "paths": {
      "package-b": ["../sdk/src/index.d.ts"],
      "package-b/utils": ["../sdk/src/utils.d.ts"],
      "package-b/constants": ["../sdk/src/constants.d.ts"],
      "package-b/types": ["../sdk/src/types.d.ts"]
    }
  },
  "references": [
    {
      "path": "../sdk"
    }
  ]
}
```

## 关键配置说明

### 1. composite 字段

- **作用**: 启用项目引用功能
- **位置**: 被引用的项目（SDK）和引用项目（项目 A）都需要设置
- **效果**: 允许项目被其他项目引用

### 2. references 字段

- **作用**: 声明项目依赖关系
- **格式**: 数组，每个元素包含 `path` 属性指向依赖项目
- **位置**: 引用项目（项目 A）中配置

### 3. paths 字段

- **作用**: 配置模块解析路径
- **格式**: 键值对，键为模块名，值为实际文件路径
- **位置**: 引用项目（项目 A）中配置

## 使用示例

### 在项目 A 中使用 SDK

```typescript
// 导入SDK主模块
import sdk, { SDKData } from "package-b"

// 导入工具函数
import { formatDate, generateId, validateEmail } from "package-b/utils"

// 导入常量
import { API_ENDPOINTS, HTTP_STATUS, CONFIG } from "package-b/constants"

// 导入类型定义
import { UserType, ProductCategory, OrderStatus } from "package-b/types"
```

## 编译命令

### 单独编译

```bash
# 编译SDK项目
cd packages/sdk && tsc

# 编译项目A
cd packages/package-a && tsc
```

### 增量编译

```bash
# 使用 --build 参数进行增量编译
cd packages/package-a && tsc --build

# 或者使用 --build 参数编译所有引用项目
cd packages/package-a && tsc --build --verbose
```

## 优势

1. **增量编译**: 只重新编译发生变化的项目
2. **类型安全**: 确保项目间的类型一致性
3. **模块化**: 清晰的依赖关系管理
4. **性能优化**: 减少不必要的重新编译

## 注意事项

1. **声明文件**: 被引用的项目必须生成声明文件（.d.ts）
2. **composite 模式**: 启用后会影响编译输出
3. **路径配置**: paths 配置需要与实际文件结构匹配
4. **循环依赖**: 避免项目间的循环引用

## 文件结构

```
packages/
├── sdk/
│   ├── tsconfig.json          # SDK TypeScript配置
│   ├── src/
│   │   ├── index.js           # SDK主模块
│   │   ├── index.d.ts         # SDK类型定义
│   │   ├── utils.js           # 工具函数
│   │   ├── utils.d.ts         # 工具函数类型定义
│   │   ├── constants.js       # 常量定义
│   │   ├── constants.d.ts     # 常量类型定义
│   │   ├── types.js           # 类型定义
│   │   └── types.d.ts         # 类型定义类型定义
│   └── package.json           # SDK包配置
└── package-a/
    ├── tsconfig.json          # 项目A TypeScript配置
    ├── src/
    │   └── index.ts           # 项目A主文件
    └── package.json           # 项目A包配置
```
