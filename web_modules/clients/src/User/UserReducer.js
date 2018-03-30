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
import { PAGE_ENUM } from '@sco/domain'
import UserActions from './UserActions'

/**
 * @author Léo Mieulet
 */
class UserReducer {
  constructor() {
    this.actionsInstance = new UserActions()
    this.defaultState = {
      currentPage: PAGE_ENUM.NONE,
      searchWord: '',
    }
  }

  reduce(state = this.defaultState, action) {
    switch (action.type) {
      case this.actionsInstance.TOGGLE_MENU:
        return {
          ...state,
          currentPage: action.isOpen ? PAGE_ENUM.LIST_CLIMATE_CHANGES : PAGE_ENUM.NONE,
        }
      case this.actionsInstance.TOGGLE_HELP:
        return {
          ...state,
          currentPage: action.isOpen ? PAGE_ENUM.HELP : PAGE_ENUM.NONE,
        }
      case this.actionsInstance.OPEN_RESEARCH:
        return {
          ...state,
          searchWord: '',
          currentPage: PAGE_ENUM.SEARCH_RESULTS,
        }
      case this.actionsInstance.CLOSE_RESEARCH:
        return {
          ...state,
          searchWord: action.searchWord,
          currentPage: PAGE_ENUM.NONE,
        }
      case this.actionsInstance.TOGGLE_TEMPORAL_FILTER:
        return {
          ...state,
          currentPage: action.isOpen ? PAGE_ENUM.TEMPORAL_FORM : PAGE_ENUM.NONE,
        }
      case this.actionsInstance.UPDATE_TEMPORAL_FILTER:
      //TODO
      case this.actionsInstance.TRAVEL_THROUGH_TIME:
      //TODO
      default:
        return state
    }
  }
}

export default () => {
  const instance = new UserReducer()
  return (state, action) => instance.reduce(state, action)
}
