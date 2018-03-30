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
const webpack = require('webpack')
const merge = require('./merge')


// Remove the a folder before building
module.exports = function (oldConf) {
  return merge(oldConf, {
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('production'),
        },
      }),
      // A plugin for a more aggressive chunk merging strategy. Even similar chunks are merged if the total size is reduced enough.
      new webpack.optimize.AggressiveMergingPlugin(),
      new webpack.optimize.MinChunkSizePlugin({ minChunkSize: 10000 }),
      // Minimize all JavaScript output of chunks
      // new webpack.optimize.UglifyJsPlugin({
      //   compress: {
      //     screw_ie8: true, // React doesn't support IE8
      //     warnings: false,
      //   },
      //   mangle: {
      //     screw_ie8: true,
      //   },
      //   output: {
      //     comments: false,
      //     screw_ie8: true,
      //   },
      //   // Do not generate source map files (this is usefull during developpment)
      //   sourceMap: false,
      // }),
      new webpack.BannerPlugin('Copyright CNES'),
    ],
  })
}
