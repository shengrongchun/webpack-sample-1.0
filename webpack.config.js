var webpack = require('webpack');

module.exports = {
    devtool: 'eval-source-map',        //配置生成source maps,方便调试

    //entry:  __dirname + "/app/main.js",//已多次提及的唯一入口文件
    // entry: {
    //     file1: __dirname + '/app/temp.js',
    //     file2: __dirname + '/app/main.js'
    // },

    //入口
    entry: [__dirname + "/app/temp.js",__dirname + "/app/main.js"],

    //出口
    output: {
        path: __dirname + "/public",   //打包后的文件存放的地方
        publicPath: '',                //设置资源的访问路径
        //library: 'aaa',               //输出模块的类名
        //libraryTarget: 'umd',         //输出模块的兼容规范
        filename: "bundle.js"          //打包后输出文件的文件名
    },

    //模块配置加载器
    module: {
        loaders: [
            { 
                test: /\.css$/,             //匹配规则
                loader: "style!css" ,      //也可以这样写：loader:["style","css"],载入的loader
                //exclude: /(node_modules)/ //想忽略的文件夹下面的文件
            },
        ]
    },

    //插件
    plugins: [
        /**
         * 压缩js
         */
        new webpack.optimize.UglifyJsPlugin({//如果需要更多功能请使用UglifyJS 3
            compress: {//相关参数查看
                warnings: false,//当删除没有用处的代码时，不显示警告
            }
        }),
        //nodejs api启动server或devServer中配置hot都需要加hot插件
        new webpack.HotModuleReplacementPlugin(),
    ],

    //模块：别名、后缀、路径配置
    resolve: {
        //别名
        alias: {
            bg_color_css: './css/style',
            Greeter_js: './Greeter'
        },
        //路径
        root: __dirname+'/app',
        //后缀
        extensions: ['','.js','.css']
    },

    //webpack和CDN结合使用
    externals: {
        //temp: 'tempObj'
    },





    //启动本地服务器
    devServer: {//只对命令行启动webpack-dev-server有效
        stats: {
            colors: true, //输出彩色,packjson也可以设置
        },
        contentBase: './public',    //本地服务器所加载的页面目录
        inline: true,               //实时刷新,命令行添加也行，两者选一
        historyApiFallback: true,   //支持历史api
        port: 8999,                  //服务端口
        hot: true,                   //热替代,可在命令行添加看package.json,这里加还要加插件new webpack.HotModuleReplacementPlugin(),两者不能同时使用，否则会出现栈溢出
        open: true,                 //自动打开浏览器
        // proxy: {                     //代理,这里是webpack-dev-server自带的proxy,单个写法
        //     '/upload': {
        //         target: 'http://localhost:3009',
        //         secure: false,          //是否认证SSL(secure sockets layer)证书
        //     }
        // },
        proxy: [{                   //代理，这里是webpack-dev-server自带的proxy,多个写法
            context: ['/upload','/api'],
            target: 'http://localhost:3009',
            secure: false,          //是否认证SSL(secure sockets layer)证书
        }],
    },
    





}