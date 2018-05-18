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
import IconButton from 'material-ui/IconButton'
import ForwardIcon from 'material-ui/svg-icons/av/fast-forward'
import LessIcon from 'material-ui/svg-icons/navigation/expand-less'
import MoreIcon from 'material-ui/svg-icons/navigation/expand-more'
import RewindIcon from 'material-ui/svg-icons/av/fast-rewind'
import TimerSand from 'mdi-material-ui/TimerSandEmpty'
import SettingsIcon from 'material-ui/svg-icons/action/settings'
import PlayIcon from 'material-ui/svg-icons/av/play-circle-outline'
import PauseIcon from 'material-ui/svg-icons/av/pause-circle-outline'
import Chart from 'mdi-material-ui/ChartAreaspline'
import Satellite from 'mdi-material-ui/Satellite'
import CancelIcon from 'material-ui/svg-icons/navigation/close'
import LayersIcon from 'material-ui/svg-icons/maps/layers'
import TemporalMonitorContainer from '../../../containers/common/TemporalMonitorContainer'
import ScenarioSliderContainer from '../../../containers/common/ScenarioSliderContainer'

/**
 * Contains the slider and the temporal component of the current scenario
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
  static bodyStyle = {
    // reactive event listener
    pointerEvents: 'auto',
  }
  static propTypes = {
  }
  render() {
    return (
      <Paper
        style={ControlBarComponent.wrapperStyle}
        zDepth={3}
        className="visible-xs"
        rounded
      >
        <div
          style={ControlBarComponent.bodyStyle}
        >
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
          >
            <IconButton
              style={ControlBarComponent.buttonStyle}
              iconStyle={ControlBarComponent.iconStyle}
            >
              <CancelIcon />
            </IconButton>
            <IconButton
              style={ControlBarComponent.buttonStyle}
              iconStyle={ControlBarComponent.iconStyle}
            >
              <Chart />
            </IconButton>
            <IconButton
              style={ControlBarComponent.buttonStyle}
              iconStyle={ControlBarComponent.iconStyle}
            >
              <Satellite />
            </IconButton>
            <IconButton
              style={ControlBarComponent.buttonStyle}
              iconStyle={ControlBarComponent.iconStyle}
            >
              <LayersIcon />
            </IconButton>
            <IconButton
              style={ControlBarComponent.buttonStyle}
              iconStyle={ControlBarComponent.iconStyle}
            >
              <MoreIcon />
            </IconButton>
          </div>
          <div
            className="col-xs-90 col-xs-offset-5"
          >
            <ScenarioSliderContainer />
            <TemporalMonitorContainer
              displaySeparator
            />
          </div>
        </div>
      </Paper>
    )
  }
}

export default ControlBarComponent
