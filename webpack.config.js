const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TSCheckerPlugin = require("fork-ts-checker-webpack-plugin");

const buildPath = path.resolve(__dirname, "build");
const srcPath = path.resolve(__dirname, "src");

const isProd = process.env.NODE_ENV === "production";

const getSettingsForStyles = (withModules = false) => {
    return [
        isProd ? MiniCssExtractPlugin.loader : "style-loader",
        !withModules ? "css-loader" : {
            loader: 'css-loader',
            options: {
                modules: {
                    localIdentName: !isProd ? '[path][name]__[local]' : '[hash:base64]'
                }
            }
        },
        "postcss-loader",
        "sass-loader"
    ]
};

module.exports = {
    entry: path.join(srcPath, "index.tsx"),
    target: !isProd ? "web" : "browserslist",
    devtool: isProd ? 'hidden-source-map' : 'eval-source-map',
    output: {
        path: buildPath,
        filename: "bundle.js"
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(srcPath, "index.html")
        }),
        !isProd && new ReactRefreshWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: "[name]-[hash].css"
        }),
        new TSCheckerPlugin()
    ].filter(Boolean),
    module: {
        rules: [
            {
                test: /\.module\.s?css$/,
                use: getSettingsForStyles(true)
            },
            {
                test: /\.s?css$/,
                exclude: /\.module\.s?css$/,
                use: getSettingsForStyles()
            },
            {
                test: /\.[tj]sx?$/,
                exclude: /node_modules/,
                use: "babel-loader"
            },
            {
                test: /\.(png|jpg)$/,
                type: "asset",
                parser: {
                    dataUrlCondition: {
                        maxSize: 10 * 1024
                    }
                }
            },
            {
                test: /\.svg$/,
                type: "asset/resource"
            }
        ]
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".jsx"],
        alias: {
            components: path.join(srcPath, "components"),
            config: path.join(srcPath, "config"),
            pages: path.join(srcPath, "pages"),
            store: path.join(srcPath, "store"),
            utils: path.join(srcPath, "utils"),
            styles: path.join(srcPath, "styles"),
            img: path.join(srcPath, "assets/img"),
            svg: path.join(srcPath, "assets/svg"),
            font: path.join(srcPath, "styles/Avenir")
        }
    },
    devServer: {
        host: "127.0.0.1",
        port: 9000,
        hot: true,
        historyApiFallback: true
    }
}