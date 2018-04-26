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
import { Card, CardText } from 'material-ui/Card'
import IconButton from 'material-ui/IconButton'
import Cancel from 'material-ui/svg-icons/navigation/close'
import Layers from 'material-ui/svg-icons/maps/layers'
import TemporalMonitorContainer from '../../containers/common/TemporalMonitorContainer'


/**
 * Interesting point info popup component
 * Display information about one interesting point of the map
 * @author Léo Mieulet
 */
export class InterestingPointPopupComponent extends React.Component {
  static propTypes = {
    currentScenario: Shapes.Scenario,
    openLayerManager: PropTypes.func.isRequired,
    quitScenario: PropTypes.func.isRequired,
  }
  static cardStyle = {
    zIndex: 2,
    top: '15px',
    position: 'absolute',
    left: 0,
  }
  static cardHeaderActionsStyle = {
    display: 'flex',
    justifyContent: 'flex-end',
  }
  static cardHeaderWrapperStyle = {
    display: 'flex',
    justifyContent: 'space-between',
  }

  static iconStyle = {
    height: '20px',
    width: '20px',
  }

  static buttonStyle = {
    height: '40px',
    width: '40px',
  }

  state = {
    showDescription: false,
  }

  toggleDescription = () => {
    const { showDescription } = this.state
    this.setState({
      showDescription: !showDescription,
    })
  }

  render() {
    return (
      <Card
        onClick={this.handleChange}
        className="col-sm-20 hidden-xs"
        style={InterestingPointPopupComponent.cardStyle}
      >
        <div style={InterestingPointPopupComponent.cardHeaderWrapperStyle}>
          <CardTitle title={this.props.currentScenario.title} subtitle="Country: china" />

          <div style={InterestingPointPopupComponent.cardHeaderActionsStyle}>
            <IconButton
              style={InterestingPointPopupComponent.buttonStyle}
              iconStyle={InterestingPointPopupComponent.iconStyle}
              onClick={this.props.openLayerManager}
              title="Layer manager"
            >
              <Layers />
            </IconButton>
            <IconButton
              style={InterestingPointPopupComponent.buttonStyle}
              iconStyle={InterestingPointPopupComponent.iconStyle}
              onClick={this.props.quitScenario}
              title="Quit scenario"
            >
              <Cancel />
            </IconButton>
          </div>
        </div>
        <CardText>
          {this.state.showDescription ?
            (
              <div>
                Description: <br />
                <div dangerouslySetInnerHTML={{ __html: this.props.currentScenario.abstract }} />
                <a onClick={this.toggleDescription}>Hide description</a>
              </div>
            ) : (<a onClick={this.toggleDescription}>Show description</a>)
          }

        </CardText>
        <TemporalMonitorContainer />
      </Card>
    )
  }
}

export default InterestingPointPopupComponent
