// 区分开发环境和生产环境

// 1. 写两个url，用哪一个就注释掉另一个
// const BASE_URL = 'http://coderwhy.dev:8000'
// const BASE_URL = 'http://codercba.prod:8000'

// 2.通过创建.env文件直接创建变量，能够通过vite直接获取到VITE_为前缀的变量
// console.log(import.meta.env.VITE_BASE_URL)

// 3.代码逻辑判断, 判断当前环境
// vite默认提供的环境变量
// console.log(import.meta.env.MODE) // 打印当前所处的模式 dev/prod/ssr
// console.log(import.meta.env.DEV) // 是否开发环境
// console.log(import.meta.env.PROD) // 是否生产环境
// console.log(import.meta.env.SSR) // 是否是服务器端渲染(server side render)

let BASE_URL = ''
if (import.meta.env.PROD) {
  BASE_URL = 'http://123.207.32.32:5000'
} else {
  BASE_URL = 'http://123.207.32.32:5000'
}

const TIME_OUT = 10000
export { BASE_URL, TIME_OUT }
