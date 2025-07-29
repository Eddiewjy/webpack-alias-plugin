class TypescriptAliasPlugin {
  constructor(rootPath) {
    this.rootPath = rootPath || process.cwd();
  }

  apply(compiler) {
    // 使用正确的hook来注册alias
    compiler.hooks.afterEnvironment.tap('TypescriptAliasPlugin', () => {
      this.registerAliases(compiler);
    });
  }

  registerAliases(compiler) {
    try {
      // 首先检查根目录的package.json
      const rootPackageJsonPath = `${this.rootPath}/package.json`;
      const rootPackageJson = require(rootPackageJsonPath);
      
      // 获取所有依赖（包括dependencies和devDependencies）
      const allDependencies = {
        ...(rootPackageJson.dependencies || {}),
        ...(rootPackageJson.devDependencies || {})
      };

      // 遍历依赖包
      for (const [packageName, packageVersion] of Object.entries(allDependencies)) {
        // 检查是否是workspace依赖
        if (packageVersion === 'workspace:*' || packageVersion.startsWith('workspace:')) {
          this.processWorkspacePackage(compiler, packageName);
        } else {
          // 处理node_modules中的包
          this.processNodeModulePackage(compiler, packageName);
        }
      }

      // 检查packages目录下的各个包的依赖
      this.processPackagesDependencies(compiler);
    } catch (error) {
      console.error('Error in TypescriptAliasPlugin:', error);
    }
  }

  processPackagesDependencies(compiler) {
    const fs = require('fs');
    const packagesDir = `${this.rootPath}/packages`;
    
    if (!fs.existsSync(packagesDir)) return;

    const packages = fs.readdirSync(packagesDir, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name);

    for (const packageName of packages) {
      const packageJsonPath = `${packagesDir}/${packageName}/package.json`;
      
      if (fs.existsSync(packageJsonPath)) {
        try {
          const packageJson = require(packageJsonPath);
          const dependencies = {
            ...(packageJson.dependencies || {}),
            ...(packageJson.devDependencies || {})
          };

          for (const [depName, depVersion] of Object.entries(dependencies)) {
            if (depVersion === 'workspace:*' || depVersion.startsWith('workspace:')) {
              // 找到对应的workspace包
              const workspacePackageName = depName;
              this.processWorkspacePackage(compiler, workspacePackageName);
            }
          }
        } catch (error) {
          console.warn(`Error reading package.json for ${packageName}:`, error.message);
        }
      }
    }
  }

  processWorkspacePackage(compiler, packageName) {
    const packagePath = `${this.rootPath}/packages/${packageName}`;
    const tsconfigPath = `${packagePath}/tsconfig.json`;
    
    try {
      const tsconfig = require(tsconfigPath);
      this.registerPathsFromTsconfig(compiler, tsconfig, packagePath);
    } catch (error) {
      console.warn(`No tsconfig.json found for workspace package: ${packageName}`);
    }
  }

  processNodeModulePackage(compiler, packageName) {
    const tsconfigPath = `${this.rootPath}/node_modules/${packageName}/tsconfig.json`;
    
    try {
      const tsconfig = require(tsconfigPath);
      const packagePath = `${this.rootPath}/node_modules/${packageName}`;
      this.registerPathsFromTsconfig(compiler, tsconfig, packagePath);
    } catch (error) {
      // 静默处理，不是所有包都有tsconfig.json
    }
  }

  registerPathsFromTsconfig(compiler, tsconfig, packagePath) {
    const paths = tsconfig.compilerOptions?.paths;
    if (!paths) return;

    const baseUrl = tsconfig.compilerOptions?.baseUrl || '.';
    const resolvedBaseUrl = path.resolve(packagePath, baseUrl);

    for (const [alias, values] of Object.entries(paths)) {
      if (Array.isArray(values) && values.length > 0) {
        const aliasPath = values[0];
        const resolvedPath = path.resolve(resolvedBaseUrl, aliasPath.replace('*', ''));
        
        // 注册到webpack的resolve.alias中
        if (!compiler.options.resolve) {
          compiler.options.resolve = {};
        }
        if (!compiler.options.resolve.alias) {
          compiler.options.resolve.alias = {};
        }
        
        compiler.options.resolve.alias[alias] = resolvedPath;
        console.log(`Registered alias: ${alias} -> ${resolvedPath}`);
      }
    }
  }
}

const path = require('path');
module.exports = TypescriptAliasPlugin; 