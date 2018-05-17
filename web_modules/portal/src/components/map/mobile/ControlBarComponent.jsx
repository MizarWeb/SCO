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
          <div>
            <div
              className="col-xs-15"
            />
            <div
              className="col-xs-85"
            >
              <ScenarioSliderContainer />
              <TemporalMonitorContainer
                displaySeparator={false}
              />
            </div>
          </div>
        </div>
      </Paper>
    )
  }
}

export default ControlBarComponent
