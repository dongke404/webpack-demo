//生产环境所用配置
let { smart } = require('webpack-merge')
let common = require('./webpack.common.js')
let OptimizeCcss = require("optimize-css-assets-webpack-plugin")
let UglifyjsPlugin = require("uglifyjs-webpack-plugin")
let { CleanWebpackPlugin } = require("clean-webpack-plugin")

module.exports = smart(common, {
  mode: "production",
  optimization: {//各优化项 
    minimizer: [
      new UglifyjsPlugin({
        cache: true,
        parallel: true, //变一行
        sourceMap: true
      }
      ),//压缩js
      new OptimizeCcss({}),//压缩css
    ],
    splitChunks: { //分割代码块 常用于多个入口导入公共模块的时候 老版本commonChunkPlugins
      cacheGroups: {//缓存组
        common: {//公共的模块
          chunks: "initial", //表示从入口处开始找
          minSize: 0, //表示公用模块大于0字节就抽离
          minChunks: 2,//表示模块被引用两次就抽离
        },
        vendor: {
          priority: 1,//表示权重，先抽离第三方模块
          test: /node_modules/,//抽离第三方包
          chunks: "initial", //表示从入口处开始找
          minSize: 0, //表示第三方包大于0字节就抽离
          minChunks: 2,//表示第三方包被引用两次就抽离
        }
      }
    }
  },
  plugins: [//数组 放着所有webpack插件(插件都是对象)
    // new CleanWebpackPlugin(), //表示先删除build再打包 常用于生产环境
  ],
})