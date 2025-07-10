class typescriptAliasPlugin {
  // 获取构建配置中传入的数据

  constructor(rootPath) {
    //获取根目录路径
    this.rootPath = rootPath || process.cwd()
  }
  apply(compiler) {
    // 通过 hooks 约定执行的时机 afterResolve
    // 获取 package.json 中 devDependencies 的包内容（依赖项）
    // 遍历包名，在 node_module 中获取项目的 tsconfig （pnpm 有软连接）
    // 提取 tsconfig 中的 path 字段，注入 compiler 的 alias 配置中（注册到全局 alias）
      ContextModuleFactory.hooks.afterResolve.tap('typescriptAliasPlugin', (data) => {
      const packageJsonPath = `${this.rootPath}/package.json`
      const packageJson = require(packageJsonPath)

      const devDependencies = packageJson.devDependencies || {}
        
      // 遍历包名，在 node_modules 中获取项目的 tsconfig
      for (const packageName of Object.keys(devDependencies)) {
        const tsconfigPath = `${this.rootPath}/node_modules/${packageName}/tsconfig.json`

        try{
          const tsconfig = require(tsconfigPath)
          const paths = tsconfig.compilerOptions.paths
          for (const [alias, value] of Object.entries(paths)) {//到此获取了tsconfig中的paths
            if (Array.isArray(value) && value.length > 0) {
              // 注册到全局 alias
              data.context.resolve.alias[alias] = value[0].replace('*', '')
            }
          }
        }
       catch (error) {
        console.error(`Error loading tsconfig.json for ${packageName}:`, error)
      }
    }
    })
  }
}
