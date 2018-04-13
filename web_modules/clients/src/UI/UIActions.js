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
 * This file provides some action that can be reduced by UIReducer
 * This way the HMI dispatch actions that impacts the redux store,
 * which allows us to select these informations from anywhere using UISelectors
 * @author Léo Mieulet
 */
export default class UIActions {
  TOGGLE_SCENARIO_LIST = 'TOGGLE_SCENARIO_LIST'
  TOGGLE_MENU = 'TOGGLE_MENU'
  TOGGLE_HELP = 'TOGGLE_HELP'
  OPEN_RESEARCH = 'OPEN_RESEARCH'
  CLOSE_RESEARCH = 'CLOSE_RESEARCH'
  UPDATE_SEARCH_QUERY = 'UPDATE_SEARCH_QUERY'
  UPDATE_TEMPORAL_FILTER = 'UPDATE_TEMPORAL_FILTER'
  TRAVEL_THROUGH_TIME = 'TRAVEL_THROUGH_TIME'
  TOGGLE_TEMPORAL_FILTER = 'TOGGLE_TEMPORAL_FILTER'
  OPEN_SCENARIO = 'OPEN_SCENARIO'
  TOGGLE_LAYER_MANAGER = 'TOGGLE_LAYER_MANAGER'

  /**
   * @param {boolean} isOpen true when the user opens the scenario list
   * @return action to dispatch
   */
  toggleScenarioList(isOpen) {
    return {
      type: this.TOGGLE_SCENARIO_LIST,
      isOpen,
    }
  }

  /**
   * @param {boolean} isOpen true when the user opens the menu page
   * @return action to dispatch
   */
  toggleMenu(isOpen) {
    return {
      type: this.TOGGLE_MENU,
      isOpen,
    }
  }

  /**
   *
   * @param {boolean} isOpen true when the user opens the help page
   * @return action to dispatch
   */
  toggleHelp(isOpen) {
    return {
      type: this.TOGGLE_HELP,
      isOpen,
    }
  }

  /**
   * Open the research page with the searchWord as query
   * @param {string} searchQuery text the user search for
   * @return action to dispatch
   */
  openResearch(searchQuery) {
    return {
      type: this.OPEN_RESEARCH,
      searchQuery,
    }
  }

  updateSearchQuery(searchQuery) {
    return {
      type: this.UPDATE_SEARCH_QUERY,
      searchQuery,
    }
  }

  closeResearch() {
    return {
      type: this.CLOSE_RESEARCH,
    }
  }

  /**
   * @param {boolean} isOpen true when the user opens the menu page
   * @return action to dispatch
   */
  toggleTemporalFilter(isOpen) {
    return {
      type: this.TOGGLE_TEMPORAL_FILTER,
      isOpen,
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
   * @param {boolean} isOpen true when the user opens the layer manager page
   * @return action to dispatch
   */
  toggleLayerManager(isOpen) {
    return {
      type: this.TOGGLE_LAYER_MANAGER,
      isOpen,
    }
  }
}
