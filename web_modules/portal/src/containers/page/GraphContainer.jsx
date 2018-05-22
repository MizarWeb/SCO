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
import { Shapes } from '@sco/domain'
import { connect } from 'react-redux'
import { uiActions } from '../../clients/UIClient'
import { mapSelectors } from '../../clients/MapClient'
import GraphComponent from '../../components/page/GraphComponent'

/**
 * @author Léo Mieulet
 */
export class GraphContainer extends React.Component {
  static propTypes = {
    closeGraph: PropTypes.func.isRequired,
    mounted: PropTypes.bool.isRequired,
    scenario: Shapes.Scenario,
    layerTemporalInfos: Shapes.LayerTemporalInfos,
  }
  static mapStateToProps = (state, ownProps) => ({
    scenario: mapSelectors.getCurrentScenario(state),
    layerTemporalInfos: mapSelectors.getLayerTemporalInfos(state),
  })
  static mapDispatchToProps = dispatch => ({
    closeGraph: () => dispatch(uiActions.toggleGraph(false)),
  })

  render() {
    return (
      <GraphComponent
        closeGraph={this.props.closeGraph}
        mounted={this.props.mounted}
        scenario={this.props.scenario}
        layerTemporalInfos={this.props.layerTemporalInfos}
      />
    )
  }
}

export default connect(GraphContainer.mapStateToProps, GraphContainer.mapDispatchToProps)(GraphContainer)

