const path = require("path");
const fs = require("fs");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = env => {
    const isProd = process.env.production;

    return {
        entry: path.resolve(__dirname, "src/index.ts"),
        context: path.resolve(__dirname, "src"),
        mode: isProd ? "production" : "development",
        devtool: "inline-source-map",
        output: {
            path: path.resolve(__dirname, "dist"),
            filename: "bundle.js"
        },
        module: {
            rules: [
                {
                    test: /\.scss/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        'css-loader',
                        'sass-loader',
                    ]
                },
                {
                    test: /\.js/,
                    exclude: /(node_modules|bower_components)/,
                    use: {
                        loader: "babel-loader",
                        options: {
                            presets: ["@babel/preset-env"]
                        }
                    }
                },
                {
                    test: /\.(ts|tsx)?$/,
                    exclude: /(node_modules|bower_components)/,
                    use: "ts-loader"
                },
                {
                    test: /\.(json|png)$/,
                    use: [
                        "file-loader"
                    ]
                }
            ]
        },
        resolve: {
            extensions: [".ts", ".js", ".json"]
        },
        plugins: [
            new MiniCssExtractPlugin({
                filename: "main.css",
            }),
            new HtmlWebpackPlugin({
                template: "index.html",
                filename: "index.html"
            })
        ],
        devServer: {
            host: "0.0.0.0",
            contentBase: path.resolve(__dirname, "dist"),
            compress: true,
            port: 8154,
            watchContentBase: true
        }
    }
}