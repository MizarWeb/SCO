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
import map from 'lodash/map'
import { CardActions, CardTitle, CardText } from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'
import { List, ListItem } from 'material-ui/List'
import Avatar from 'material-ui/Avatar'
import FileFolder from 'material-ui/svg-icons/file/folder'

/**
 * List climate change scenarios from one category
 * @author Léo Mieulet
 */
export class ClimateChangeScenarioListComponent extends React.Component {
  static propTypes = {
    closeView: PropTypes.func.isRequired,
    onSelectScenario: PropTypes.func.isRequired,
    scenarioList: Shapes.ScenarioList,
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

  render() {
    return (
      <div>
        <CardTitle
          title="Climate changes"
        />
        <CardText>

          <List>
            {map(this.props.scenarioList, scenario => (
              <ListItem
                key={scenario.id}
                leftAvatar={<Avatar icon={<FileFolder />} />}
                secondaryText={this.getAttributes(scenario.attributes)}
                primaryText={scenario.title}
                onClick={() => { this.props.onSelectScenario(scenario.id) }}
              />
            ))}
          </List>
        </CardText>
        <CardActions>
          <FlatButton
            label="Close"
            onClick={this.props.closeView}
          />
        </CardActions>
      </div>
    )
  }
}

export default ClimateChangeScenarioListComponent
