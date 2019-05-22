import autoprefixer from "autoprefixer"

import CleanWebpackPlugin from "clean-webpack-plugin"
import HtmlWebpackPlugin from "html-webpack-plugin"
import MiniCssExtractPlugin from "mini-css-extract-plugin"

const isProduction = process.env.NODE_ENV === "production"

export default {
    mode: isProduction ? "production" : "development",
    entry: {
        home: "./src/home.js",
        about: "./src/about.js"
    },
    output: {
        filename: "[name].[hash].js",
        path: __dirname + "/dist"
    },
    devtool: isProduction ? false : "eval-source-map",
    devServer: {
        contentBase: __dirname + "/dist",
        compress: true,
        port: 4200,
        open: true
    },
    module: {
        rules: [
            {
                test: /\.pug$/,
                loader: "pug-loader"
            },
            {
                test: /\.scss$/,
                use: [
                    isProduction ? MiniCssExtractPlugin.loader : "style-loader",
                    "css-loader",
                    {
                        loader: "postcss-loader",
                        options: {
                            ident: "postcss",
                            plugins: [autoprefixer({})]
                        }
                    },
                    {
                        loader: "sass-loader",
                        options: {}
                    }
                ]
            },
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: "babel-loader"
            },
            {
                test: /\.(jpe?g|png|gif)$/,
                loader: "url-loader",
                options: {
                    limit: 5 * 1024,
                    outputPath: "assets/images"
                }
            },
            {
                test: /\.svg$/,
                loader: "svg-url-loader",
                options: {
                    limit: 5 * 1024,
                    noquotes: true,
                    outputPath: "assets/images"
                }
            },
            {
                test: /\.(jpg|png|gif|svg)$/,
                loader: "image-webpack-loader",
                enforce: "pre",
                options: {
                    disable: isProduction
                }
            },
            {
                test: /\.(woff(2)?|ttf|eot|otf)(\?v=\d+\.\d+\.\d+)?$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: "[name].[hash].[ext]",
                            outputPath: "assets/fonts/"
                        }
                    }
                ]
            },
            {
                test: /\.(webm|mp4)$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: "[name].[hash].[ext]",
                            outputPath: "assets/video/"
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            inject: true,
            chunks: ["home"],
            filename: "index.html",
            template: "src/pages/index.pug",
            templateParameters: { title: "Home" }
        }),
        new HtmlWebpackPlugin({
            inject: true,
            chunks: ["about"],
            filename: "about.html",
            template: "src/pages/about.pug",
            templateParameters: { title: "About" }
        }),
        new MiniCssExtractPlugin({
            filename: "[name].[hash].css"
        })
    ]
}
