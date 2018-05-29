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
import IconButton from 'material-ui/IconButton'
import ForwardIcon from 'material-ui/svg-icons/av/fast-forward'
import RewindIcon from 'material-ui/svg-icons/av/fast-rewind'
import TimerSand from 'mdi-material-ui/TimerSandEmpty'
import SettingsIcon from 'material-ui/svg-icons/action/settings'
import PlayIcon from 'material-ui/svg-icons/av/play-circle-outline'
import PauseIcon from 'material-ui/svg-icons/av/pause-circle-outline'
import Divider from 'material-ui/Divider'
import Slider from 'material-ui/Slider'
import { Shapes, TEMPORAL_STEP_ENUM, TEMPORAL_TYPE_ENUM } from '@sco/domain'

/**
 * Allows user to monitor temporal
 * @author Léo Mieulet
 */
export class TemporalMonitorComponent extends React.Component {
  static propTypes = {
    displaySeparator: PropTypes.bool.isRequired,
    openTemporalFilter: PropTypes.func.isRequired,
    travelThroughTime: PropTypes.func.isRequired,
    layerTemporalInfos: Shapes.LayerTemporalInfos,
    loadingLayers: PropTypes.bool.isRequired,
  }

  static iconStyle = {
    height: '24px',
    width: '24px',
  }
  static iconOptionStyle = {
    ...TemporalMonitorComponent.iconStyle,
    alignSelf: 'flex-end',
  }

  static buttonStyle = {
    height: '48px',
    width: '48px',
  }
  static dividerWrapperStyle = {
    display: 'flex',
    alignItems: 'center',
    margin: '0 15px',
  }
  static iconTemporalColor = 'rgb(224, 224, 224)'

  static dividerStyle = {
    flexGrow: 1,
  }
  static playerWrapperStyle = {
    display: 'flex',
    justifyContent: 'space-between',
  }
  static sliderStyle = {
    margin: '0px 4px',
  }
  static sliderRootStyle = {
    margin: '0px 7px 0 2px',
  }
  static sliderWrapperStyle = {
    margin: '0 10px',
  }
  static sliderAnotherWrapperStyle = {
    margin: '0 10px',
  }
  static sliderLegendStyle = {
    fontSize: '0.8em',
    color: '#00AAFF',
    display: 'flex',
    justifyContent: 'space-between',
    fontStyle: 'italic',
  }
  static dateStyle = {
    fontSize: '0.8em',
    fontWeight: 300,
    fontStyle: 'italic',
  }
  static emptyFlexSlotStyle = {
    width: '48px',
  }

  static currentDateWrapper = {
    display: 'flex',
    margin: '6px 20px 0',
  }
  static currentDateStyle = {
    fontSize: '0.9em',
    fontWeight: 500,
  }

  state = {
    isPlaying: false,
  }

  /**
   * On mount, create a timer used by the "player" widget
   */
  componentDidMount() {
    this.timer = setInterval(this.timerHandler, 3000)
  }
  /**
   * On unmount, remove the timer
   */
  componentWillUnmount() {
    clearInterval(this.timer)
  }

  getPlayPauseIcon = () => {
    if (this.state.isPlaying) {
      return (<PauseIcon />)
    }
    return (<PlayIcon />)
  }

  getSliderProgress = () => {
    if (this.props.layerTemporalInfos.currentStep !== 0 && this.props.layerTemporalInfos.nbStep !== 0) {
      return Math.round(this.props.layerTemporalInfos.currentStep / this.props.layerTemporalInfos.nbStep * 1000) / 1000
    }
    return 0
  }

  getSpaceBeforeDateValue = () => ({
    flexGrow: this.getSliderProgress() * 100,
  })

  getSpaceAfterDateValue = () => ({
    flexGrow: 100 - (this.getSliderProgress() * 100),
  })

  getCurrentDateOptions = () => {
    const options = {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour12: false,
    }
    if (this.props.layerTemporalInfos.step === TEMPORAL_STEP_ENUM.SIX_HOURS) {
      options.hour = 'numeric'
    }
    return options
  }

