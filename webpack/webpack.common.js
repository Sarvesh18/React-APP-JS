const path = require('path');
const webpack = require('webpack');


const ManifestPlugin = require('webpack-manifest-plugin');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const CompressionPlugin = require('compression-webpack-plugin');
//const MediaQuerySplittingPlugin = require('media-query-splitting-plugin');

const nodeExternals = require('webpack-node-externals');

module.exports = [
    //Client
    {
        target: 'web',
        entry: {
            app: path.resolve(__dirname, '../src/client/index.js')
        },
        output: {
            path: path.resolve(__dirname, '../dist'),
            filename: 'static/js/[name].[hash].bundle.js',
            //chunkFilename: 'static/js/[id].[contenthash:8].chunk.js'
            //publicPath: '/'
        },
        plugins: [

            new webpack.HotModuleReplacementPlugin(),
            
            //Delete Dist Folder
            new CleanWebpackPlugin(),

            new ManifestPlugin(),

            new CopyPlugin({
                patterns: [
                    { from: path.resolve(__dirname, '../public', 'robots.txt'), to: path.resolve(__dirname, '../dist') },    
                    { from: path.resolve(__dirname, '../public', 'favicon.ico'), to: path.resolve(__dirname, '../dist') },
                ]
            }),
            
            new CompressionPlugin({
                test: /\.(js|css|html)$/,
                algorithm: 'gzip',
                filename: '[path].gz[query]'
                //compressionOptions: { level: 9 },
                //cache: true,
            }),

            new HtmlWebpackPlugin({
                //title: 'Test App',
                filename: 'index.html',
                template: './public/index.html',
            }),
            new MiniCssExtractPlugin({
                filename: 'static/css/[name].[contenthash:8].css',
                //chunkFilename: 'static/css/[id].[contenthash:8].chunk.css',
            }),

            /*
            new webpack.ProvidePlugin({
                Promise: 'es6-promise-promise',
                'React': 'react'
            }),
            */
            /*
            new MediaQuerySplittingPlugin({
                media: {
                    mobileEnd: 568,
                    tabletPortraitEnd: 768,
                    tabletLandscapeEnd: 1024,
                },
                splitTablet: true,
                //minify: true,
                //units: 'px',
            }),
    */



            new webpack.DefinePlugin({
                'process.env.BASE_URL': JSON.stringify('https://api.spaceXdata.com/v3'),
                'process.env.NODE_ENV': JSON.stringify('development'),
                'process.env.DEBUG': JSON.stringify(false),
                //'PUBLIC_URL': JSON.stringify('localhost:800'),
                __isBrowser__: JSON.stringify(true)
            }),
            /*
            new webpack.EnvironmentPlugin({
                NODE_ENV: 'development',
                DEBUG: false
            }),
            new Dotenv({
                path: './.env',
                safe: true
            })*/
        ],
        module: {
            rules: [
                {
                    test: /\.html$/,
                    use: [
                        {
                            loader: 'html-loader',
                            options: {
                                minimize: true
                            }
                        }
                    ]
                },
                {
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    loader: 'babel-loader',
                    //options: {
                    //    presets: [],
                    //    plugins: []
                    //}
                },
                {
                    test: /\.css$/,
                    use: [
                        MiniCssExtractPlugin.loader, 
                        'css-loader',
                        //'postcss-loader'
                    ]
                    //style-loader,
                    //css-loader,
                    //less-loader,
                    //sass-loader,
                    //postcss-loader,
                    //stylus-loader
                },

                /*
                {
                    test: /\.scss$/,
                    use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    {
                        loader: 'css-loader',
                    },
                    {
                        loader: 'postcss-loader',
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                        includePaths: ['./src']
                        }
                    }
                    ]
                },
                */
                {
                    test: /\.(woff|woff2)/i, //jpe?g
                    use: [
                        {
                            //url-loader
                            loader: 'file-loader', // convert to base 64 if image less than specified limit
                            options: {
                                name: 'static/fonts/[name][hash].[ext]',
                                limit: 20000
                            }
                        }
                    ] 
                }, 
                {
                    test: /\.(svg|png|jpe?g)/i, //bmp gif
                    use: [ 
                        {
                            loader: 'url-loader', // convert to base 64 if image less than specified limit
                            options: {
                                name: 'static/images/[name].[hash:8].[ext]',
                                limit: 10000
                            }
                        },
                        {
                            loader: 'img-loader'
                        }
                    ]
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
        }
    },

    //Server
    { 
        target: 'node',
        //externals: [nodeExternals()],
        entry: {
            app: path.resolve(__dirname, '../src/server/index.js')
        },
        output: {
            path: path.resolve(__dirname, '../dist'),
            filename: 'server.js',//'static/js/[name].[hash].bundle.js',
            //chunkFilename: 'static/js/[id].[contenthash:8].chunk.js'
            //publicPath: '/'
        },
        plugins: [

            /*
            new webpack.HotModuleReplacementPlugin(),
            //Delete Dist Folder
            new CleanWebpackPlugin(),

            new ManifestPlugin(),

            new CopyPlugin({
                patterns: [
                    { from: path.resolve(__dirname, '../public', 'robots.txt'), to: path.resolve(__dirname, '../dist') },    
                    { from: path.resolve(__dirname, '../public', 'favicon.ico'), to: path.resolve(__dirname, '../dist') },
                ]
            }),
            
            new CompressionPlugin({
                test: /\.(js|css|html)$/,
                algorithm: 'gzip',
                filename: '[path].gz[query]'
                //compressionOptions: { level: 9 },
                //cache: true,
            }),

            new HtmlWebpackPlugin({
                //title: 'Test App',
                filename: 'index.html',
                template: './public/index.html',
            }),
            */
            //new MiniCssExtractPlugin({
            //    filename: 'static/css/[name].[contenthash:8].css',
                //chunkFilename: 'static/css/[id].[contenthash:8].chunk.css',
            //}),

            /*
            new webpack.ProvidePlugin({
                Promise: 'es6-promise-promise',
                'React': 'react'
            }),
            */
            /*
            new MediaQuerySplittingPlugin({
                media: {
                    mobileEnd: 568,
                    tabletPortraitEnd: 768,
                    tabletLandscapeEnd: 1024,
                },
                splitTablet: true,
                //minify: true,
                //units: 'px',
            }),
    */



            //new webpack.DefinePlugin({
            //    'process.env.BASE_URL': JSON.stringify('https://api.spaceXdata.com/v3'),
            //    'process.env.NODE_ENV': JSON.stringify('development'),
            //    'process.env.DEBUG': JSON.stringify(false),
            //    //'PUBLIC_URL': JSON.stringify('localhost:800'),
            //    __isBrowser__: JSON.stringify(false)
            //}),
            /*
            new webpack.EnvironmentPlugin({
                NODE_ENV: 'development',
                DEBUG: false
            }),
            new Dotenv({
                path: './.env',
                safe: true
            })*/
        ],
        /*module: {
            rules: [
                {
                    test: /\.html$/,
                    use: [
                        {
                            loader: 'html-loader',
                            options: {
                                minimize: true
                            }
                        }
                    ]
                },
                {
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    loader: 'babel-loader',
                    //options: {
                    //    presets: [],
                    //    plugins: []
                    //}
                },
                {
                    test: /\.css$/,
                    use: [
                        MiniCssExtractPlugin.loader, 
                        'css-loader',
                        //'postcss-loader'
                    ]
                    //style-loader,
                    //css-loader,
                    //less-loader,
                    //sass-loader,
                    //postcss-loader,
                    //stylus-loader
                },
                
                //{
                //    test: /\.scss$/,
                //    use: [
                //    {
                //        loader: MiniCssExtractPlugin.loader,
                //    },
                //    {
                //        loader: 'css-loader',
                //    },
                //    {
                //        loader: 'postcss-loader',
                //    },
                //    {
                //        loader: 'sass-loader',
                //        options: {
                //        includePaths: ['./src']
                //        }
                //    }
                //    ]
                //},
                {
                    test: /\.(woff|woff2)/i, //jpe?g
                    use: [
                        {
                            //url-loader
                            loader: 'file-loader', // convert to base 64 if image less than specified limit
                            options: {
                                name: 'static/fonts/[name][hash].[ext]',
                                limit: 20000
                            }
                        }
                    ] 
                }, 
                {
                    test: /\.(svg|png|jpe?g)/i, //bmp gif
                    use: [ 
                        {
                            loader: 'url-loader', // convert to base 64 if image less than specified limit
                            options: {
                                name: 'static/images/[name].[hash:8].[ext]',
                                limit: 10000
                            }
                        },
                        {
                            loader: 'img-loader'
                        }
                    ]
                }
            ]
        },*/
        /*resolve: {
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
        }*/
    }
]
//url-loader //file-loader
