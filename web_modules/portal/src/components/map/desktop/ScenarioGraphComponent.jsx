
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
import Graph from '../../common/Graph'

/**
 * Display a graph associated with scenario data
 * @author Léo Mieulet
 */
export class ScenarioGraphComponent extends React.Component {
  static propTypes = {
    currentScenario: Shapes.Scenario,
    layerTemporalInfos: Shapes.LayerTemporalInfos,
  }

  static graphWrapperStyle = {
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


  render() {
    const { currentScenario } = this.props
    const shouldDisplay = !isEmpty(currentScenario.graph)
    return shouldDisplay ? (
      <div
        style={ScenarioGraphComponent.graphWrapperStyle}
        className="hidden-xs"
      >
        <Graph
          currentScenario={this.props.currentScenario}
          layerTemporalInfos={this.props.layerTemporalInfos}
        />
      </div >
    ) : null
  }
}

export default ScenarioGraphComponent
