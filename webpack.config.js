const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const host = "localhost";

module.exports = function(env, argv) {
	const mode = argv.mode || "development";
	return {
		mode: mode,
		entry: "./src/main.js",
		output: {
			filename: "main.js",
			path: path.resolve(__dirname, "docs"),
		},
		module: {
			rules: [{
				test: /img\/.*\.(jpe?g|gif|png|svg|woff|ttf|wav|mp3)$/,
				exclude: /node_modules/,
				use: [{
					loader: 'file-loader',
					options: {
						name: '[name].[ext]',
						outputPath: 'img/'
					},
				}]
			}, {
				test: /\.jsx?$/,
				loader: "babel-loader",
				exclude: /node_modules/,
			}, {
				test: /\.css$/,
				use: [
					'style-loader',
					'css-loader'
				]
			}, {
				test: /\.(s[ac]ss)$/,
				use: [{
					loader: 'style-loader'
				}, {
					loader: 'css-loader'
				}, {
					loader: 'postcss-loader',
				}, {
					loader: 'resolve-url-loader'
				}, {
					loader: 'sass-loader',
					options: {
						sourceMap: true,
					},
				}]
			}],
		},
		resolve: {
			extensions: [".js", ".jsx"],
		},
		devServer: {
			compress: true,
			hot: true,
			host,
			port: 3000
		},
		plugins: [
			new HtmlWebpackPlugin({
				inject: true,
				template: path.resolve(__dirname, "public/index.html"),
			}),
		],
	};
};