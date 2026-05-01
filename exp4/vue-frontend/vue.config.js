const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  // 打包时使用相对路径，确保整合后资源引用正确
  publicPath: "/ssm-backend/",
  assetsDir: "static",
  // 开发时代理到后端Tomcat端口
  devServer: {
    port: 8081,
    proxy: {
      "/user": {
        target: "http://localhost:8080/ssm-backend",
        changeOrigin: true,
      },
    },
  },
  css: {
    loaderOptions: {
      css: {
        url: {
          // 跳过绝对路径（以 / 开头），避免 css-loader 将其当作模块解析
          filter: (url) => !url.startsWith("/"),
        },
      },
    },
  },
});
