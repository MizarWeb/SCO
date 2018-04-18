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
import { Shapes, getCategoryIcon, delayEvent } from '@sco/domain'
import { ListItem, CardTitle, Modal } from '@sco/components'
import { Plot } from '@sco/adapter'
import map from 'lodash/map'
import { CardActions, CardText } from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'

/**
 * List climate change scenarios from one category
 * @author Léo Mieulet
 */
export class ClimateChangeScenarioListComponent extends React.Component {
  static propTypes = {
    closeView: PropTypes.func.isRequired,
    onSelectScenario: PropTypes.func.isRequired,
    scenarioList: Shapes.ScenarioList,
    thematicList: Shapes.ThematicList,
    mounted: PropTypes.bool.isRequired,
  }
  static actionWrapperStyle = {
    display: 'flex',
    justifyContent: 'center',
  }


  getAttributes = attributes => (
    <div>
      {map(attributes, attribute => (
        <div key={attribute.name}>
          {attribute.name} : {attribute.value}
          <br />
        </div>
      ))}
    </div>
  )

  getDescription = scenario => (
    <div>
      {/* eslint-disable-next-line react/no-danger */}
      <div dangerouslySetInnerHTML={{ __html: scenario.abstract }} />
      {this.getAttributes(scenario.attributes)}
      {this.getGraph(scenario.graph)}
    </div>
  )

  getGraph = graph => console.error('graph', graph) || graph ? (
    <Plot
      className="col-xs-100"
      data={graph.data}
      layout={graph.layout}
      config={graph.config}
      useResizeHandler
    />
  ) : null

  render() {
    return (
      <Modal
        title={
          <CardTitle
            title="Climate changes"
          />
        }
        onClose={this.props.closeView}
        mounted={this.props.mounted}
      >
        <div>
          <CardText>
            {map(this.props.scenarioList, scenario => (
              <ListItem
                key={scenario.id}
                imageURL={scenario.image}
                imageAlt={scenario.title}
                description={this.getDescription(scenario)}
                title={scenario.title}
                onClick={() => { this.props.onSelectScenario(scenario.id) }}
                category={scenario.thematic}
                iconCategoryURL={getCategoryIcon(scenario.thematic)}
                thematicList={this.props.thematicList}
              />
            ))}
          </CardText>
          <CardActions style={ClimateChangeScenarioListComponent.actionWrapperStyle}>
            <RaisedButton
              label="Close"
              onClick={delayEvent(this.props.closeView)}
            />
          </CardActions>
        </div>
      </Modal>
    )
  }
}

export default ClimateChangeScenarioListComponent
