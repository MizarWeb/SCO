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
import Paper from 'material-ui/Paper'
import { Shapes } from '@sco/domain'
import { CardTitle } from '@sco/components'
import { CardActions, CardText } from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'
import find from 'lodash/find'
import ScenarioDescriptionComponent from '../../common/ScenarioDescriptionComponent'

/**
 * Contains the scenario description and a button to active scenario layers
 * @author Léo Mieulet
 */
export class POIMobileInfoComponent extends React.Component {
  static wrapperStyle = {
    position: 'absolute',
    bottom: '4px',
    left: '0px',
    width: '100%',
    backgroundColor: 'white',
    zIndex: 2,
    // desactive event listener
    pointerEvents: 'none',
  }
  static bodyStyle = {
    // reactive event listener
    pointerEvents: 'auto',
  }

  static actionWrapperStyle = {
    display: 'flex',
    justifyContent: 'center',
  }
  static propTypes = {
    activeDataForCurrentScenario: PropTypes.func.isRequired,
    currentScenario: Shapes.Scenario,
    thematicList: Shapes.ThematicList,
  }
  static contextTypes = {
    intl: PropTypes.object,
  }
  state = {
    showDescription: false,
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

  toggleDescription = () => {
    const { showDescription } = this.state
    this.setState({
      showDescription: !showDescription,
    })
  }

  render() {
    const thematicColor = this.getThematicColor(this.props.currentScenario.thematic)

    return (
      <Paper
        style={POIMobileInfoComponent.wrapperStyle}
        zDepth={3}
        className="visible-xs"
        rounded={false}
      >
        <div style={POIMobileInfoComponent.bodyStyle}>
          <CardTitle
            title={this.props.currentScenario.title}
            backgroundColor={thematicColor}
            cardStyle={POIMobileInfoComponent.cardTitleStyle}
            titleColor="#fff"
          />
          <CardText>
            <ScenarioDescriptionComponent
              abstract={this.props.currentScenario.abstract}
              showDescription={this.state.showDescription}
              toggleDescription={this.toggleDescription}
            />
          </CardText>
          <CardActions style={POIMobileInfoComponent.actionWrapperStyle}>
            <FlatButton
              primary
              label={this.context.intl.formatMessage({ id: 'map.scenario.active-data' })}
              onClick={this.props.activeDataForCurrentScenario}
            />
          </CardActions>
        </div>
      </Paper>
    )
  }
}

export default POIMobileInfoComponent
