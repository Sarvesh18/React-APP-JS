var path = require('path');
var webpack = require('webpack');
var nodeExternals = require('webpack-node-externals');
var HtmlWebpackPlugin = require("html-webpack-plugin");
var MiniCssExtractPlugin = require("mini-css-extract-plugin");

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

var browserConfig = {
  mode: 'development',
  entry: path.resolve(__dirname, '../src/client/index.js'),
  //externals: [nodeExternals()],
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'static/js/bundle.js',
    //publicPath: '/'
  }, 
  devServer: {
    host: "localhost",
    inline: true,
    //open: true,
    //hot: true,
    historyApiFallback: true,
    port: 3000
  },
  module: {
    rules: [
      /*{
        test: /\.(js||jsx)$/,
        exclude: /node_modules/,
        loader: "eslint-loader",
        options: { failOnError: false }
      },*/
      {  
        test: /\.(jsx|js)$/,
        exclude: /node_modules/,
        use: 'babel-loader' 
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader, //style-loader
          },
          "css-loader"
        ],
        //'style-loader!css-loader?modules=true&localIdentName=[name]__[local]___[hash:base64:5]'
      },
      {
        test: /\.(woff|woff2)$/,
        loader: 'file-loader', 
      }, 
      {
        test: /\.(svg|png|jpg)$/, 
        loader: 'url-loader'
      }
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.css'], //*
    alias: {
        //"react": "preact-compat",
        //"react-dom": "preact-compat",
        // Not necessary unless you consume a module using `createClass`
        //"create-react-class": "preact-compat/lib/create-react-class",
        // Not necessary unless you consume a module requiring `react-dom-factories`
        //'react-dom-factories': 'preact-compat/lib/react-dom-factories'

        '@hooks': path.resolve(__dirname, '../src/common/hooks'),
        '@views': path.resolve(__dirname, '../src/common/views'),
        '@layouts': path.resolve(__dirname, '../src/common/layouts'),
        //'@providers': path.resolve(__dirname, '../src/common/providers'),
        '@components': path.resolve(__dirname, '../src/common/components'),

        '@lib': path.resolve(__dirname, '../src/common/lib'),
        '@utils': path.resolve(__dirname, '../src/common/utils'),
        '@assets': path.resolve(__dirname, '../src/common/assets'),
    }
  },
  plugins: [

    //new CleanWebpackPlugin(),

    new CopyPlugin({
      patterns: [
          { from: path.resolve(__dirname, '../public', 'robots.txt'), to: path.resolve(__dirname, '../dist') },    
          { from: path.resolve(__dirname, '../public', 'favicon.ico'), to: path.resolve(__dirname, '../dist') },
          
          { from: path.resolve(__dirname, '../public', 'logo192.png'), to: path.resolve(__dirname, '../dist') },
          { from: path.resolve(__dirname, '../public', 'logo512.png'), to: path.resolve(__dirname, '../dist') },
          { from: path.resolve(__dirname, '../public', 'manifest.json'), to: path.resolve(__dirname, '../dist') },
      
        ]
    }),

    new webpack.DefinePlugin({
      'process.env.BASE_URL': JSON.stringify('https://api.spaceXdata.com/v3'),
      'process.env.NODE_ENV': JSON.stringify('development'),
      'process.env.DEBUG': JSON.stringify(false),
      //'PUBLIC_URL': JSON.stringify('localhost:800'),
      __isBrowser__: JSON.stringify(true)
    }),

    /*new HtmlWebpackPlugin({
      //inject: true,
      //appMountId: 'app',
      //filename: "index.html",
      //title: 'Test App',
      template: "./public/index.html"
    }),*/
    new MiniCssExtractPlugin({
      filename: "static/css/style.css",
      chunkFilename: "[id].css"
    }),
    new webpack.DefinePlugin({
      __isBrowser__: "true"
    })
  ]
}

var serverConfig = {
  mode: 'development',
  entry: path.resolve(__dirname, '../src/server/index.js'),
  target: 'node',
  externals: [nodeExternals()],
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'server/index.js',
    //publicPath: '/'
  },
  module: {
    rules: [
      { 
        test: /\.(jsx|js)$/, 
        use: 'babel-loader' 
      },
      {
        test: /\.css$/,
        use:
        [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          "css-loader"
        ]
      },
      {
        test: /\.(svg|png|jpg)$/, 
        loader: 'url-loader'
      }
    ]
  },

  resolve: {
    extensions: ['.js', '.jsx', '.css'], //*
    alias: {
        //"react": "preact-compat",
        //"react-dom": "preact-compat",
        // Not necessary unless you consume a module using `createClass`
        //"create-react-class": "preact-compat/lib/create-react-class",
        // Not necessary unless you consume a module requiring `react-dom-factories`
        //'react-dom-factories': 'preact-compat/lib/react-dom-factories'

        '@hooks': path.resolve(__dirname, '../src/common/hooks'),
        '@views': path.resolve(__dirname, '../src/common/views'),
        '@layouts': path.resolve(__dirname, '../src/common/layouts'),
        //'@providers': path.resolve(__dirname, '../src/common/providers'),
        '@components': path.resolve(__dirname, '../src/common/components'),

        '@lib': path.resolve(__dirname, '../src/common/lib'),
        '@utils': path.resolve(__dirname, '../src/common/utils'),
        '@assets': path.resolve(__dirname, '../src/common/assets'),
    }
  },
  plugins: [


    new webpack.DefinePlugin({
      'process.env.BASE_URL': JSON.stringify('https://api.spaceXdata.com/v3'),
      'process.env.NODE_ENV': JSON.stringify('development'),
      'process.env.DEBUG': JSON.stringify(false),
      //'PUBLIC_URL': JSON.stringify('localhost:800'),
      __isBrowser__: JSON.stringify(false)
    }),

    new MiniCssExtractPlugin({
      filename: "static/css/style.css",
      chunkFilename: "[id].css"
    }),
  ]
}

module.exports = [browserConfig, serverConfig]