  /**
   * Return the HMI Separator if the props displaySeparator allows it
   */
  getSeparator = () => {
    if (this.props.displaySeparator) {
      return (
        <div style={TemporalMonitorComponent.dividerWrapperStyle}>
          <Divider style={TemporalMonitorComponent.dividerStyle} />
          <TimerSand color={TemporalMonitorComponent.iconTemporalColor} />
          <Divider style={TemporalMonitorComponent.dividerStyle} />
        </div>
      )
    }
    return null
  }


  handleBack = () => {
    this.props.travelThroughTime(false)
    this.setState({
      isPlaying: false,
    })
  }

  handleNext = () => {
    this.props.travelThroughTime(true)
    this.setState({
      isPlaying: false,
    })
  }

  /**
   * Receive timer events
   * Increate the time if that's possible
   * Can stop the timer if it detects it has reach the end
   */
  timerHandler = () => {
    if (this.state.isPlaying && !this.props.loadingLayers) {
      if (this.props.layerTemporalInfos.currentStep >= this.props.layerTemporalInfos.nbStep) {
        // Stop the timer, end reached
        this.setState({
          isPlaying: false,
        })
      } else {
        // Show the next date
        this.props.travelThroughTime(true)
      }
    }
  }

  togglePlayPause = () => {
    const { isPlaying } = this.state
    this.setState({
      isPlaying: !isPlaying,
    })
  }
  render() {
    return (
      <div>
        {this.getSeparator()}
        <div style={TemporalMonitorComponent.playerWrapperStyle}>
          <div style={TemporalMonitorComponent.emptyFlexSlotStyle} />
          <div>
            <IconButton
              style={TemporalMonitorComponent.buttonStyle}
              iconStyle={TemporalMonitorComponent.iconStyle}
              onClick={this.handleBack}
              disabled={this.props.layerTemporalInfos.currentStep <= 0}
            >
              <RewindIcon />
            </IconButton>
            <IconButton
              style={TemporalMonitorComponent.buttonStyle}
              iconStyle={TemporalMonitorComponent.iconStyle}
              onClick={this.togglePlayPause}
            >
              {this.getPlayPauseIcon()}
            </IconButton>
            <IconButton
              style={TemporalMonitorComponent.buttonStyle}
              iconStyle={TemporalMonitorComponent.iconStyle}
              onClick={this.handleNext}
              disabled={this.props.layerTemporalInfos.currentStep >= this.props.layerTemporalInfos.nbStep}
            >
              <ForwardIcon />
            </IconButton>
          </div>
          <div>
            {this.props.layerTemporalInfos.type === TEMPORAL_TYPE_ENUM.PERIOD ? (
              <IconButton
                style={TemporalMonitorComponent.buttonStyle}
                iconStyle={TemporalMonitorComponent.iconOptionStyle}
                onClick={this.props.openTemporalFilter}
              >
                <SettingsIcon />
              </IconButton>
            ) : (<div style={TemporalMonitorComponent.emptyFlexSlotStyle} />)
            }
          </div>
        </div>
        <div style={TemporalMonitorComponent.sliderWrapperStyle}>
          <div style={TemporalMonitorComponent.sliderLegendStyle}>
            <span>{this.props.layerTemporalInfos.beginDate.toLocaleDateString('en-US')}</span>
            <span>{this.props.layerTemporalInfos.endDate.toLocaleDateString('en-US')}</span>
          </div>
          <div style={TemporalMonitorComponent.sliderAnotherWrapperStyle}>
            <Slider
              disabled
              step={1}
              max={this.props.layerTemporalInfos.nbStep}
              value={this.props.layerTemporalInfos.currentStep}
              sliderStyle={TemporalMonitorComponent.sliderStyle}
              style={TemporalMonitorComponent.sliderRootStyle}
            />
          </div>
        </div>
        <div style={TemporalMonitorComponent.currentDateWrapper}>
          <div style={this.getSpaceBeforeDateValue()} />
          <span style={TemporalMonitorComponent.currentDateStyle}>{new Intl.DateTimeFormat('en-US', this.getCurrentDateOptions()).format(this.props.layerTemporalInfos.currentDate)}</span>
          <div style={this.getSpaceAfterDateValue()} />

        </div>
      </div>
    )
  }
}


export default TemporalMonitorComponent