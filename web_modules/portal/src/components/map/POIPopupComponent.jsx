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
import { CardTitle } from '@sco/components'
import { Card, CardActions, CardText } from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'


/**
 * Interesting point info popup component
 * Display information about one interesting point of the map
 * @author Léo Mieulet
 */
export class InterestingPointPopupComponent extends React.Component {
  static propTypes = {
    currentScenario: Shapes.Scenario,
  }

  static helpWrapperStyle = {
    position: 'absolute',
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    // desactive event listener
    pointerEvents: 'none',
  }
  static cardStyle = {
    opacity: '0.88',
    // reactive event listener
    pointerEvents: 'auto',
  }
  static actionWrapperStyle = {
    display: 'flex',
    justifyContent: 'center',
  }

  render() {
    return (
      <div
        style={InterestingPointPopupComponent.helpWrapperStyle}
      >
        <Card
          onClick={this.handleChange}
          className="col-sm-20"
          style={InterestingPointPopupComponent.cardStyle}
        >
          <CardTitle title={this.props.currentScenario.title} subtitle="Country: china" />
          <CardText>
            Description: <br />
            Level water evolution
          </CardText>
          <CardActions style={InterestingPointPopupComponent.actionWrapperStyle}>
            <FlatButton primary label="See data" />
          </CardActions>
        </Card>
        {/* Add 2 empty blocks to let Flex do its magic */}
        <div />
        <div />
      </div >
    )
  }
}

export default InterestingPointPopupComponent
