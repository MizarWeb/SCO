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

/**
 * This file provides some action that can be reduced by MapReducer
 * @author Léo Mieulet
 */
export default class MapActions {
  TOGGLE_LOADING = 'TOGGLE_LOADING'
  SHOW_SCENARIO = 'SHOW_SCENARIO'
  QUIT_SCENARIO = 'QUIT_SCENARIO'
  ACTIVE_DATA_CURRENT_SCENARIO = 'ACTIVE_DATA_CURRENT_SCENARIO'
  SHOW_SCENARIO_INFO = 'SHOW_SCENARIO_INFO'
  HIDE_SCENARIO_INFO = 'HIDE_SCENARIO_INFO'
  HIDE_SPLASH_SCREEN = 'HIDE_SPLASH_SCREEN'
  MIZAR_LIBRARY_LOADED = 'MIZAR_LIBRARY_LOADED'
  END_CENTER_TO = 'END_CENTER_TO'
  RANDOM_MOVEMENT = 'RANDOM_MOVEMENT'
  SAVE_LAYER_INFO = 'SAVE_LAYER_INFO'
  UPDATE_LAYER_INFOS = 'UPDATE_LAYER_INFOS'
  UPDATE_TEMPORAL_FILTER = 'UPDATE_TEMPORAL_FILTER'
  TRAVEL_THROUGH_TIME = 'TRAVEL_THROUGH_TIME'
  TRAVEL_TO_TIME_BOUNDARY = 'TRAVEL_TO_TIME_BOUNDARY'
  TRAVEL_TIME_TO_DATE = 'TRAVEL_TIME_TO_DATE'
  UPDATE_SCENARIO_PARAMETER = 'UPDATE_SCENARIO_PARAMETER'
  TOGGLE_LOADING_LAYER = 'TOGGLE_LOADING_LAYER'

  /**
   * @param {boolean} isOpen true when the map is loading its dependencies
   * @return action to dispatch
   */
  toggleLoading(isLoading) {
    return {
      type: this.TOGGLE_LOADING,
      isLoading,
    }
  }


  /**
   * Ask Mizar to center load layers for that Scenario
   * @param {string} scenarioId
   * @return action to dispatch
   */
  showScenario(scenarioId) {
    return {
      type: this.SHOW_SCENARIO,
      scenarioId,
    }
  }

  /**
   * Ask Mizar to center load layers for that Scenario
   * @return action to dispatch
   */
  quitScenario() {
    return {
      type: this.QUIT_SCENARIO,
    }
  }

  /**
   * Active data from that scenario
   */
  activeDataForCurrentScenario() {
    return {
      type: this.ACTIVE_DATA_CURRENT_SCENARIO,
    }
  }

  /**
   * The user toggle scenario info
   */
  showScenarioInfo(scenarioId) {
    return {
      type: this.SHOW_SCENARIO_INFO,
      scenarioId,
    }
  }

  /**
   * The user toggle scenario info
   */
  hideScenarioInfo() {
    return {
      type: this.HIDE_SCENARIO_INFO,
    }
  }

  /**
   * When the library is fully loaded and the base layer loaded too, hide the React splash screen
   */
  hideSplashScreen() {
    return {
      type: this.HIDE_SPLASH_SCREEN,
    }
  }

  /**
   * When the Mizar library is fully loaded
   */
  onMizarLibraryLoaded() {
    return {
      type: this.MIZAR_LIBRARY_LOADED,
    }
  }

  /**
   * When the library have finished to center over a scenario poi
   */
  endCenterTo() {
    return {
      type: this.END_CENTER_TO,
    }
  }

  /**
   * Catch all Mizar random moves, close pop up and scenario
   */
  onRandomMovement() {
    return {
      type: this.RANDOM_MOVEMENT,
    }
  }

  /**
   * Save layer info to let user edit them
   */
  saveLayerInfo(layerInfo) {
    return {
      type: this.SAVE_LAYER_INFO,
      layerInfo,
    }
  }

  /**
   * Save layers new conf
   */
  updateLayerInfos(layerList, rasterList) {
    return {
      type: this.UPDATE_LAYER_INFOS,
      layerList,
      rasterList,
    }
  }


  /**
   * Save the configuration time submitted by the user
   * @param {Date} startDate
   * @param {Date} endDate
   * @param {string} stepTime
   * @return action to dispatch
   */
  updateTemporalFilter(startDate, endDate, stepTime) {
    return {
      type: this.UPDATE_TEMPORAL_FILTER,
      startDate,
      endDate,
      stepTime,
    }
  }


  /**
   * @param {boolean} goFurther true when the user wants to go in the future
   * @return action to dispatch
   */
  travelThroughTime(goFurther) {
    return {
      type: this.TRAVEL_THROUGH_TIME,
      goFurther,
    }
  }

  /**
   * @param {boolean} isEndBoundary true when the user wants to go to the end date of the period,
   * false if he wants to go to the begin date
   * @return action to dispatch
   */
  travelToTimeBoundary(isEndBoundary) {
    return {
      type: this.TRAVEL_TO_TIME_BOUNDARY,
      isEndBoundary,
    }
  }

  /**
   * @param {Number} nextStep the step the user choosed
   * @param {Number} nextDate the corresponding date
   * @return action to dispatch
   */
  travelTimeToDate(nextStep, nextDate) {
    return {
      type: this.TRAVEL_TIME_TO_DATE,
      nextStep,
      nextDate,
    }
  }

  /**
   * Update additionnal Mizar parameter
   * @param {String} attrName
   * @param {String} value
   */
  updateScenarioParameter(attrName, value) {
    return {
      type: this.UPDATE_SCENARIO_PARAMETER,
      attrName,
      value,
    }
  }


  /**
   * @param {boolean} isOpen true when the map is loading some layer
   * @return action to dispatch
   */
  toggleLoadingLayer(isLoading) {
    return {
      type: this.TOGGLE_LOADING_LAYER,
      isLoading,
    }
  }
}
