
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
import { Plot } from '@sco/adapter'
import { Shapes } from '@sco/domain'

/**
 * Display a graph associated with scenario data
 * @author Léo Mieulet
 */
export class ScenarioGraphComponent extends React.Component {
  static propTypes = {
    currentScenario: Shapes.Scenario,
  }

  static helpWrapperStyle = {
    position: 'absolute',
    width: '100%',
    bottom: '20px',
    right: '20px',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    // desactive event listener
    pointerEvents: 'none',
  }
  static textStyle = {
    textAlign: 'center',
    padding: '10px',
    userSelect: 'none',
  }
  static cardStyle = {
    height: '40vh',
    paddingBottom: '0',
    zIndex: 2,
    // reactive event listener
    pointerEvents: 'auto',
  }

  render() {
    const { currentScenario } = this.props
    const shouldDisplay = !isEmpty(currentScenario.graph)
    return shouldDisplay ? (
      <div
        style={ScenarioGraphComponent.helpWrapperStyle}
      >
        <Plot
          className="col-sm-25"
          data={currentScenario.graph.data}
          layout={currentScenario.graph.layout}
          config={currentScenario.graph.config}
          useResizeHandler
        />
      </div >
    ) : null
  }
}

export default ScenarioGraphComponent
