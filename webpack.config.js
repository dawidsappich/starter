const path = require('path');
const webpack = require('webpack');
const typescript = require('typescript');

const rules = [
	{
		test: /\.ts$/,
		use: [
			'awesome-typescript-loader'/*, 'angular-router-loader', 'angular2-template-loader'*/
		]
	},
	{
		test: /\.(jpe?g|png|gif|svg)$/i,
		use: 'file-loader'
	},
	{
		test: /\.html$/,
		use: 'html-loader'
	}
]

module.exports = {
	// base absolute path for resolving entry points
	context: __dirname,
	// source mapping style
	devtool: 'inline-source-map',
	// webpack dev server
	devServer: {
		// server static files
		contentBase: __dirname,
		// enable HMR
		hot: true,
		// open browser
		open: true,
		port: 8080,
		// bundled files will be available under this path
		// e.g. http://localhost:8080/build/app.bundle.js
		publicPath: '/build/',
		// logging info
		stats: {
			chunks: false,
			chunkModules: false,
			chunkOrigins: false,
			errors: true,
			errorDetails: false,
			hash: false,
			timings: false,
			modules: false,
			warnings: false
		}
	},
	// each key is the name of the chunk, the value is entry point fot the chunk
	entry: {
		app: './src/main.ts'
	},
	// how to handle different types of modules
	module: {
		rules
	},
	output: {
		// name of each out bundle
		filename: '[name].bundle.js',
		// name for non entry chunks
		chunkFilename: '[name].chunk.js',
		// absolute output path
		path: path.resolve(__dirname, 'build'),
		publicPath: '/build/' //server-relative
	},
	plugins: [
		// display relative path of module when HMR is enabled
		new webpack.NamedModulesPlugin(),
		// enable HMR
		new webpack.HotModuleReplacementPlugin(),
		// define process.env.NODE_ENV, plugins maybe use it
		new webpack.DefinePlugin({
			'process.env': {
				'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
			}
		}),
		// create a chunk
		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendor',
			// all files from node_modules in a seperate chunk
			minChunks: (module) => module.context && /node_modules/.test(module.context)
		})
	],
	resolve: {
		// resolve files without extension to this extensions
		extensions: ['.ts', '.js'],
		// search this locations to resolve
		modules: [
			'src',
			'node_modules'
		]
	}
}