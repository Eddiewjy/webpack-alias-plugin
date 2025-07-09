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
    compiler.hooks.afterResolve.tap('typescriptAliasPlugin', (compilation) => {
      const packageJsonPath = `${this.rootPath}/package.json`
      const devDependencies = packageJson.devDependencies || {}
        
      // 遍历包名，在 node_modules 中获取项目的 tsconfig
      for (const packageName of Object.keys(devDependencies)) {
        const tsconfigPath = `${this.rootPath}/node_modules/${packageName}/tsconfig.json`
        
      }
    })
  }
}
