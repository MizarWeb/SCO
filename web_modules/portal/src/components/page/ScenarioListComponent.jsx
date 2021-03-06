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
import { CardActions, CardText } from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'

/**
 * List climate change scenarios from one category
 * @author Léo Mieulet
 */
export class ScenarioListComponent extends React.Component {
  static propTypes = {
    closeView: PropTypes.func.isRequired,
    onSelectScenario: PropTypes.func.isRequired,
    scenarioList: Shapes.ScenarioList,
    thematicList: Shapes.ThematicList,
    mounted: PropTypes.bool.isRequired,
  }
  static contextTypes = {
    intl: PropTypes.object,
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
    </div>
  )

  render() {
    return (
      <Modal
        title={
          <CardTitle
            title={this.context.intl.formatMessage({ id: 'page.scenario-list.title' })}
            subtitle={this.context.intl.formatMessage({ id: 'page.scenario-list.subtitle' })}
          />
        }
        onClose={this.props.closeView}
        mounted={this.props.mounted}
        hasSubtitle
      >
        <div>
          <CardText>
            {map(this.props.scenarioList, scenario => (
              <ListItem
                key={scenario.id}
                imageURL={scenario.image}
                imageAlt={scenario.title}
                imgCopyright={scenario.imgCopyright}
                description={this.getDescription(scenario)}
                title={scenario.title}
                onClick={() => { this.props.onSelectScenario(scenario.id) }}
                category={scenario.thematic}
                iconCategoryURL={getCategoryIcon(scenario.thematic)}
                thematicList={this.props.thematicList}
              />
            ))}
          </CardText>
          <CardActions style={ScenarioListComponent.actionWrapperStyle}>
            <RaisedButton
              label={this.context.intl.formatMessage({ id: 'page.actions.close' })}
              onClick={this.props.closeView}
            />
          </CardActions>
        </div>
      </Modal>
    )
  }
}

export default ScenarioListComponent
