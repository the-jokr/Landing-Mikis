import autoprefixer from "autoprefixer"

import CleanWebpackPlugin from "clean-webpack-plugin"
import HtmlWebpackPlugin from "html-webpack-plugin"
import MiniCssExtractPlugin from "mini-css-extract-plugin"

const isProduction = process.env.NODE_ENV === "production"

const pages = {
    home: { isIndex: true },
    about: {}
}

const getEntryPoints = () => {
    const keys = Object.keys(pages)
    const obj = {}

    keys.forEach(pageName => {
        obj[pageName] = `./src/pages/${pageName}.js`
    })
    return obj
}

const getHTMLWebpackPlugins = props =>
    Object.keys(pages).map(
        pageName =>
            new HtmlWebpackPlugin({
                inject: true,
                chunks: [pageName],
                filename: `${
                    pages[pageName].isIndex ? "index" : pageName
                }.html`,
                template: `src/html/${pageName}.pug`,
                templateParameters: { pageName, ...props }
            })
    )

export default {
    mode: isProduction ? "production" : "development",
    entry: getEntryPoints(),
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
        ...getHTMLWebpackPlugins(),
        new MiniCssExtractPlugin({
            filename: "[name].[hash].css"
        })
    ]
}
