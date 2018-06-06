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
import { PAGE_ENUM, parseLanguageLocale, LOCALES_ENUM } from '@sco/domain'
import UIActions from './UIActions'


// 1 - Attempt retrieve language from navigator
const navigatorRef = window.navigator || {}
const navigatorLocale = navigatorRef.language || navigatorRef.userLanguage

/**
 * @author Léo Mieulet
 */
class UIReducer {
  constructor() {
    this.actionsInstance = new UIActions()
    this.defaultState = {
      currentPage: PAGE_ENUM.NONE,
      searchQuery: '',
      locale: parseLanguageLocale(navigatorLocale),
    }
  }

  reduce(state = this.defaultState, action) {
    switch (action.type) {
      case this.actionsInstance.TOGGLE_SCENARIO_LIST:
        return {
          ...state,
          currentPage: action.isOpen ? PAGE_ENUM.LIST_SCENARIO : PAGE_ENUM.NONE,
        }
      case this.actionsInstance.TOGGLE_MENU:
        return {
          ...state,
          currentPage: action.isOpen ? PAGE_ENUM.MENU : PAGE_ENUM.NONE,
        }
      case this.actionsInstance.TOGGLE_HELP:
        return {
          ...state,
          currentPage: action.isOpen ? PAGE_ENUM.HELP : PAGE_ENUM.NONE,
        }
      case this.actionsInstance.OPEN_RESEARCH:
        return {
          ...state,
          searchQuery: action.searchQuery,
          currentPage: PAGE_ENUM.SEARCH_RESULTS,
        }
      case this.actionsInstance.CLOSE_RESEARCH:
        return {
          ...state,
          searchQuery: '',
          currentPage: PAGE_ENUM.NONE,
        }
      case this.actionsInstance.UPDATE_SEARCH_QUERY:
        return {
          ...state,
          searchQuery: action.searchQuery,
        }
      case this.actionsInstance.TOGGLE_TEMPORAL_FILTER:
        return {
          ...state,
          currentPage: action.isOpen ? PAGE_ENUM.TEMPORAL_FORM : PAGE_ENUM.NONE,
        }
      case this.actionsInstance.TOGGLE_LAYER_MANAGER:
        return {
          ...state,
          currentPage: action.isOpen ? PAGE_ENUM.LAYER_MANAGER : PAGE_ENUM.NONE,
        }
      case this.actionsInstance.TOGGLE_LEGEND:
        return {
          ...state,
          currentPage: action.isOpen ? PAGE_ENUM.LEGEND : PAGE_ENUM.NONE,
        }
      case this.actionsInstance.TOGGLE_GRAPH:
        return {
          ...state,
          currentPage: action.isOpen ? PAGE_ENUM.GRAPH : PAGE_ENUM.NONE,
        }
      case this.actionsInstance.TOGGLE_LOCALE:
        return {
          ...state,
          locale: state.locale === LOCALES_ENUM.EN ? LOCALES_ENUM.FR : LOCALES_ENUM.EN,
        }
      default:
        return state
    }
  }
}

export default () => {
  const instance = new UIReducer()
  return (state, action) => instance.reduce(state, action)
}
