const path = require('path');
const webpack =require('webpack')
const htmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin')//配置vue-loader
module.exports = {
    mode:'development',
    entry:'./src/main.js',
    output:{
        path:path.resolve(__dirname,'dist'),
        filename:'bundle.js'
    },
    plugins:[//数组  创建一个在内存中生成html页面的插件 物理没有内存快
        new htmlWebpackPlugin({
            template:path.join(__dirname,'./src/index.html'),//指定模板页面 会根据制定的模板页面路径生成内存中的页面
            filename:'index.html'//指定生成页面名称
        }),
        new VueLoaderPlugin()
    ],
    module:{
        rules:[
            {test:/\.css$/, use:['style-loader','css-loader']},
            {test:/\.vue$/,use:'vue-loader'},
            {test:/\.(ttf|woff2|woff|eot|svg)$/,use:'url-loader'},
            {test:/\.scss$/,use:['style-loader','css-loader','sass-loader']},
            {test:/\.less$/,use:['style-loader','css-loader','less-loader']},
            {test:/\.js$/,exclude: /node_modules/,use:'babel-loader'},
            {test:/\.(jpg|png|gif|bmp|jpeg)$/,use:'url-loader'}
        ]
    },
    // resolve: {
    //     alias: {
    //         'vue$': 'vue/dist/vue.js'//需要重新运行下
    //     }
    // },
}