const { defineConfig } = require('@vue/cli-service')
const path = require('path')
module.exports = defineConfig({
  transpileDependencies: true,

  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: [
        path.resolve(__dirname, './src/style/tools/_sassMagic.scss'),
        path.resolve(__dirname, './src/style/settings/var.scss')
      ]
    }
  },

  css: {
    loaderOptions: {
      postcss: {
        postcssOptions: {
          plugins: [
            require('postcss-plugin-px2rem')({
              rootValue: 37.5,
              exclude: /(node_module)/,
              minPixelValue: 3
            })
          ]
        }
      }
    }
  }
})
