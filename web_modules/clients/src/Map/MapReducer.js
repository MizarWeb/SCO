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
import set from 'lodash/set'
import forEach from 'lodash/forEach'
import cloneDeep from 'lodash/cloneDeep'
import { mizarConf, MAP_ENUM } from '@sco/domain'
import MapActions from './MapActions'

/**
 * @author Léo Mieulet
 */
class MapReducer {
  constructor() {
    this.actionsInstance = new MapActions()
    this.defaultState = {
      currentView: MAP_ENUM.INITIAL,
      isDisplayingSplashScreen: true,
      isMizarLibraryLoaded: false,
      isLoading: false,
      scenarioId: '',
      centerToScenarioId: '',
      layerInfos: {},
      mizarConf,
    }
  }
  /**
   * When the map finished to center to a feature, we can switch the currentView state from SOON_[0] to [0]
   * @param {*} state
   */
  static getNextCurrentView(state) {
    let { currentView } = state
    if (state.currentView === MAP_ENUM.SOON_INFO_SCENARIO) {
      currentView = MAP_ENUM.INFO_SCENARIO
    } else if (state.currentView === MAP_ENUM.SOON_SHOWING_SCENARIO) {
      currentView = MAP_ENUM.SHOWING_SCENARIO
    } else {
      currentView = MAP_ENUM.INITIAL
    }
    return currentView
  }

  static updateLayerInfos(state, layerList, rasterList) {
    const updatedLayerInfos = cloneDeep(state.layerInfos)
    forEach(layerList, (layer) => {
      set(updatedLayerInfos, `${state.scenarioId}.${layer.type}.${layer.name}`, layer)
    })
    forEach(rasterList, (layer) => {
      set(updatedLayerInfos, `${state.scenarioId}.${layer.type}.${layer.name}`, layer)
    })
    return updatedLayerInfos
  }

  reduce(state = this.defaultState, action) {
    switch (action.type) {
      case this.actionsInstance.HIDE_SPLASH_SCREEN:
        return {
          ...state,
          isDisplayingSplashScreen: false,
        }
      case this.actionsInstance.MIZAR_LIBRARY_LOADED:
        return {
          ...state,
          isMizarLibraryLoaded: true,
        }
      case this.actionsInstance.TOGGLE_LOADING:
        return {
          ...state,
          isLoading: action.isLoading,
        }
      case this.actionsInstance.SHOW_SCENARIO:
        return {
          ...state,
          currentView: MAP_ENUM.SOON_SHOWING_SCENARIO,
          scenarioId: action.scenarioId,
          centerToScenarioId: action.scenarioId,
        }
      case this.actionsInstance.ACTIVE_DATA_CURRENT_SCENARIO:
        return {
          ...state,
          currentView: MAP_ENUM.SHOWING_SCENARIO,
        }
      case this.actionsInstance.SHOW_SCENARIO_INFO:
        return {
          ...state,
          currentView: MAP_ENUM.SOON_INFO_SCENARIO,
          scenarioId: action.scenarioId,
          centerToScenarioId: action.scenarioId,
        }
      case this.actionsInstance.HIDE_SCENARIO_INFO:
        return {
          ...state,
          currentView: MAP_ENUM.INITIAL,
          scenarioId: '',
        }
      case this.actionsInstance.END_CENTER_TO:
        return {
          ...state,
          centerToScenarioId: '',
          currentView: MapReducer.getNextCurrentView(state),
        }
      case this.actionsInstance.RANDOM_MOVEMENT:
        if (state.currentView === MAP_ENUM.SOON_SHOWING_SCENARIO || state.currentView === MAP_ENUM.SOON_INFO_SCENARIO) {
          return state
        }
        return {
          ...state,
          centerToScenarioId: '',
          scenarioId: '',
          currentView: MAP_ENUM.INITIAL,
        }

      case this.actionsInstance.SAVE_LAYER_INFO:

        return {
          ...state,
          layerInfos: set(state.layerInfos, `${action.layerInfo.scenarioId}.${action.layerInfo.type}.${action.layerInfo.name}`, action.layerInfo),
        }
      case this.actionsInstance.UPDATE_LAYER_INFOS:
        return {
          ...state,
          layerInfos: MapReducer.updateLayerInfos(state, action.layerList, action.rasterList),
        }
      default:
        return state
    }
  }
}

export default () => {
  const instance = new MapReducer()
  return (state, action) => instance.reduce(state, action)
}
