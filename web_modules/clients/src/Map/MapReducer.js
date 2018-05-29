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
import get from 'lodash/get'
import forEach from 'lodash/forEach'
import cloneDeep from 'lodash/cloneDeep'
import { mizarConf, MAP_ENUM, TEMPORAL_TYPE_ENUM, LayerPeriodUtils, PeriodUtils } from '@sco/domain'
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
      nbLoadingLayers: 0,

      scenarioId: '',
      centerToScenarioId: '',
      showScenarioLayers: false,

      layerInfos: {},
      layerTemporal: {
        type: TEMPORAL_TYPE_ENUM.UNSPECIFIED,
        nbStep: 0,
        beginDate: null,
        endDate: null,
        dateList: [],
        step: null,
        currentDate: null,
        currentStep: 0,
        unavailableSteps: [],
      },
      layerParameters: {
        attrName: '',
        value: '',
      },
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
      set(updatedLayerInfos, `${state.scenarioId}.${layer.type}.${layer.id}`, layer)
    })
    forEach(rasterList, (layer) => {
      set(updatedLayerInfos, `${state.scenarioId}.${layer.type}.${layer.id}`, layer)
    })
    return updatedLayerInfos
  }

  static updateLayerTemporal(state, layerInfos) {
    return LayerPeriodUtils.parseLayers(get(layerInfos, `${state.scenarioId}.LAYER`))
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
          layerTemporal: this.defaultState.layerTemporal,
          layerParameters: this.defaultState.layerParameters,
          layerInfos: {},
          showScenarioLayers: true,
        }
      case this.actionsInstance.QUIT_SCENARIO:
        return {
          ...state,
          currentView: MAP_ENUM.INITIAL,
          scenarioId: '',
          centerToScenarioId: '',
          layerTemporal: this.defaultState.layerTemporal,
          layerParameters: this.defaultState.layerParameters,
          showScenarioLayers: false,
        }
      case this.actionsInstance.ACTIVE_DATA_CURRENT_SCENARIO:
        return {
          ...state,
          currentView: MAP_ENUM.SHOWING_SCENARIO,
          showScenarioLayers: true,
        }
      case this.actionsInstance.SHOW_SCENARIO_INFO:
        return {
          ...state,
          currentView: MAP_ENUM.SOON_INFO_SCENARIO,
          scenarioId: action.scenarioId,
          centerToScenarioId: action.scenarioId,
          showScenarioLayers: false,
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
        if (state.currentView === MAP_ENUM.INFO_SCENARIO) {
          return {
            ...state,
            centerToScenarioId: '',
            scenarioId: '',
            currentView: MAP_ENUM.INITIAL,
          }
        }
        return state
      case this.actionsInstance.SAVE_LAYER_INFO: {
        const layerInfos = set(state.layerInfos, `${action.layerInfo.scenarioId}.${action.layerInfo.type}.${action.layerInfo.id}`, action.layerInfo)
        const layerTemporal = MapReducer.updateLayerTemporal(state, layerInfos)
        return {
          ...state,
          layerInfos,
          layerTemporal,
        }
      }
      case this.actionsInstance.UPDATE_LAYER_INFOS:
        return {
          ...state,
          layerInfos: MapReducer.updateLayerInfos(state, action.layerList, action.rasterList),
        }
      case this.actionsInstance.UPDATE_TEMPORAL_FILTER:
        return {
          ...state,
          layerTemporal: {
            ...state.layerTemporal,
            beginDate: action.startDate,
            endDate: action.endDate,
            step: action.stepTime,
            nbStep: PeriodUtils.extractNumberOfStep(action.startDate, action.endDate, action.stepTime),
            currentDate: action.startDate,
            currentStep: 0,
          },
        }
      case this.actionsInstance.TRAVEL_THROUGH_TIME: {
        let nextStep = state.layerTemporal.currentStep
        nextStep += action.goFurther ? 1 : -1
        const nextDate = action.goFurther ? PeriodUtils.getNextDate(state.layerTemporal) : PeriodUtils.getPreviousDate(state.layerTemporal)
        return {
          ...state,
          layerTemporal: {
            ...state.layerTemporal,
            currentDate: nextDate,
            currentStep: nextStep,
          },
        }
      }
      case this.actionsInstance.UPDATE_SCENARIO_PARAMETER:
        return {
          ...state,
          layerParameters: {
            attrName: action.attrName,
            value: action.value,
          },
        }
      case this.actionsInstance.TOGGLE_LOADING_LAYER:
        return {
          ...state,
          nbLoadingLayers: action.isLoading ? state.nbLoadingLayers + 1 : state.nbLoadingLayers - 1,
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
