module.exports = {
    devServer:{
        port:8081, // 启动端口
        open:true,  // 启动后是否自动打开网页
        // proxy: {  //配置跨域
        // '/www.baidu.cn/': {
        //     target: 'http://localhost:8081/',  //这里后台的地址模拟的;应该填写你们真实的后台接口
        //     changOrigin: true,  //允许跨域
        //     pathRewrite: {
        //     /* 重写路径，当我们在浏览器中看到请求的地址为：http://localhost:8080/api/core/getData/userInfo 时
        //         实际上访问的地址是：http://121.121.67.254:8185/core/getData/userInfo,因为重写了 /api
        //         */
        //     '^/www.baidu.cn/': '' 
        //     }
        // },
        // }
    },
    publicPath: "./",
    // 关闭线上源码
    productionSourceMap: false,
    chainWebpack: (config) => {
        const svgRule = config.module.rule('svg');
     
        svgRule.uses.clear();
     
        svgRule
          .use('babel-loader')
          .loader('babel-loader')
          .end()
          .use('vue-svg-loader')
          .loader('vue-svg-loader');
      },
}