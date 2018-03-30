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
import PortalApp from './containers/PortalApp'
import portalReducer from './reducer'

// Import some CSS
import './style/reset.css'
import './style/main.css'
import './style/bootstrap_grid_100.css'
import './style/animations.css'

/**
 * Main file of module to expose public interface
 * @author Léo Mieulet
 **/
module.exports = {
  PortalApp,
  portalReducer,
}
