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
   * @param {*} store
   * @return {string} current view
   */
  getCurrentView(store) {
    return this.uncombineStore(store).currentView
  }

  isMizarLoading(store) {
    return this.uncombineStore(store).isLoading
  }

  getThematics(store) {
    return this.uncombineStore(store).mizarConf[DEFAULT_LANG].thematics
  }

  getCollections(store) {
    return this.uncombineStore(store).mizarConf[DEFAULT_LANG].collections
  }

  getScenarioList(store, collectionId) {
    const collection = find(this.getCollections(store), col => col.id === collectionId)
    return get(collection, 'scenarios', [])
  }

  getCurrentCollectionId(store) {
    return this.uncombineStore(store).currentScenario.collectionId
  }

  getCurrentScenarioId(store) {
    return this.uncombineStore(store).currentScenario.scenarioId
  }

  getCurrentScenario(store) {
    const scenarios = this.getScenarioList(store, this.getCurrentCollectionId(store))
    const currentScenarioId = this.getCurrentScenarioId(store)
    const scenario = find(scenarios, scenar => scenar.id === currentScenarioId)
    return scenario
  }
}

export default storePath => new MapSelectors(storePath)
