# Package.json Export 字段配置指南

## 概述

`package.json` 中的 `exports` 字段允许您定义包的导出路径，提供更精确的模块导入控制。

## 配置说明

### 基本语法

```json
{
  "exports": {
    ".": {
      "import": "./src/index.js",
      "require": "./src/index.js",
      "default": "./src/index.js"
    },
    "./utils": {
      "import": "./src/utils.js",
      "require": "./src/utils.js",
      "default": "./src/utils.js"
    }
  }
}
```

### 字段说明

- **"."**: 主入口点，对应 `require('package-name')` 或 `import from 'package-name'`
- **"./utils"**: 子路径导出，对应 `require('package-name/utils')` 或 `import from 'package-name/utils'`
- **import**: ES 模块导入时使用的路径
- **require**: CommonJS 导入时使用的路径
- **default**: 默认导出路径

## 当前配置

本 SDK 包配置了以下导出路径：

1. **主模块** (`"."`)

   - 文件：`./src/index.js`
   - 使用：`require('package-b')` 或 `import from 'package-b'`

2. **工具函数** (`"./utils"`)

   - 文件：`./src/utils.js`
   - 使用：`require('package-b/utils')` 或 `import from 'package-b/utils'`

3. **常量定义** (`"./constants"`)

   - 文件：`./src/constants.js`
   - 使用：`require('package-b/constants')` 或 `import from 'package-b/constants'`

4. **类型定义** (`"./types"`)
   - 文件：`./src/types.js`
   - 使用：`require('package-b/types')` 或 `import from 'package-b/types'`

## 使用示例

### CommonJS 方式

```javascript
// 导入主模块
const sdk = require("package-b")

// 导入工具函数
const { formatDate, generateId } = require("package-b/utils")

// 导入常量
const { API_ENDPOINTS, HTTP_STATUS } = require("package-b/constants")

// 导入类型定义
const { UserType, ProductCategory } = require("package-b/types")
```

### ES 模块方式

```javascript
// 导入主模块
import sdk from "package-b"

// 导入工具函数
import { formatDate, generateId } from "package-b/utils"

// 导入常量
import { API_ENDPOINTS, HTTP_STATUS } from "package-b/constants"

// 导入类型定义
import { UserType, ProductCategory } from "package-b/types"
```

## 优势

1. **精确控制**: 只暴露您想要导出的特定路径
2. **安全性**: 防止用户访问未预期的内部文件
3. **灵活性**: 可以为不同的导入方式提供不同的文件
4. **向后兼容**: 可以与 `main` 字段共存

## 注意事项

1. 一旦配置了 `exports` 字段，只有明确导出的路径才能被访问
2. 未在 `exports` 中声明的路径将无法被外部访问
3. 建议同时配置 `import` 和 `require` 以支持不同的模块系统
4. 可以使用条件导出为不同环境提供不同的实现
