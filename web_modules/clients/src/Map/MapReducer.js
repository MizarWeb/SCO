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
import { mizarConf, MAP_ENUM } from '@sco/domain'
import MapActions from './MapActions'

/**
 * @author Léo Mieulet
 */
class MapReducer {
  constructor() {
    this.actionsInstance = new MapActions()
    this.defaultState = {
      isLoading: false,
      currentView: MAP_ENUM.INITIAL,
      scenarioId: '',
      mizarConf,
    }
  }

  reduce(state = this.defaultState, action) {
    switch (action.type) {
      case this.actionsInstance.TOGGLE_LOADING:
        return {
          ...state,
          isLoading: action.isLoading,
        }
      case this.actionsInstance.SHOW_SCENARIO:
        return {
          ...state,
          currentView: MAP_ENUM.SHOWING_SCENARIO,
          scenarioId: action.scenarioId,
        }
      case this.actionsInstance.SHOW_SCENARIO_INFO:
        return {
          ...state,
          currentView: MAP_ENUM.INFO_SCENARIO,
          scenarioId: action.scenarioId,
        }
      case this.actionsInstance.HIDE_SCENARIO_INFO:
        return {
          ...state,
          currentView: MAP_ENUM.INITIAL,
          scenarioId: '',
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
