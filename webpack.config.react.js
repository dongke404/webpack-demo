//单独打包react react-dom 做动态链接库
let path=require("path")
let webpack=require("webpack")
module.exports={
  mode:"development",
  entry:{
    react:["react","react-dom"]
  },
  output:{
    filename:'_dll_[name].js',
    path:path.resolve(__dirname,"build"),
    library:"_dll_[name]",          //_dll_react
    libraryTarget:"var" // commonjs var this ....
  },
  plugins:[
    new webpack.DllPlugin({//name==library
      name:"_dll_[name]",
      path:path.resolve(__dirname,"build","manifest.json")
    })
  ]
}