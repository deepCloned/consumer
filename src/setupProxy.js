const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    createProxyMiddleware("/api", {
      target: "https://wechat.megameta.cn/archives/",
      changeOrigin: true,
      pathRewrite: {
        "^/api": "",
      },
    }),
    createProxyMiddleware("/agent", {
      target: "https://wechat.megameta.cn/consumer/",
      changeOrigin: true,
      pathRewrite: {
        "^/agent": "",
      },
    })
  );
};
