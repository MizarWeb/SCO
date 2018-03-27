/*
 * Copyright 2018 SCO - Space Climate Observatory
 *
 * This file is part of CSO.
 *
 * CSO is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * CSO is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with CSO. If not, see <http://www.gnu.org/licenses/>.
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
const getWebpackCoverageConf = require('./app/webpack.coverage.config')
const getWebpackDevConf = require('./app/webpack.dev.config')
const getWebpackProdConf = require('./app/webpack.prod.config')
const getWebpackTestConf = require('./app/webpack.test.config')

const merge = require('./utils/merge')
const cleanFolder = require('./utils/cleanFolder')
const addProdPlugins = require('./utils/addProdPlugins')
const runShell = require('./utils/runShell')
const saveDevPlugin = require('./utils/saveDevPlugin')

const MODE = {
  COVERAGE: 'coverage',
  DEV: 'dev',
  PROD: 'prod',
  TEST: 'test',
}

const DEFAULT_UNKNOW_DIR = '/specify/your/working/directory/path'
const DEFAULT_UNKNOW_PATH_TO_DELETE = '/specify/the/directory/to/delete'

/**
 * We need to define the relative path between the plugin to the webapp folder to :
 * [DEV] save the plugin for webpack-dev-server each time you edit it
 * [PROD] Use the coreoss DLL
 */
const DEFAULT_PATH_BETWEEN_PLUGIN_AND_WEBAPP = '../../..'
const slugMessage = '@cso/webpack-config-front | '

class WebpackConfig {
  constructor() {
    this.conf = {}
  }

  generateConfig({ mode = MODE.DEV, projectContextPath = DEFAULT_UNKNOW_DIR }) {
    console.info(slugMessage, 'Generate config with mode =', mode)
    console.info(slugMessage, 'Working directory =', projectContextPath)
    switch (mode) {
      case MODE.COVERAGE:
        this.conf = getWebpackCoverageConf(projectContextPath)
        break
      case MODE.DEV:
        this.conf = getWebpackDevConf(projectContextPath)
        break
      case MODE.PROD:
        this.conf = getWebpackProdConf(projectContextPath)
        break
      case MODE.TEST:
        this.conf = getWebpackTestConf(projectContextPath)
        break
      default:
        throw new Error(`Unknown mode, allowed values are ${JSON.stringify(MODE)}`)
    }
    return this
  }

  merge(newConf) {
    this.conf = merge(this.conf, newConf)
    return this
  }

  cleanFolder({ projectContextPath = DEFAULT_UNKNOW_DIR, pathToDelete = DEFAULT_UNKNOW_PATH_TO_DELETE }) {
    this.conf = cleanFolder(this.conf, projectContextPath, pathToDelete)
    return this
  }

  addProductionPlugins() {
    this.conf = addProdPlugins(this.conf)
    return this
  }

  runShell(config) {
    this.conf = runShell(this.conf, config)
    return this
  }

  get() {
    return this.conf
  }
}
const webpackConfigInstance = new WebpackConfig()

module.exports = webpackConfigInstance
