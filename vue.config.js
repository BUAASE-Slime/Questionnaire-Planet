module.exports = {
    // 配置本地调试 vue 的跨域问题；该文件不参与 build，因此不影响部署
    devServer: {
        host: "localhost",
        port: 8080,
        https: false,
        hotOnly: false,
        proxy: {  //配置跨域
            "/api": {
                //后端跑在本地8000端口，若连接服务器只需改为 https://zewan.cc/
                // target: "http://localhost:8000/",
                target: "https://zewan.cc/",
                ws: true,
                changOrigin: true,  //允许跨域
                pathRewrite: {
                    "^/api": "",
                },
            },
        }
    },
}