
//优化css的测试代码
require("./index.css")
require("./a.less")



//忽略语言包插件的测试
//手动引入中文包
import moment from "moment"
import 'moment/locale/zh-cn'
moment.locale("zh-cn")
let r=moment().endOf('day').fromNow()
console.log(r)


//配置环境的测试代码
let url = ""
console.log(DEV)
if (DEV==="dev") {
  url = "http://localhost:3000"
} else {
  url = "https://kedong.me"
}
console.log(url)


//优化图片的测试代码
import testimg from './testimg.png'
let image = new Image()
image.src = testimg
document.body.appendChild(image)

//优化第三方包的测试代码
import $ from 'jquery'
console.log($)
console.log("hello webpack1")


//优化js的测试代码
let fn = () => {
  console.log("es6语法")
}
fn()


@warp
class A {
  static a = "es7语法"
}

console.log(A.a)

//装饰器
function warp(obj) {
  console.log("装饰class")
  return obj
}

//生成器语法
function* gen(params) {
  yield "生成器语法"
}
console.log(gen().next())



import React from "react"
import ReactDOM from "react-dom"

ReactDOM.render(<h1>REACTJsx</h1>,document.getElementById("react"))