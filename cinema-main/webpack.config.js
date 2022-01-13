const path = require("path");
const webpack = require("webpack");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const Dotenv = require("dotenv-webpack");
require("babel-polyfill");

module.exports = {
	devtool: "inline-source-map",
	devServer: {
		contentBase: path.join(__dirname, "./"),
		compress: true,
		port: process.env.WEBPACK_DEV_SERVER_PORT || 3005,
		disableHostCheck: true,
		historyApiFallback: true,
		hot: true,
	},
	entry: ["babel-polyfill", path.join(__dirname, "./src/")],
	output: {
		path: path.join(__dirname, "./build"),
		filename: "main.js",
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				resolve: {
					extensions: [".js", ".jsx"],
				},
				use: {
					loader: "babel-loader",
					options: {
						plugins: ["@babel/plugin-syntax-top-level-await"],
					},
				},
			},
			{
				test: /\.s[ac]ss$/,
				use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
			},
			{
				test: /\.(png|jpg|gif|svg)$/,
				use: "file-loader",
			},
			{
				test: /\.(eot|ttf|woff|woff2)$/,
				loader: "file-loader",
			},
		],
	},
	plugins: [
		new CopyWebpackPlugin({
			patterns: [{from: "./node_modules/@tonclient/lib-web/tonclient.wasm"}],
		}),
		new MiniCssExtractPlugin({
			filename: "style.css",
		}),
		new HtmlWebpackPlugin({
			inject: false,
			hash: true,
			template: "./index.html",
			filename: "index.html",
			favicon: "./favicon.ico",
		}),
		new webpack.LoaderOptionsPlugin({
			minimize: false,
			debug: true,
		}),
		new webpack.HotModuleReplacementPlugin(),
		new ReactRefreshWebpackPlugin({
			overlay: false,
		}),
		new Dotenv({
			defaults: true,
		}),
	],
};
