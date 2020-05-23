## webpack安装
- 安装本地webpack
- yarn add webpack webpack-cli -D
- yarn add webpack-dev-server -D  开发模式用于打包生成在内存中便于开发调试的插件
- yarn add html-webpack-plugin -D
用于将html文件打包进去的插件
- yarn add css-loader style-loader less-loader
- yarn add mini-css-extract-plugin -D 常用于抽离css,变为link标签引入模式
- yarn add postcss-loader  autoprefixer -D 加浏览器前缀
- yarn add optimize-css-assets-webpack-plugin -D  通常用于压缩css 使用之后要使用下面的uglifyjs,对js也压缩
- yarn add uglifyjs-webpack-plugin -D 通常用于压缩js
- yarn add babel-loader @babel/core @babel/preset-env -D
常用于将es6语法转换成es5
- yarn add @babel/plugin-proposal-class-properties -D
常用来解析es7类class语法
-  yarn add @babel/plugin-proposal-decorators -D 
常用来解析es7装饰器语法
- yarn add @babel/plugin-transform-runtime
- yarn add file-loader -D常用于图片打包
- yarn add url-loader -D 常用于图片打包，限制大小转换成base64
- yarn add clean-webpack-plugin -D 常用于将原来打包的文件删除重新生成
- yarn add copy-webpack-plugin -D 常用于将指定的文件也拷贝到打包文件里
- yarn add webpack-merge   -D   常用于区分开发生产环境,来组合配置文件
- yarn add @babel/preset-react   -D 
常用于解析react的jsx语法
- yarn add happypack 实现多线程打包


## 一个常用的配置文件webpack.config.js

## 为了方便开发，我们可以将webpack配置文件分成三个部分

公共:webpack.common.js

开发:webpack.dev.js

生产:webpack.prod.js


**webpack.config.react.js是一个单独打包react的配置，用作动态链接库** 

可以提前打包好，省的每次打包时在一起打包

npx webpack webpack.config.react.js

生成的dll文件需要在html文件中引入

记得在配置文件里配置这个相应的插件new DllReferencePlugin

