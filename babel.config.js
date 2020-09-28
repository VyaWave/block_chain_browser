module.exports = {
  // presets: [
  //   '@vue/app'
  // ],
  presets: [['@vue/app', {

    // debug: true,

    polyfills: ['es6.promise', 'es6.array.find-index', 'es7.array.includes', 'es6.string.includes']

  }]],
  plugins: [
    ["@babel/plugin-proposal-decorators", { "legacy": true }],
    ["@babel/plugin-transform-runtime"]
  ]
}
