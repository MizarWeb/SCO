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
  SHOW_SCENARIO_INFO = 'SHOW_SCENARIO_INFO'
  HIDE_SCENARIO_INFO = 'HIDE_SCENARIO_INFO'
  HIDE_SPLASH_SCREEN = 'HIDE_SPLASH_SCREEN'

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
   * The user toggle scenario info (without loading layers and other stuff)
   */
  showScenarioInfo(collectionId, scenarioId) {
    return {
      type: this.SHOW_SCENARIO_INFO,
    }
  }

  /**
   * The user toggle scenario info (without loading layers and other stuff)
   */
  hideScenarioInfo() {
    return {
      type: this.HIDE_SCENARIO_INFO,
    }
  }

  /**
   * When the library is fully loaded, hide the React splash screen
   */
  hideSplashScreen() {
    return {
      type: this.HIDE_SPLASH_SCREEN,
    }
  }
}
