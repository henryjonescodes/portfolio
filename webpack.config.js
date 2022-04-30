const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.svg'],
    alias: {
      "@assets": path.resolve(__dirname, "src/assets"),
      "@components": path.resolve(__dirname, "src/components"),
      "@pages": path.resolve(__dirname, "src/pages"),
      "@hooks": path.resolve(__dirname, "src/hooks"),
      "@constants": path.resolve(__dirname, "src/constants"),
    },
    fallback: {
    'stream':  false,
      'util':false,
      "buffer": false,
      "dns": false,
      "https": false,
      "http2": false,
      "os": false,
      "net": false,
      "tls": false,
      "fs": false,
      "url": false,
      "zlib": false,
      "http": false,
    },
  },
  module: {
    rules: [
      {
        test: /\.svg$/,
      use: [
        {
          loader: 'babel-loader?cacheDirectory',
        },
        {
          loader: '@svgr/webpack',
          options: {
            babel: false,
            icon: true,
          },
        },
      ],
      },
      // {
      //   test: /\.svg$/,
      //   exclude: /node_modules/,
      //   use: {
      //     loader: 'svg-react-loader',
      //     options: {
      //       tag: 'symbol',
      //       attrs: {
      //         title: 'example',
      //       },
      //       name: 'MyIcon',
      //     },
      //   },
      // },
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            cacheDirectory: true,
            babelrc: true,
          },
        },
      },
      {
        test: /\.(sa|sc|c)ss$/, // styles files
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html'
    })
  ],
  devServer: {
    static: path.join(__dirname, 'public'),
    port: 3000,
    hot: true,
    historyApiFallback: true
  }
};
