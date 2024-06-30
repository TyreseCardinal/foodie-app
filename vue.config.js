const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})

module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'https://innotechfoodie.ml',
        changeOrigin: true,
        pathRewrite: { '^/api': '' },
      },
    },
  },
};
