
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
import isEmpty from 'lodash/isEmpty'
import { Shapes } from '@sco/domain'

/**
 * Display the scenario legend
 * @author Léo Mieulet
 */
export class ScenarioLegendComponent extends React.Component {
  static propTypes = {
    currentScenario: Shapes.Scenario,
    openLegend: PropTypes.func.isRequired,
  }

  static helpWrapperStyle = {
    position: 'absolute',
    width: '100%',
    bottom: '20px',
    left: '20px',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    // desactive event listener
    pointerEvents: 'none',
  }
  static imgStyle = {
    maxHeight: '50vh',
    maxWidth: '10vw',
    zIndex: 2,
    cursor: 'zoom-in',
    // reactive event listener
    pointerEvents: 'auto',
  }
  render() {
    const { currentScenario } = this.props
    const shouldDisplay = !isEmpty(currentScenario.legend) && currentScenario.legend.type === 'VERTICAL'
    return shouldDisplay ? (
      <div
        style={ScenarioLegendComponent.helpWrapperStyle}
      >
        <img
          onClick={this.props.openLegend}
          src={currentScenario.legend.url}
          style={ScenarioLegendComponent.imgStyle}
          alt=""
        />
      </div >
    ) : null
  }
}

export default ScenarioLegendComponent
