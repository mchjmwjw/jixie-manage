var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
<<<<<<< HEAD
=======
const VueLoaderPlugin = require('vue-loader/lib/plugin');
>>>>>>> ede87e08bd6df38ae3b661adfb7bad911964ec96
//var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: './src/main.js',
	output: {
		path: path.resolve(__dirname, './dist'),
		publicPath: '/dist/',
		filename: 'build.js'
	},

	module: {
<<<<<<< HEAD
		loaders: [
=======
		rules: [
>>>>>>> ede87e08bd6df38ae3b661adfb7bad911964ec96
			{
				test: /\.vue$/,
				loader: 'vue-loader',
				options: {
					// loaders: {
					//   css: ExtractTextPlugin.extract({fallback: 'style-loader', loader: 'css-loader'})
					// }
					cssModules: {
						localIdentName: '[path][name]---[local]---[hash:base64:5]',
						camelCase: true
					}
				}   
			},
			{
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: /node_modules/
			},
			{
				test: /\.css$/,
				loader: 'style-loader!css-loader'
			},
			{
				test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
				loader: 'file-loader'
			},
			{
				test: /\.(png|jpe?g|gif|svg)(\?\S*)?$/,
				loader: 'file-loader',
				query: {
					name: '[name].[ext]?[hash]'
				}
			}
		]
	},

	plugins: [
<<<<<<< HEAD
		new ExtractTextPlugin('[name]-[hash].css') // 分离js和css		
=======
		new ExtractTextPlugin('[name]-[hash].css'), // 分离js和css	
		new VueLoaderPlugin()	
>>>>>>> ede87e08bd6df38ae3b661adfb7bad911964ec96
	],

	devServer: {
		historyApiFallback: true,
		noInfo: true,
		host: '127.0.0.1'
	},
<<<<<<< HEAD
	devtool: 'source-map'  // '#eval-source-map'
=======
	devtool: '#eval-source-map'
>>>>>>> ede87e08bd6df38ae3b661adfb7bad911964ec96
};

if (process.env.NODE_ENV === 'production') {
	module.exports.devtool = '#source-map';
	// http://vue-loader.vuejs.org/en/workflow/production.html
	module.exports.plugins = (module.exports.plugins || []).concat([
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: '"production"'
			}
		}),
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false
			}
		})
	]);
}