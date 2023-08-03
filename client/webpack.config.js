const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      // Plugin for generating html file
      new HtmlWebpackPlugin({
        template: './index.html',
        title: 'JATE Text Editor',
      }),
      // Plugin for injecting service worker
      new InjectManifest({
        swSrc: './src-sw.js',
        swDest: 'src-sw.js',
      }),
      // Generates the manifest for the app
      new WebpackPwaManifest({
        fingerprints: false,
        inject: true,
        name: 'JATE Text Editor',
        short_name: 'Text Editor',
        description: 'Just another text editor',
        background_color: '#00CBF9',
        theme_color: '#00CBF9',
        start_url: './',
        publicPath: './',
        icons: [
          {
            // Icon and sizing
            src: path.resolve('src/images/logo.png'),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join('assets', 'icons'),
          },
        ],
      }),
    ],

    module: {
      rules: [
        {
          // Style and css loader rules
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        {
          // Babel-loader rules
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/transform-runtime'],
            },
          },
        },
      ],
    },
  };
};
