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
import get from 'lodash/get'
import isEmpty from 'lodash/isEmpty'
import { CardTitle, Modal } from '@sco/components'
import { Shapes } from '@sco/domain'
import { CardActions, CardText } from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'
import Graph from '../common/Graph'

/**
 * Display the graph in full size
 * @author Léo Mieulet
 */
export class GraphComponent extends React.Component {
  static propTypes = {
    closeGraph: PropTypes.func.isRequired,
    mounted: PropTypes.bool.isRequired,
    scenario: Shapes.Scenario,
    layerTemporalInfos: Shapes.LayerTemporalInfos,
  }
  static actionWrapperStyle = {
    display: 'flex',
    justifyContent: 'center',
  }
  static buttonStyle = {
    margin: '0 10px',
  }
  static legendWrapperStyle = {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: '25px',
  }
  static titleStyle = {
    fontWeight: '700',
    marginBottom: '25px',
  }
  render() {
    const { scenario } = this.props
    return (
      <Modal
        title={
          <CardTitle
            title={`${get(scenario, 'title', '')} graph`}
            truncateTitle
          />
        }
        onClose={this.props.closeGraph}
        mounted={this.props.mounted}
        hasSubtitle={false}
      >
        <div>
          <CardText>
            {!!scenario && !isEmpty(scenario.graph) ? (
              <Graph
                currentScenario={this.props.scenario}
                layerTemporalInfos={this.props.layerTemporalInfos}
              />
            ) : null}
            <CardActions style={GraphComponent.actionWrapperStyle}>
              <RaisedButton
                label="Close"
                onClick={this.props.closeGraph}
                style={GraphComponent.buttonStyle}
              />
            </CardActions>
          </CardText>
        </div>
      </Modal>
    )
  }
}

export default GraphComponent
