const path = require('path')
const fs = require('fs')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const { WebpackManifestPlugin } = require('webpack-manifest-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const WebpackQRCodePlugin = require('webpack-dev-server-qr-code')

module.exports = {
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.svg'],
    alias: {
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@context': path.resolve(__dirname, 'src/context'),
      '@styles': path.resolve(__dirname, 'src/styles'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@hooks': path.resolve(__dirname, 'src/hooks'),
      '@constants': path.resolve(__dirname, 'src/constants'),
    },
    fallback: {
      stream: false,
      util: false,
      buffer: false,
      dns: false,
      https: false,
      http2: false,
      os: false,
      net: false,
      tls: false,
      fs: false,
      url: false,
      zlib: false,
      http: false,
    },
  },
  module: {
    rules: [
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'babel-loader',
            options: { cacheDirectory: true },
          },
          {
            loader: '@svgr/webpack',
            options: {
              babel: false,
              icon: true,
              svgoConfig: {
                plugins: [
                  {
                    name: 'removeAttrs',
                    params: {
                      attrs: '',
                      preserveCurrentColor: true,
                    },
                  },
                ],
              },
            },
          },
        ],
      },
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            babelrc: true,
          },
        },
      },
      {
        test: /\.(sa|sc|c)ss$/, // styles files
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(png|jpe?g|gif|webp)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]',
            },
          },
        ],
      },
      {
        test: /\.(mp4|webm|ogg|swf|ogv)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[hash].[ext]',
              outputPath: 'videos/',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [{ from: path.resolve(__dirname, 'public'), to: 'public' }],
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      favicon: './public/favicon.ico',
    }),
    new WebpackManifestPlugin({
      fileName: 'manifest.json',
      publicPath: '/',
      generate: (seed, files, entrypoints) => {
        const manifestFiles = files.reduce((manifest, file) => {
          manifest[file.name] = file.path
          return manifest
        }, seed)

        // Read the existing web manifest
        const webManifestPath = path.resolve(
          __dirname,
          'public',
          'manifest.webmanifest'
        )
        const webManifest = JSON.parse(fs.readFileSync(webManifestPath, 'utf8'))

        // Merge the asset manifest with the web manifest
        const mergedManifest = {
          ...webManifest,
          ...manifestFiles,
        }

        return mergedManifest
      },
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new WebpackQRCodePlugin(),
  ],
  devServer: {
    static: path.join(__dirname, 'public'),
    port: 3000,
    hot: true,
    host: '0.0.0.0',
    historyApiFallback: true,
  },
}
