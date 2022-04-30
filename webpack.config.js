const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const port = process.env.PORT || 3000;
const webpack = require("webpack")
module.exports = {
  mode: 'development',
  entry: './src/index.tsx',
  output: {
    filename: 'bundle.[fullhash].js'
  },
  devtool: 'inline-source-map',
  module: {
    rules:[
      {
        test: /\.js$|\.ts$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
       {test: /\.ts$|\.tsx$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript']
          }
        }
      },
      {
        test: /\.(js|jsx)$/, // .js and .jsx files
        exclude: /node_modules/, // excluding the node_modules folder
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.(sa|sc|c)ss$/, // styles files
        use: ["style-loader", "css-loader", "sass-loader"],
        // use: [{
        //   loader: 'css-loader',
        //   // options: {
        //   //   modules: true,
        //   //   localsConvention: 'camelCase',
        //   //   sourceMap: true
        //   // }
        // },
        // {loader:"style-loader"},
        // {loader:"sass-loader"}

      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'public/index.html',
      favicon: 'public/favicon.ico'
    }),
    new webpack.ProvidePlugin({
      process: 'process/browser',
}),
  ],
  devServer: {
    host: 'localhost',
    port: port,
    historyApiFallback: true,
    open: true
  },
  resolve: {
    extensions: ['.ts', '.js', '.jsx', '.tsx'],
    alias: {
      "@components": path.resolve(__dirname, "./src/components"),
      "@pages": path.resolve(__dirname, "./src/pages"),
      "@zui": path.resolve(__dirname, "./src/zonez-ui"),
      process: "process/browser",
    }
  },
};

// Older one
// module.exports = {
//   resolve: {
//     extensions: ['.ts', '.js', '.jsx', '.tsx'],
//     // preferRelative: false

//     alias: {
//       "@components": path.resolve(__dirname, "src/components"),
//       "@pages": path.resolve(__dirname, "src/pages"),
//       "@zui": path.resolve(__dirname, "src/zonez-ui"),
//     }
//   },
//   output: {
//     path: path.join(__dirname, "/dist"), // the bundle output path
//     filename: "bundle.js", // the name of the bundle
//     publicPath: '/'
//   },
//   plugins: [
//     new HtmlWebpackPlugin({
//       template: "public/index.html", // to import index.html file inside index.js
//       inject: true
//     }),
//   ],
//   devServer: {
//     port: 3000, // you can change the port
//     historyApiFallback: true,
//   },
//   module: {
//     rules: [
//       {
//         test: /\.(ts|js)x?$/i,
//         exclude: /node_modules/,
//         use: {
//           loader: 'babel-loader',
//           options: {
//             presets: [
//               '@babel/preset-env',
//               '@babel/preset-react',
//               '@babel/preset-typescript',
//             ],
//           },
//         },
//       },
//       // {
//       //   test: /\.js$/,
//       //   enforce: 'pre',
//       //   use: ['source-map-loader'],
//       // },
//       // {
//       //   test: /\.ts$|\.tsx$/,
//       //   exclude: /node_modules/,
//       //   use: {
//       //     loader: "babel-loader",
//       //     options: {
//       //       presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript']
//       //     }
//       //   }
//       // },
//       // {
//       //   test: /\.(js|jsx|ts|tsx)$/, // .js and .jsx files
//       //   exclude: /node_modules/, // excluding the node_modules folder
//       //   use: {
//       //     loader: "babel-loader",
//       //   },
//       // },
//       {
//         test: /\.(sa|sc|c)ss$/, // styles files
//         use: ["style-loader", "css-loader", "sass-loader"],
//       },
//       {
//         test: /\.(png|woff|woff2|eot|ttf|svg)$/, // to import images and fonts
//         loader: "url-loader",
//         options: { limit: false },
//       },
//     ],
//   },
// };

// working?? kinda
// module.exports = {
//   resolve: {
//     extensions: ['.ts', '.js', '.jsx', '.tsx'],
//     // preferRelative: false

//     alias: {
//       "@components": path.resolve(__dirname, "src/components"),
//       "@pages": path.resolve(__dirname, "src/pages"),
//       "@zui": path.resolve(__dirname, "src/zonez-ui"),
//     }
//   },
//   output: {
//     path: path.join(__dirname, "/dist"), // the bundle output path
//     filename: "bundle.js", // the name of the bundle
//     publicPath: '/'
//   },
//   plugins: [
//     new HtmlWebpackPlugin({
//       template: "public/index.html", // to import index.html file inside index.js
//       inject: true
//     }),
//   ],
//   devServer: {
//     port: 3000, // you can change the port
//     historyApiFallback: true,
//   },
//   module: {
//     rules: [
//       {
//         test: /\.(ts|js)x?$/i,
//         exclude: /node_modules/,
//         use: {
//           loader: 'babel-loader',
//           options: {
//             presets: [
//               '@babel/preset-env',
//               '@babel/preset-react',
//               '@babel/preset-typescript',
//             ],
//           },
//         },
//       },
//       {
//         test: /\.(sa|sc|c)ss$/, // styles files
//         use: ["style-loader", "css-loader", "sass-loader"],
//       },
//       {
//         test: /\.(png|woff|woff2|eot|ttf|svg)$/, // to import images and fonts
//         loader: "url-loader",
//         options: { limit: false },
//       },
//     ],
//   },
// };