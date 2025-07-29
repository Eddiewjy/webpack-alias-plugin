const path = require('path');
const TypescriptAliasPlugin = require('./plugin-fixed');

module.exports = {
  mode: 'development',
  entry: './packages/package-a/src/index.ts',
  output: {
    path: path.resolve(__dirname, 'dist-fixed'),
    filename: 'bundle.js',
    clean: true
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    alias: {
      // 基础别名配置
      '@': path.resolve(__dirname, 'packages/package-a/src'),
      '@utils': path.resolve(__dirname, 'packages/package-a/src/utils'),
      '@constants': path.resolve(__dirname, 'packages/package-a/src/constants'),
      '@types': path.resolve(__dirname, 'packages/package-a/src/types')
    }
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new TypescriptAliasPlugin(__dirname)
  ],
  devtool: 'source-map'
}; 