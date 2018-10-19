module.exports = {
  entry: [
    'themes/hexo-theme-moustache/source/public/js/main.js'
  ],
  module: {
    loaders: [{
      test: /\.js/,
      loader: 'babel-loader',
      exclude: /node_modules/,
      query: {
        presets: [
          ['es2015', {
            modules: false,
            loose: true
          }]
        ]
      }
    }]
  }
};