const isProduction = process.env.NODE_ENV === 'production';
const CompressionPlugin = require("compression-webpack-plugin");
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
    parallel: false,
    // assetsDir: './',
    // publicPath: '',
    css: {
        loaderOptions: {
            sass: {
                prependData: '@import "@/assets/scss/variable.scss";'
            }
        }
    },
    productionSourceMap: !isProduction,
    chainWebpack: config => {
        if (isProduction) {
            config.plugins.delete('preload');
            config.plugins.delete('prefetch');
        };
    },
    configureWebpack: config => {
        config.resolve.extensions = ['.vue', '.ts', '.js', '.css', '.json'];
        if (isProduction) {
            // config.plugins.push(new TerserPlugin({ terserOptions: { compress: { drop_console: true } } }));
            // config.plugins.push(new CompressionPlugin({
            //     test: /\.js$|\.css$|\.jpg$|\.jpeg$|\.png/, // 需要压缩的文件类型
            //     threshold: 10240, // 需要进行压缩的文件大小最小值，10K以上的进行压缩
            //     deleteOriginalAssets: false // 是否删除原文件
            // }));
        };
    }
};
