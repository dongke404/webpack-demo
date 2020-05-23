
//开发时所用配置
let { smart } = require('webpack-merge')
let common = require('./webpack.common.js')

module.exports = smart(common, {
  mode: "development",
  devServer: {//开发服务器的配置
    hot: true,//启用热更新 
    port: 3000, //监听端口
    progress: true, //进度条显示
    contentBase: "./build", //内存中打包的文件夹名
    proxy: {
      "/api": { //代理设置
        target: 'http://localhost:5000',
        pathRewrite: { '/api': '' } //把带/api重写成/
      }
    }
  },
  //源码映射工具，会单独生成一个sourcemap文件 出错会标识当前报错的列合行
  devtool: "source-map",//增加映射文件可以帮我们调试源代码
  //devtool:"eval-source-map",//不会产生单独的文件，会错误显示行和列
  //devtool:"cheap-source-map",//不会产生列 但是是一个单独的映射文件，产生后可以保存
  //devtool:"cheap-moudle-evel-source-map" //不会产生文件，集成在打包文件中，不会产生列
  watch: true,//监控文件实时变化进行打包
  watchOptions: { //监控的配置
    poll: 1000, //每秒检查一次变动
    ignored: /node_modules/,  //忽略指定文件的变化
    aggregateTimeout: 300, //防抖功能 300ms
  },
})