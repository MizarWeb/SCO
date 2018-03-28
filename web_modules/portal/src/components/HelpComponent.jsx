/**
 * Copyright 2018 SCO - Space Climate Observatory
 *
 * This file is part of CSO.
 *
 * CSO is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * CSO is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with CSO. If not, see <http://www.gnu.org/licenses/>.
 **/
import Paper from 'material-ui/Paper'
import IconButton from 'material-ui/IconButton'
import InfoIcon from 'material-ui/svg-icons/action/info'


const MENU_ENUM = {
  CLOSE: 'CLOSE',
  OPEN: 'OPEN',
}

/**
 * Help component
 * Clicking on it display the help view
 * @author Léo Mieulet
 */
export class HelpComponent extends React.Component {
  static propTypes = {
  }

  static helpWrapperStyle = {
    position: 'absolute',
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    // desactive event listener
    pointerEvents: 'none',
  }
  static someStyle = {

    // reactive event listener
    pointerEvents: 'auto',
  }

  static DEFAULT_STATE = {
    menu: MENU_ENUM.CLOSE,
  }

  state = HelpComponent.DEFAULT_STATE

  /**
   * On input change
   */
  handleChange = () => {
    // TODO
  }


  render() {
    return (
      <div
        style={HelpComponent.helpWrapperStyle}
      >
        <Paper
          zDepth={3}
          rounded={false}
          onClick={this.handleChange}
          style={HelpComponent.someStyle}
        >
          <IconButton>
            <InfoIcon />
          </IconButton>
        </Paper >
      </div >
    )
  }
}

export default HelpComponent
