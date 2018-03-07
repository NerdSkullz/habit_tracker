const webpack = require('webpack');
const autoprefixer = require('autoprefixer');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');

const isDevelopment = process.env.NODE_ENV === 'development'
const isProduction = process.env.NODE_ENV === 'production'

module.exports = {
  entry: {
    app: './assets/javascripts/app.js.erb'
  },
  output: {
    filename: '[name]-[chunkhash].js',
    chunkFilename: '[name]-[chunkhash].chunk.js',
    path: __dirname + '/tmp/dist',
    hashDigestLength: 32
  },
  module: {
    rules: [
      {
        test: /\.erb$/,
        enforce: 'pre',
        exclude: /node_modules/,
        loader: 'rails-erb-loader',
        options: {
          runner: 'ruby'
        }
      },
      {
        test: /\.(ts|tsx)$/,
        loader: 'ts-loader'
      },
      {
        test: /\.(scss|sass|css)$/,
        use: ExtractTextPlugin.extract({
          use: [
            { loader: 'css-loader',
              options: {
                sourceMap: true,
                minimize: isProduction
              }
            },
            { loader: 'postcss-loader',
              options: {
                sourceMap: true,
                plugins: [ autoprefixer ]
              }
            },
            { loader: 'resolve-url-loader' },
            { loader: 'sass-loader',
              options: {
                sourceMap: true,
                includePaths: ['node_modules']
              }
            }
          ]
        })
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        use: [
          { loader: 'file-loader',
            options: {
              name: 'fonts/[path][name]-[hash].[ext]',
              context: 'assets/fonts/'
            }
          }
        ]
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          { loader: 'file-loader',
            options: {
              name: 'images/[path][name]-[hash].[ext]',
              context: 'assets/images/'
            }
          },
          { loader: 'image-webpack-loader',
            options: {
              bypassOnDebug: true,
            },
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.EnvironmentPlugin(JSON.parse(JSON.stringify(process.env))),
    new ExtractTextPlugin({ filename: '[name]-[contenthash].css' }),
    new ManifestPlugin({
      writeToFileEmit: true
    }),
  ]
};

// Development specific configuration
if (isDevelopment) {
  module.exports.devtool = 'cheap-eval-source-map';
}

// Production specific configuration
if (isProduction) {
  module.exports.plugins.push(
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true
    })
  );
  module.exports.devtool = 'nosources-source-map';
}
