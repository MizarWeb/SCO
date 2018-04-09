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

// Webpack configuration file
const getCommonConfig = require('./webpack.common.config')
const webpack = require('webpack')
const merge = require('webpack-merge')
const path = require('path')
const StatsPlugin = require('stats-webpack-plugin')

module.exports = function (projectContextPath) {
  let config = getCommonConfig(projectContextPath, 'prod')

  // Ensure babel environment variable is correctly setup to production
  process.env.BABEL_ENV = 'production'

  config = merge(config, {
    output: {
      // Webpack compilation directory
      path: `${projectContextPath}/dist/prod`,
      // Webpack main bundle file name
      filename: 'bundle.js',
      // Webpack chunks files namesc
      chunkFilename: '[id]-[chunkhash].chunck.js',
      publicPath: '/sco/',
    },
    module: {
      noParse: [
        /node_modules\/sinon/,
        /node_modules\/nock/,
      ],
    },
    devServer: {
      stats: {
        assets: false,
        chunks: false,
        children: false,
        colors: true,
        hash: false,
        modules: false,
        source: false,
      },
      // Web directory serve by the webpack dev server
      contentBase: path.resolve(projectContextPath, 'dist', 'prod'), // ??? Without this there is no hot replacement during developpment
      inline: true, // Shows a full-screen overlay in the browser when there are compiler errors or warning
      overlay: {
        warnings: true,
        errors: true,
      },
      port: 3333,
      host: '0.0.0.0', // Enable rewrite urls for navigation routes generated by the router.
      // Necessary to fallback to root directory when attempt to load
      // webpack generated javascripts.
      historyApiFallback: {
        // Rewrite to get bundle.js
        rewrites: [{
          from: /\/bundle\.js(\.map)?/,
          to(context) {
            return context.match[0]
          },
        }],
      },
    },
    devtool: 'cheap-module-source-map',
    plugins: [
      new StatsPlugin(`../../reports/prod-${Date.now()}-profile.json`, {
        chunkModules: true,
      }),
    ],
  })
  return config
}
