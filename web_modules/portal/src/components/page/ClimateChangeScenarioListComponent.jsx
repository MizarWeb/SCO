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
import { Shapes, getCategoryIcon } from '@sco/domain'
import { ListItem, CardTitle, Modal } from '@sco/components'
import map from 'lodash/map'
import find from 'lodash/find'
import { CardActions, CardText } from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'
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


  /**
   * Retrieve the thematic color using its id
   */
  getThematicColor = (thematicId) => {
    const thematic = find(this.props.thematicList, t => (
      t.id === thematicId
    ))
    return thematic.color
  }

  /**
   * Retrieve the thematic name using its id
   */
  getThematicName = (thematicId) => {
    const thematic = find(this.props.thematicList, t => (
      t.id === thematicId
    ))
    return thematic.name
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
      {scenario.abstract}
      {this.getAttributes(scenario.attributes)}
    </div>
  )

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
                category={this.getThematicName(scenario.thematic)}
                categoryColor={this.getThematicColor(scenario.thematic)}
                iconCategoryURL={getCategoryIcon(scenario.thematic)}
              />
            ))}
          </CardText>
          <CardActions>
            <FlatButton
              label="Close"
              onClick={this.props.closeView}
            />
          </CardActions>
        </div>
      </Modal>
    )
  }
}

export default ClimateChangeScenarioListComponent
