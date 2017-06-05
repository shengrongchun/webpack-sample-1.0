var gulp = require('gulp');
var webpack = require('webpack');
var config = require('./webpack.config');
var WebpackDevServer = require('webpack-dev-server');



//用gulp启动 serve
gulp.task('serve',function() {
    // body...
    
    config.entry.bundle.unshift('webpack-dev-server/client?http://localhost:8888/','webpack/hot/dev-server');//这里是自动刷新的地址
    //
    var compiler = webpack(config);
    //
    var server = new WebpackDevServer(compiler,{
        contentBase:'dist/',//切勿写成/public
        publicPath: '',
        hot: true,//热替换,还有在plugins中加入new webpack.HotModuleReplacementPlugin()
        stats: {
                colors: true,//输出彩色
                chunks: false,//是否显示块化过程
                modules: false,//是否显示模块化过程

        },
        // proxy: {                     //代理,这里是webpack-dev-server自带的proxy，单个写法，如果不想用自带的，可以用http-proxy-middleware插件
        //     '/upload': {
        //         target: 'http://localhost:3009',
        //         secure: false,          //是否认证SSL(secure sockets layer)证书
        //     }
        // },
        proxy: [{                   //代理，这里是webpack-dev-server自带的proxy,多个写法
            context: ['/upload','/api'],
            target: {
                'host': 'localhost',
                'protocol': 'http',
                'port': 3009,
            },
            pathRewrite: {'/upload':'/api'},         //路径重写
            secure: false,          //是否认证SSL(secure sockets layer)证书
            // bypass: function(req,res,proxyOption) { // 绕过请求代码，比如对一些请求文件类型是text/html的不要代理
            //     // body...
            //     if (req.headers.accept.indexOf('html') !== -1) {
            //         console.log('Skipping proxy for browser request.');
            //         return '/index.html';
            //     }
            // }
        }],

    });
    //
    server.listen(8888);

});
