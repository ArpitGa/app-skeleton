const webpack = require('webpack');
const path = require('path');

const config = {
  devtool: 'source-map',
  target: 'web',
  entry: {
    main: [
      './src/clientRenderer'
    ]
  },
  output: {
    filename: `[name].js`,
    path: path.resolve(__dirname, 'assets'),
    publicPath: "/assets/"
  },
  node: {
    module: "empty",
    fs: "empty"
  },
  resolve: {
    modules: [
      'node_modules'
    ]
  },
  module: {
    rules: [
    {
      test: /\.jsx?$/,
      exclude: [/node_modules/, /dist/],
      use: [
        {
          loader: 'babel-loader',
          query: {
            babelrc: false,
            presets: ['es2015', 'react'],
            plugins: []
          }
        }
      ],
    }
  ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify('production') },
    })
  ],
  performance: {
    hints: "warning"
  },
  stats: {
    children: false,
    assets: true,
    warnings: true
  }
};

module.exports = config;
