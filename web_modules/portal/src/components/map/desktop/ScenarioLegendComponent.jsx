
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
import './ScenarioLegend.css'

/**
 * Display the scenario legend
 * @author Léo Mieulet
 */
export class ScenarioLegendComponent extends React.Component {
  static propTypes = {
    currentScenario: Shapes.Scenario,
    openLegend: PropTypes.func.isRequired,
  }

  static wrapperStyle = {
    position: 'absolute',
    bottom: '4px',
    left: '0px',
    backgroundColor: 'white',
    // desactive event listener
    pointerEvents: 'none',
  }
  static legendWrapperStyle = {
    display: 'flex',
  }
  static imgStyle = {
    zIndex: 2,
    cursor: 'zoom-in',
    width: 'auto',
    height: 'auto',
    // Avoid to alter image ratio
    objectFit: 'contain',
    // reactive event listener
    pointerEvents: 'auto',
  }
  static legendTitleStyle = {
    wordWrap: 'break-word',
    color: 'white',
    overflow: 'hidden',
    margin: '5px 5px 5px',
    fontWeight: 500,
    fontSize: '1.1em',
    lineHeight: '1.2em',
    letterSpacing: '1px',
    // reactive event listener
    pointerEvents: 'auto',
  }
  static legendTitleWrapperStyle = {
    height: 'auto',
    width: 'auto',
    backgroundColor: '#00AAFF',
    display: 'flex',
    alignItems: 'center',
  }
  render() {
    const { currentScenario } = this.props
    const shouldDisplay = !isEmpty(currentScenario.legend) && currentScenario.legend.type === 'VERTICAL'
    return shouldDisplay ? (
      <div
        className="scenario-legend hidden-xs"
        style={ScenarioLegendComponent.wrapperStyle}
      >
        <div style={ScenarioLegendComponent.legendWrapperStyle}>
          <img
            className="scenario-image"
            onClick={this.props.openLegend}
            src={currentScenario.legend.url}
            style={ScenarioLegendComponent.imgStyle}
            alt={currentScenario.legend.title}
          />
          <div
            style={ScenarioLegendComponent.legendTitleWrapperStyle}
            className="scenario-text"
          >
            <span style={ScenarioLegendComponent.legendTitleStyle}>
              {currentScenario.legend.title}
            </span>
          </div>
        </div >
      </div >
    ) : null
  }
}

export default ScenarioLegendComponent
