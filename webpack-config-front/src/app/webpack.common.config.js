/*
 * Copyright 2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
 *
 * This file is part of SCO - Space Climate Observatory.
 *
 * SCO is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * SCO is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with SCO. If not, see <http://www.gnu.org/licenses/>.
 *
 * This file is a work derived from Regards OSS
 *
 * Copyright 2017 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
 *
 * This file is part of REGARDS.
 *
 * REGARDS is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * REGARDS is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with REGARDS. If not, see <http://www.gnu.org/licenses/>.
 **/
const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const WebpackAutoInject = require('webpack-auto-inject-version')


module.exports = function (projectContextPath, mode = 'dev') {
  return {
    // Hide stats information from children during webpack compilation
    stats: { children: false },
    // Webpack working directory
    context: projectContextPath,
    // Javascript main entry
    entry: './src/main.jsx',
    node: {
      net: 'empty',
      tls: 'empty',
      dns: 'empty',
    },
    resolve: {
      // Automaticaly get extensions files from javascript code with import or require.
      // exemple require('main') look for main, main.js or main.jsx with our configuration
      extensions: ['.js', '.jsx'],
      modules: [
        // Root directories from which requires are made
        path.join(projectContextPath),
        // Add the current folder (for webpack loaders)
        __dirname,
        'web_modules',
        'node_modules',
      ],
    },
    module: {
      rules: [
        // Transpile ES6 Javascript into ES5 with babel loader
        {
          test: /\.jsx?$/,
          exclude: [
            /node_modules/,
            /dist/,
            // These files are included, not transpiled
            /\/Mizar\//,
            /\/rconfig.js$/,
            /\/node_modules\/requirejs\//,
            /\/node_modules\/path\//,
            /\/node_modules\/underscore\//,
            /\/node_modules\/jquery\//,
            /\/node_modules\/jquery-ui-dist\//,
            /\/node_modules\/string\//,
            /\/node_modules\/file-saver\//,
            /\/node_modules\/jszip\//,
            /\/node_modules\/xmltojson\//,
          ],
          use: [
            'thread-loader',
            // used to cache the results of the loader.
            // Next builds will attempt to read from the cache
            // the cache is different depending of the value of NODE_ENV
            'babel-loader?cacheDirectory',
          ],
        },
        {
          test: /\/Mizar\//,
          loader: 'file-loader',
          options: {
            regExp: /\/Mizar\/(.+)$/,
            name: '[1]',
            outputPath: 'mizar/',
          },
        },
        {
          test: [
            /\/node_modules\/requirejs\//,
            /\/node_modules\/path\//,
            /\/node_modules\/underscore\//,
            /\/node_modules\/jquery\//,
            /\/node_modules\/jquery-ui-dist\//,
            /\/node_modules\/string\//,
            /\/node_modules\/file-saver\//,
            /\/node_modules\/jszip\//,
            /\/node_modules\/xmltojson\//,
            /\/node_modules\/wms-capabilities\//,
            /\/node_modules\/moment\//,
          ],
          loader: 'file-loader',
          options: {
            regExp: /\/node_modules\/(.+)$/,
            name: '[1]',
            outputPath: 'mizar/node_modules/',
          },
        },
        {
          test: /\/rconfig.js$/,
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'mizar/src/',
          },
        },
        {
          test: /\.css$/,
          loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader' }),
        },
        {
          test: /\.(jpg|gif|png)$/,
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'img/',
          },
        },
        {
          test: /\.(ico)$/,
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: '',
          },
        },
        {
          test: /\.(svg|ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          exclude: /default-icon.svg/,
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'img/',
          },
        },
        {
          test: /\.html/,
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'html/',
          },
        },
      ],
    },
    plugins: [
      new WebpackAutoInject({
        SHORT: 'CUSTOM',
        SILENT: true,
        PACKAGE_JSON_PATH: './package.json',
        components: {
          AutoIncreaseVersion: false,
          InjectAsComment: false,
          InjectByTag: true,
        },
        componentsOptions: {
          InjectByTag: {
            dateFormat: 'yyyy/mm/d HH:MM:ss',
          },
        },
      }),
      // Safely ignore vertx errors
      // See https://github.com/plotly/plotly-webpack
      new webpack.IgnorePlugin(/vertx/),
      new webpack.optimize.OccurrenceOrderPlugin(),
      // Generate the index.html automatically
      new HtmlWebpackPlugin({
        template: 'index.ejs',
        hash: true,
        isProduction: mode === 'prod',
      }),
      // Allow to define React as a global variable for JSX.
      new webpack.ProvidePlugin({
        React: 'react',
        PropTypes: 'prop-types',
      }),
      // Create a single css file for the whole application instead of setting css inline in the javascript
      new ExtractTextPlugin({ filename: 'css/styles.css', disable: false, allChunks: true }),
    ],
  }
}
