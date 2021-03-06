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
 * Combine all reducers into a single root reducer.
 */
import { combineReducers } from 'redux'
import { uiReducer } from './clients/UIClient'
import { mapReducer } from './clients/MapClient'

/**
 * Portal reducers
 * @author Léo Mieulet
 */
export default combineReducers({
  ui: uiReducer,
  map: mapReducer,
})
