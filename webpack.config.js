//Konfiguracja Webpack
module.exports = {
    entry: "./js/first.jsx",
    output: { filename: "./js/out.js" },
    watch: true,
   module: {
      loaders: [{
        test: /\.jsx$/,  exclude: /node_modules/,
        loader: 'babel-loader',
        query: { presets: [ 'es2015', 'stage-2', 'react'] }
      }, {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      }, {
        test: /\.scss$/,
        use: [ 'style-loader', 'css-loader', 'sass-loader' ]
      }]
    }
}
