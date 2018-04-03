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
 * @author Léo Mieulet
 */
import UIActions from './UI/UIActions'
import getUIReducer from './UI/UIReducer'
import getUISelectors from './UI/UISelectors'

import MapActions from './Map/MapActions'
import getMapReducer from './Map/MapReducer'
import getMapSelectors from './Map/MapSelectors'


module.exports = {
  UIActions,
  getUIReducer,
  getUISelectors,

  MapActions,
  getMapReducer,
  getMapSelectors,
}
