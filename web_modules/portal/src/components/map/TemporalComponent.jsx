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

/**
 * Temporal component
 * Allows the user to configure some time filters, or travel in the time if he has configured one
 * @author Léo Mieulet
 */
export class TemporalComponent extends React.Component {
  static propTypes = {
    openTemporalFilter: PropTypes.func.isRequired,
    travelThroughTime: PropTypes.func.isRequired,
  }

  static helpWrapperStyle = {
    position: 'absolute',
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    // desactive event listener
    pointerEvents: 'none',
  }

  static temporalWrapperStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    color: 'white',
    zIndex: 2,
  }

  static temporalButtonsWrapperStyle = {
    // reactive event listener
    pointerEvents: 'auto',
  }

  static iconStyle = {
    color: 'white',
    height: '40px',
    width: '40px',
  }

  static buttonStyle = {
    height: '80px',
    width: '80px',
  }

  static dateStyle = {
    fontWeight: '300',
    fontSize: '1.4em',
    userSelect: 'none',
  }

  handleBack = () => {
    this.props.travelThroughTime(false)
  }

  handleNext = () => {
    this.props.travelThroughTime(true)
  }


  render() {
    return (
      <div
        style={TemporalComponent.helpWrapperStyle}
      >
        <div
          style={TemporalComponent.temporalWrapperStyle}
          className="visible-xs-block"
        >
          <div style={TemporalComponent.dateStyle}>Date: 2018</div>
          <div
            style={TemporalComponent.temporalButtonsWrapperStyle}
          >
            <IconButton
              style={TemporalComponent.buttonStyle}
              iconStyle={TemporalComponent.iconStyle}
              onClick={this.handleBack}
            >
              <RewindIcon />
            </IconButton>
            <IconButton
              style={TemporalComponent.buttonStyle}
              iconStyle={TemporalComponent.iconStyle}
              onClick={this.props.openTemporalFilter}
            >
              <TimerSand />
            </IconButton>
            <IconButton
              style={TemporalComponent.buttonStyle}
              iconStyle={TemporalComponent.iconStyle}
              onClick={this.handleNext}
            >
              <ForwardIcon />
            </IconButton>
          </div >
        </div >
      </div >
    )
  }
}

export default TemporalComponent
