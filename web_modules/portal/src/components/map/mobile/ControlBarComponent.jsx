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
import isEmpty from 'lodash/isEmpty'
import Paper from 'material-ui/Paper'
import IconButton from 'material-ui/IconButton'
import MoreIcon from 'material-ui/svg-icons/navigation/expand-more'
import LessIcon from 'material-ui/svg-icons/navigation/expand-less'
import Copyright from 'material-ui/svg-icons/action/copyright'
import Chart from 'mdi-material-ui/ChartAreaspline'
import Satellite from 'mdi-material-ui/Satellite'
import CancelIcon from 'material-ui/svg-icons/navigation/close'
import LayersIcon from 'material-ui/svg-icons/maps/layers'
import { Shapes } from '@sco/domain'
import TemporalMonitorContainer from '../../../containers/common/TemporalMonitorContainer'
import ScenarioSliderContainer from '../../../containers/common/ScenarioSliderContainer'

/**
 * Contains the slider and the temporal component of the current scenario
 * Plus several icons providing several functionnalities
 * @author Léo Mieulet
 */
export class ControlBarComponent extends React.Component {
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
  static wrapperClosedStyle = {
    ...ControlBarComponent.wrapperStyle,
    width: 'auto',
    right: '0px',
    left: 'auto',
  }
  static bodyStyle = {
    // reactive event listener
    pointerEvents: 'auto',
  }
  static buttonWrapper = {
    display: 'flex',
    justifyContent: 'space-between',
  }
  static hiddenStyle = {
    display: 'none',
  }
  static copyrightWrapperStyle = {
    ...ControlBarComponent.wrapperClosedStyle,
    right: 'auto',
    left: '0px',
  }

  static propTypes = {
    openLayerManager: PropTypes.func.isRequired,
    openLegend: PropTypes.func.isRequired,
    openCopyright: PropTypes.func.isRequired,
    quitScenario: PropTypes.func.isRequired,
    openGraph: PropTypes.func.isRequired,
    currentScenario: Shapes.Scenario,
  }
  state = {
    open: true,
  }
  /**
   * Return the icon if the current scenario has a graph
   */
  getChartIcon = () => {
    const shouldDisplay = !isEmpty(this.props.currentScenario.graph)
    if (shouldDisplay) {
      return (
        <IconButton
          style={ControlBarComponent.buttonStyle}
          iconStyle={ControlBarComponent.iconStyle}
          onClick={this.props.openGraph}
        >
          <Chart />
        </IconButton>
      )
    }
    return null
  }
  /**
   * Return scenario specific functionnalities
   */
  getScenarioAdditionalFunc = () => (
    <div
      className="col-xs-90 col-xs-offset-5"
    >
      <ScenarioSliderContainer />
      <TemporalMonitorContainer
        displaySeparator
      />
    </div>
  )

  /**
   * Toggle control bar visibility
   */
  toggleControlBarVisibility = () => {
    this.setState({
      open: !this.state.open,
    })
  }
  render() {
    let content
    if (this.state.open) {
      content = (
        <div
          style={ControlBarComponent.bodyStyle}
        >
          <div style={ControlBarComponent.buttonWrapper}>
            <IconButton
              style={ControlBarComponent.buttonStyle}
              iconStyle={ControlBarComponent.iconStyle}
              onClick={this.props.quitScenario}
            >
              <CancelIcon />
            </IconButton>
            {this.getChartIcon()}

            <IconButton
              style={ControlBarComponent.buttonStyle}
              iconStyle={ControlBarComponent.iconStyle}
              onClick={this.props.openLegend}
            >
              <Satellite />
            </IconButton>
            <IconButton
              style={ControlBarComponent.buttonStyle}
              iconStyle={ControlBarComponent.iconStyle}
              onClick={this.props.openLayerManager}
            >
              <LayersIcon />
            </IconButton>
            <IconButton
              style={ControlBarComponent.buttonStyle}
              iconStyle={ControlBarComponent.iconStyle}
              onClick={this.toggleControlBarVisibility}
            >
              <MoreIcon />
            </IconButton>
          </div>
        </div>
      )
    } else {
      content = (
        <div
          style={ControlBarComponent.bodyStyle}
        >
          <IconButton
            style={ControlBarComponent.buttonStyle}
            iconStyle={ControlBarComponent.iconStyle}
            onClick={this.toggleControlBarVisibility}
          >
            <LessIcon />
          </IconButton>
        </div>
      )
    }
    return [
      <Paper
        style={this.state.open ? ControlBarComponent.wrapperStyle : ControlBarComponent.wrapperClosedStyle}
        zDepth={3}
        className="visible-xs"
        rounded={false}
        key="control-bar"
      >
        {content}
        <div style={this.state.open ? ControlBarComponent.bodyStyle : ControlBarComponent.hiddenStyle}>
          {this.getScenarioAdditionalFunc()}
        </div>
      </Paper>,
      !this.state.open ?
        <Paper
          style={ControlBarComponent.copyrightWrapperStyle}
          zDepth={3}
          className="visible-xs"
          rounded={false}
          key="copyright"
        >
          <div
            style={ControlBarComponent.bodyStyle}
          >
            <IconButton
              style={ControlBarComponent.buttonStyle}
              iconStyle={ControlBarComponent.iconStyle}
              onClick={this.props.openCopyright}
            >
              <Copyright />
            </IconButton>
          </div>
        </Paper> : null,
    ]
  }
}

export default ControlBarComponent
