
let path = require("path")
let HtmlWebpackPlugin = require("html-webpack-plugin") //用于将html文件打包进去的插件
let MiniCssExtractPlugin = require("mini-css-extract-plugin")
let OptimizeCcss = require("optimize-css-assets-webpack-plugin")
let UglifyjsPlugin = require("uglifyjs-webpack-plugin")
let { CleanWebpackPlugin } = require("clean-webpack-plugin")
let CopyWebpackPlugin = require("copy-webpack-plugin")
let { BannerPlugin } = require("webpack")
let { DefinePlugin } = require("webpack")
let { IgnorePlugin } = require("webpack")
let { DllReferencePlugin } = require("webpack")


module.exports = {
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
          miniSize: 0, //表示公用模块大于0字节就抽离
          minChunks: 2,//表示模块被引用两次就抽离
        },
        vendor: {
          priority: 1,//表示权重，先抽离第三方模块
          test: /node_modules/,//抽离第三方包
          chunks: "initial", //表示从入口处开始找
          miniSize: 0, //表示第三方包大于0字节就抽离
          minChunks: 2,//表示第三方包被引用两次就抽离
        }
      }
    }
  },
  mode: "development",//模式 默认两种 production development

  //单页面
  entry: "./src/index.js", //入口
  output: {
    filename: "bundle.[hash:8].js", //打包后的文件名 [hash:8]表示每次更改后生成不同名字的打包文件，只显示八位hash,用于解决缓存问题
    path: path.resolve(__dirname, "build"),//路径必须是绝对路径
    // publicPath:"http://www.kedong.me" //添加公共路径，常用于文件cdn
  },

  plugins: [//数组 放着所有webpack插件(插件都是对象)
    new HtmlWebpackPlugin({
      template: './src/index.html', //模板的位置

      filename: "index.html", //打包后的名字
      minify: {//压缩代码
        removeAttributeQuotes: true,//删除属性的双引号
        collapseWhitespace: true, //打包成一行
      },
      hash: true //这个可以避免缓存带来的麻烦。默认为true
    }),
    new MiniCssExtractPlugin({ //具体见https://www.npmjs.com/package/mini-css-extract-plugin
      filename: "main.css" //抽离出的样式的名字
    }),
    // new CleanWebpackPlugin(), //表示先删除build再打包 常用于生产环境
    new CopyWebpackPlugin({
      patterns: [
        { from: 'doc', to: 'doc' },

      ]
    }),
    new BannerPlugin("make 2020 by kirkdong"),//添加声明
    new DefinePlugin({ //定义环境 便于开发生产的替换
      DEV: JSON.stringify("dev")
    }),
    new IgnorePlugin(/\.\/locale/, /moment/), //可以忽略掉moment包下的./locale 
    new DllReferencePlugin({//Dll动态链接库的引用
      manifest: path.resolve(__dirname, "build", "manifest.json")
    })
  ],

  //-----------多页面部分------------
  // entry: {
  //   home: "./src/index.js",
  //   other: "./src/index.js"
  // },
  // output: {
  //   filename: "[name].js",
  //   path: path.resolve(__dirname, "build"),
  // },

  // plugins: [//数组 放着所有webpack插件(插件都是对象)
  //   new HtmlWebpackPlugin({
  //     template: './src/index.html',
  //     filename: "home.html",
  //     chunks: ["home"],
  //   }),
  //   new HtmlWebpackPlugin({
  //     template: './src/index.html',
  //     filename: "other.html",
  //     chunks: ["other"]
  //   }),
  //   new MiniCssExtractPlugin({
  //     filename: "main.css" //抽离出的样式的名字
  //   })
  // ],
  //-----------多页面部分结束------------

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

  // resolve: {//解析第三方包 common 更多配置自行查阅
  //   module: [path.resolve("node_modules"),] //表示只去node_modules目录下找
  // },

  externals: {//不打包的第三方模块
    jquery: "jQuery"
  },

  module: {//模块
    noParse: /jquery/, //表示不去解析jquery的依赖库
    //loader
    rules: [
      //webpack打包样式
      //规则 css-loader 主要负责解析@import语法
      //style-loader 把css插入到head标签中
      //loader特点 希望单一，所以use一般用一个数组可以用来组合使用
      //loader执行顺序默认从右向左
      //loader可以写成对象形势
      //MiniCssExtractPlugin.loader
      //'psotcss-loader' 添加浏览器前缀 需要 添加postcss.config.js文件  package.json 添加"browserslist": ["iOS >= 6","Android >= 4","IE >= 9"]
      // { test: /\.css$/, use: [{ loader: 'style-loader' ,options:{insert:'top'}}, 'css-loader'] },
      // { test: /\.less$/, use: [{ loader: 'style-loader' ,options:{insert:'top'}}, 'css-loader','less-loader'] },
      { test: /\.css$/, use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'] },
      { test: /\.less$/, use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader', 'postcss-loader'] },


      //webpack打包Js
      {
        test: /\.js$/,
        include: path.resolve(__dirname, "src"), //需要的目录
        exclude: /node_modules/, //排除的目录
        use: {
          //用"babel-loader"将es6->es5
          loader: "babel-loader",

          options: {//优化项
            presets: [
              '@babel/preset-env',
              "@babel/preset-react" //解析react语法
            ],
            plugins: [
              ["@babel/plugin-proposal-decorators", { "legacy": true }],//常用来解析es7装饰器语法
              ["@babel/plugin-proposal-class-properties", { "loose": true }],//常用来解析es7类class语法
              "@babel/plugin-transform-runtime"
            ],

          },

        },
      },

      //webpack打包图片
      {
        test: /\.(htm|html)$/i,
        loader: 'html-withimg-loader'
      },
      // {//常用于图片打包
      //   test: /\.(png|jpg|gif)$/,
      //   use: {
      //     loader: 'file-loader',
      //     options: {
      //       esModule: false
      //     }
      //   }
      // },
      {
        test: /\.(png|jpg|gif)$/,
        //做限制，图片小于50k用base64 否则用file-loader
        use: {
          loader: 'url-loader',
          options: {
            limit: 50 * 1024,
            outputPath: "/img/", //将生成的图片放到img目录下
            esModule: false,
            // publicPath:"http://www.kedong.me" //单给图片添加公共路径，常用于图片当做cdn
          }
        }
      },
    ]
  }
}

