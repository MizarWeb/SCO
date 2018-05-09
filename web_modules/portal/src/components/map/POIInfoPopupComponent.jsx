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
import find from 'lodash/find'
import { Shapes } from '@sco/domain'
import { CardTitle } from '@sco/components'
import { Card, CardActions, CardText } from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'
import ScenarioDescriptionComponent from '../common/ScenarioDescriptionComponent'


/**
 * Interesting point info popup component
 * Display information about one interesting point of the map
 * @author Léo Mieulet
 */
export class POIInfoPopupComponent extends React.Component {
  static propTypes = {
    currentScenario: Shapes.Scenario,
    thematicList: Shapes.ThematicList,
    activeDataForCurrentScenario: PropTypes.func.isRequired,
  }

  static cardStyle = {
    zIndex: 3,
    top: '15px',
    position: 'absolute',
    left: 0,
  }
  static cardTitleStyle = {
    paddingBottom: '8px',
  }
  static actionWrapperStyle = {
    display: 'flex',
    justifyContent: 'center',
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
      <Card
        onClick={this.handleChange}
        className="col-sm-20 hidden-xs"
        style={POIInfoPopupComponent.cardStyle}
      >
        <CardTitle
          title={this.props.currentScenario.title}
          backgroundColor={thematicColor}
          cardStyle={POIInfoPopupComponent.cardTitleStyle}
          titleColor="#fff"
        />
        <CardText>
          <ScenarioDescriptionComponent
            abstract={this.props.currentScenario.abstract}
            showDescription={this.state.showDescription}
            toggleDescription={this.toggleDescription}
          />
        </CardText>
        <CardActions style={POIInfoPopupComponent.actionWrapperStyle}>
          <FlatButton
            primary
            label="See data"
            onClick={this.props.activeDataForCurrentScenario}
          />
        </CardActions>
      </Card>
    )
  }
}

export default POIInfoPopupComponent
