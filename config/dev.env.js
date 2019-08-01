//开发环境的变量
var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
    NODE_ENV: '"development"',
    Mock: true,
    API_ROOT: '"http://192.168.8.82:99"' //设置
})