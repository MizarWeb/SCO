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
import { Card, CardText } from 'material-ui/Card'
import IconButton from 'material-ui/IconButton'
import Cancel from 'material-ui/svg-icons/navigation/close'
import Layers from 'material-ui/svg-icons/maps/layers'
import TemporalMonitorContainer from '../../containers/common/TemporalMonitorContainer'
import ScenarioDescriptionComponent from '../common/ScenarioDescriptionComponent'

/**
 * Interesting point info popup component
 * Display information about one interesting point of the map
 * @author Léo Mieulet
 */
export class POIPopupComponent extends React.Component {
  static propTypes = {
    currentScenario: Shapes.Scenario,
    thematicList: Shapes.ThematicList,
    openLayerManager: PropTypes.func.isRequired,
    quitScenario: PropTypes.func.isRequired,
  }
  static cardStyle = {
    zIndex: 3,
    top: '15px',
    position: 'absolute',
    left: 0,
    padding: 0,
  }
  static cardHeaderActionsStyle = {
    display: 'flex',
    justifyContent: 'flex-end',
  }
  static cardHeaderWrapperStyle = {
    display: 'flex',
    justifyContent: 'space-between',
  }
  static cardTitleStyle = {
    paddingBottom: '8px',
    paddingRight: '0px',
    wordBreak: 'break-word',
  }
  static cardTextStyle = {
    paddingTop: '8px',
  }

  static iconStyle = {
    height: '20px',
    width: '20px',
    color: '#fff',
  }

  static buttonStyle = {
    height: '44px',
    width: '44px',
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
    const cardHeaderWrapperStyle = {
      ...POIPopupComponent.cardHeaderWrapperStyle,
      backgroundColor: thematicColor,
    }
    return (
      <Card
        onClick={this.handleChange}
        className="col-sm-30 col-md-25 col-lg-22 hidden-xs"
        style={POIPopupComponent.cardStyle}
      >
        <div style={cardHeaderWrapperStyle}>
          <CardTitle
            title={this.props.currentScenario.title}
            backgroundColor={thematicColor}
            cardStyle={POIPopupComponent.cardTitleStyle}
            titleColor="#fff"
          />
          <div style={POIPopupComponent.cardHeaderActionsStyle}>
            <IconButton
              style={POIPopupComponent.buttonStyle}
              iconStyle={POIPopupComponent.iconStyle}
              onClick={this.props.openLayerManager}
              title="Layer manager"
            >
              <Layers />
            </IconButton>
            <IconButton
              style={POIPopupComponent.buttonStyle}
              iconStyle={POIPopupComponent.iconStyle}
              onClick={this.props.quitScenario}
              title="Quit scenario"
            >
              <Cancel />
            </IconButton>
          </div>
        </div>
        <CardText
          style={POIPopupComponent.cardTextStyle}
        >
          <ScenarioDescriptionComponent
            abstract={this.props.currentScenario.abstract}
            showDescription={this.state.showDescription}
            toggleDescription={this.toggleDescription}
          />
        </CardText>
        <TemporalMonitorContainer />
      </Card>
    )
  }
}

export default POIPopupComponent
