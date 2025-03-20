// const { defineConfig } = require('@vue/cli-service')
// module.exports = defineConfig({
//   transpileDependencies: true
// })

const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,

  // Set the publicPath to match your GitHub repository name
  publicPath: process.env.NODE_ENV === 'production'
    ? '/Project_planner/'  // Ensure this is the correct repo name
    : '/'
})
