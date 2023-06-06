const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');

const conf = {
   entry: './src/js/app/index.js',
   output: {
        path: path.resolve(__dirname, 'dist'),
        filename : 'main.js',
        publicPath: 'dist/'
   },
   devServer: {
        contentBase: path.join(__dirname, "dist"),
        overlay: true
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
            },
            {
                test: /\.js$/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                // images / icons
                test: /\.(png|jpg|gif|svg)$/,
                loader: "file-loader",
                options: {
                  name: "[name].[ext]"
                }
            },
            {
                test: /\.scss$/,
                // use: ExtractTextPlugin.extract({
                    use: [
                        'vue-style-loader',
                        'css-loader',
                        'sass-loader',
                    ]
                  // fallback: 'style-loader',
                  // use: ['vue-style-loader', 'css-loader', 'sass-loader']
                // })
              },
            {
                test: /\.css$/,
                use: [
                    'vue-style-loader',
                    'css-loader'
                ]
            },
              {
                  // Fonts
                  test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                  loader: 'file-loader',
                  options: {
                    name: '[name].[ext]'
                  }
                }
        ]
    },
    plugins: [
        new ExtractTextPlugin("styles.css"),
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new CopyWebpackPlugin({
            patterns: [
              { from: 'src/img', to: 'img' },
              { from: 'src/fonts', to: 'fonts' },
            ],
          })
    ]
}
 
module.exports = conf;