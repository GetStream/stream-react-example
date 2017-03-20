var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var InlineEnviromentVariablesPlugin = require('inline-environment-variables-webpack-plugin');

var path = require('path');

var env = new webpack.DefinePlugin({
		'process.env': JSON.stringify(process.env),
})

var plugins = [
		new ExtractTextPlugin({
				filename: './public/css/styles.css',
				allChunks: true
		}),
		new InlineEnviromentVariablesPlugin([
				'NODE_ENV',
				'JWT_SECRET',
				'DB_USERNAME',
				'DB_HOST',
				'DB_PASSWORD',
				'DB_PORT',
				'MAPBOX_ACCESS_TOKEN',
				'S3_KEY',
				'S3_SECRET',
				'S3_BUCKET',
				'STREAM_APP_ID',
				'STREAM_KEY',
				'STREAM_SECRET',
				'ALGOLIA_APP_ID',
				'ALGOLIA_SEARCH_ONLY_KEY',
				'ALGOLIA_API_KEY',
				'KEEN_PROJECT_ID',
				'KEEN_WRITE_KEY',
				'KEEN_READ_KEY',
				'IMGIX_BASE_URL',
				'API_URL'
		]),
]

if (process.env.NODE_ENV == 'production') {
		plugins = [
				new ExtractTextPlugin({
						filename:'./public/css/styles.min.css',
						allChunks: true
				}),
				new webpack.optimize.UglifyJsPlugin({
						compressor: { warnings: false }
				}),
				new InlineEnviromentVariablesPlugin([
						'NODE_ENV',
						'JWT_SECRET',
						'DB_USERNAME',
						'DB_HOST',
						'DB_PASSWORD',
						'DB_PORT',
						'MAPBOX_ACCESS_TOKEN',
						'S3_KEY',
						'S3_SECRET',
						'S3_BUCKET',
						'STREAM_APP_ID',
						'STREAM_KEY',
						'STREAM_SECRET',
						'ALGOLIA_APP_ID',
						'ALGOLIA_SEARCH_ONLY_KEY',
						'ALGOLIA_API_KEY',
						'KEEN_PROJECT_ID',
						'KEEN_WRITE_KEY',
						'KEEN_READ_KEY',
						'IMGIX_BASE_URL',
						'API_URL'
				]),
		];
}

module.exports = {
		entry: {
				app: [
						'./modules/main.js'
				]
		},
		output: {
				filename: './public/js/[name].js',
		},
		module: {
				loaders: [
						{
								test: /\.jsx?$/,
								loaders: ['jsx-loader', 'babel-loader'],
								exclude: /node_modules/,
						},
						{
								test: /\.s?css$/,
								loader: ExtractTextPlugin.extract('css-loader!sass-loader'),
						}
				]
		},
		resolve: {
				modules: [path.resolve(__dirname), "node_modules"],
				alias: {
						components: 'modules/components',
						actions: 'modules/actions',
						reducers: 'modules/reducers',
						utils: 'modules/utils'
				},
				extensions: ['.js', '.jsx']
		},
		plugins: plugins,
}
