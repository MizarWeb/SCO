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
import BasicSelector from '../BasicSelector'

const DEFAULT_LANG = 'en'

/**
 * Map informations
 * @author Léo Mieulet
 */
class MapSelectors extends BasicSelector {
  /**
   * Return the current view, see possible values with MAP_ENUM
   * @param {*} store
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
   * @param {*} store
   */
  isDisplayingSplashScreen(store) {
    return this.uncombineStore(store).isDisplayingSplashScreen
  }

  getThematics(store) {
    return this.uncombineStore(store).mizarConf[DEFAULT_LANG].thematics
  }

  getScenarioList(store) {
    return this.uncombineStore(store).mizarConf[DEFAULT_LANG].scenarios
  }

  getCurrentScenarioId(store) {
    return this.uncombineStore(store).scenarioId
  }
}

export default storePath => new MapSelectors(storePath)
