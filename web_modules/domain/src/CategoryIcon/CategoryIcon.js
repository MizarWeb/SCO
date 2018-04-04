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
import climate from './img/climate.png'
import air from './img/air.png'
import costal from './img/costal.png'
import food from './img/food.png'
import health from './img/health.png'
import land from './img/land.png'
import disasters from './img/natural_disasters.png'
import ocean from './img/ocean.png'
import water from './img/water.png'
/**
 * @author Léo Mieulet
 */

/**
 * @param type {string} category name
 * @return {string} the url of the picture
 */
export default (type) => {
  switch (type) {
    case 'CLIMATE':
      return climate
    case 'AIR':
      return air
    case 'COSTAL':
      return costal
    case 'FOOD':
      return food
    case 'HEALTH':
      return health
    case 'LAND':
      return land
    case 'DISASTER':
      return disasters
    case 'OCEAN':
      return ocean
    case 'WATER':
      return water
    default:
      throw new Error(`Unexpected type ${type}`)
  }
}
