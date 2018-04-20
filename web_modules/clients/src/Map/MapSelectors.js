/**
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
 **/
import find from 'lodash/find'
import get from 'lodash/get'
import BasicSelector from '../BasicSelector'

const DEFAULT_LANG = 'en'

/**
 * Map informations
 * @author Léo Mieulet
 */
class MapSelectors extends BasicSelector {
  /**
   * Return the current view, see possible values with MAP_ENUM
   * @return {string} current view
   */
  getCurrentView(store) {
    return this.uncombineStore(store).currentView
  }

  isMizarLoading(store) {
    return this.uncombineStore(store).isLoading
  }

  /**
   * Return true when the Mizar library & the base map are loading
   */
  isDisplayingSplashScreen(store) {
    return this.uncombineStore(store).isDisplayingSplashScreen
  }

  /**
   * Return true when Mizar have been loaded by Require.js
   */
  isMizarLibraryLoaded(store) {
    return this.uncombineStore(store).isMizarLibraryLoaded
  }

  /**
   * Return true when layers should be displayed
   */
  showScenarioLayers(store) {
    return this.uncombineStore(store).showScenarioLayers
  }

  getThematics(store) {
    return this.uncombineStore(store).mizarConf[DEFAULT_LANG].thematics
  }

  getBaseLayers(store) {
    return this.uncombineStore(store).mizarConf[DEFAULT_LANG].baseLayers
  }

  getScenarioList(store) {
    return this.uncombineStore(store).mizarConf[DEFAULT_LANG].scenarios
  }

  getCurrentScenarioId(store) {
    return this.uncombineStore(store).scenarioId
  }

  getCurrentScenario(store) {
    const scenarioId = this.getCurrentScenarioId(store)
    const scenar = find(this.getScenarioList(store), s => (
      s.id === scenarioId
    ))
    return scenar
  }

  getCenterToScenarioId(store) {
    return this.uncombineStore(store).centerToScenarioId
  }

  /**
   * Return all layers by their type
   */
  getLayersByType(store) {
    const scenarioId = this.getCurrentScenarioId(store)
    return this.uncombineStore(store).layerInfos[scenarioId]
  }

  /**
   * Only return layers that has the LAYER type
   */
  getLayers(store) {
    return get(this.getLayersByType(store), 'LAYER', {})
  }

  getRasters(store) {
    return get(this.getLayersByType(store), 'RASTER', {})
  }
}

export default storePath => new MapSelectors(storePath)
