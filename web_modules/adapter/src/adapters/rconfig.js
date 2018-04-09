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
 * This file is a work derived from MIZAR
 *
 * Copyright 2017 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
 *
 * This file is part of MIZAR.
 *
 * MIZAR is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * MIZAR is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with MIZAR. If not, see <http://www.gnu.org/licenses/>.
 ******************************************************************************/

require.config({
  baseUrl: '/sco/mizar/src',
  name: 'Mizar',
  include: ['Mizar'],
  insertRequire: ['Mizar'],
  out: '../build/generated/sco/mizar.min.js',
  optimize: 'uglify2',
  onBuildWrite(name, path, contents) {
    return contents
      .replace(/define\s*\([^{]*?{/, '')
      .replace(/\s*return\s+[^\}]+(\}\);[^\w\}]*)$/, '')
      .replace(/\}\);[^}\w]*$/, '')
  },
  paths: {
    path: '/sco/mizar/node_modules/path/path',
    fits: '/sco/mizar/external/fits',
    'underscore-min': '/sco/mizar/node_modules/underscore/underscore-min',
    jquery: '/sco/mizar/node_modules/jquery/dist/jquery.min',
    'jquery.ui': '/sco/mizar/node_modules/jquery-ui-dist/jquery-ui.min',
    wcs: '/sco/mizar/external/wcs',
    samp: '/sco/mizar/external/samp',
    string: '/sco/mizar/node_modules/string/dist/string',
    gzip: '/sco/mizar/external/gzip.min',
    saveAs: '/sco/mizar/node_modules/file-saver/FileSaver.min',
    jszip: '/sco/mizar/node_modules/jszip/dist/jszip.min',
    xmltojson: '/sco/mizar/node_modules/xmltojson/lib/xmlToJSON.min',
  },
  shim: {
    'underscore-min': {
      exports: '_',
      init() {
        return _.noConflict()
      },
    },
    jquery: {
      exports: '$',
    },
  },
})
