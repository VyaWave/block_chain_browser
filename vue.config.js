
const path = require('path');

const resolve = dir => {
  return path.join(__dirname, dir)
}

// 项目部署基础
// 默认情况下，我们假设你的应用将被部署在域的根目录下,
// 例如：https://www.my-app.com/
// 默认：'/'
// 如果您的应用程序部署在子路径中，则需要在这指定子路径
// 例如：https://www.foobar.com/my-app/
// 需要将它改为'/my-app/'
// iview-admin线上演示打包路径： https://file.iviewui.com/admin-dist/
const BASE_URL = process.env.NODE_ENV === 'production'
  ? '/'
  : '/'

module.exports = {


  // Project deployment base
  // By default we assume your app will be deployed at the root of a domain,
  // e.g. https://www.my-app.com/
  // If your app is deployed at a sub-path, you will need to specify that
  // sub-path here. For example, if your app is deployed at
  // https://www.foobar.com/my-app/
  // then change this to '/my-app/'
  publicPath: BASE_URL,
  // tweak internal webpack configuration.
  // see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
  // 如果你不需要使用eslint，把lintOnSave设为false即可
  lintOnSave: false,

  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src')) // key,value自行定义，比如.set('@@', resolve('src/components'))
      .set('@c', resolve('src/components'))


  },
  // 设为false打包时不生成.map文件
  productionSourceMap: false,
  // 这里写你调用接口的基础路径，来解决跨域，如果设置了代理，那你本地开发环境的axios的baseUrl要写为 '' ，即空字符串
  devServer: {

    proxy: {

      //这里代理去权限系统
      '/api/acs/v1': {
        target: "http://192.168.1.245:9730",
        changeOrigin: true,
      },

      //这里代理去后台系统
      '/api': {
        target: "http://apiv2.test.camchat.im:18890",
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''   //需要rewrite的,
        }
      }
    }
  },
  configureWebpack: {

    module: {
      rules: [
        {
          test: /\.m?js$/,
          //exclude用下面配置的话，默认是过滤不编译node_modules 路径下的文件
          //exclude: /(node_modules|bower_components)/,
          //include 指定需要编译的文件路径
          include: [
            resolve('src'),
            resolve('node_modules/tree-table-vue/lib'),
            resolve('node_modules/v-org-tree/dist'),
            resolve('node_modules/iview/src/locale')
          ],
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        }
      ]
    }
  },

}
