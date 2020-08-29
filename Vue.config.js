const PtoViewPort = require("postcss-px-to-viewport");
const TerserPlugin = require("terser-webpack-plugin");
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const productionGzipExtensions = ['js', 'css']
module.exports = {
  configureWebpack: (config) => {
    return {
      optimization: {
        minimizer: [
          new TerserPlugin({
            sourceMap: false,
            terserOptions: {
              compress: {
                drop_console: true,
              },
            },
          }),
          new CompressionWebpackPlugin({
            algorithm: 'gzip',
            test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
            threshold: 10240,
            minRatio: 0.8
          }),
        ],
      },
    };

  },
  publicPath:'/api/dist/',
  productionSourceMap: false,
  devServer: {
    host: "localhost",
    port: "8888",
    open: true, //是否自动弹出浏览器页面
  },
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          PtoViewPort({
            viewportWidth: 375,
            selectorBlackList: ["vant"],
          }),
        ],
      },
    },
  },
};
