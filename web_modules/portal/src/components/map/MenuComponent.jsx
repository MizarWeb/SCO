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
import LessIcon from 'material-ui/svg-icons/navigation/expand-less'
import MoreIcon from 'material-ui/svg-icons/navigation/expand-more'
// Import logo
import logoPath from '../../img/SCO_logo.jpg'

const MENU_ENUM = {
  CLOSE: 'CLOSE',
  OPEN: 'OPEN',
}


/**
 * Menu component - clicking on it show the list of climate changes categories
 * @author Léo Mieulet
 */
export class MenuComponent extends React.Component {
  static propTypes = {
    openMenu: PropTypes.func.isRequired,
  }
  static menuWrapperStyle = {
    display: 'flex',
    position: 'absolute',
    justifyContent: 'center',
    width: '100%',
    cursor: 'pointer',
    // desactive event listener
    pointerEvents: 'none',
  }
  static paperWrapperStyle = {
    display: 'flex',
    alignItems: 'center',
    // reactive event listener
    pointerEvents: 'auto',
  }
  static logoStyle = {
    height: '80px',
    userSelect: 'none',
  }
  static DEFAULT_STATE = {
    menu: MENU_ENUM.CLOSE,
  }


  state = MenuComponent.DEFAULT_STATE


  /**
   * Return the icon depending of the current state (already open ?)
   */
  getIcon = () => {
    if (this.state.menu === MENU_ENUM.CLOSE) {
      return (<MoreIcon />)
    }

    return (<LessIcon />)
  }

  /**
   * On input change
   */
  handleChange = () => {
    const { menu } = this.state
    this.setState({
      menu: menu === MENU_ENUM.CLOSE ? MENU_ENUM.OPEN : MENU_ENUM.CLOSE,
    })
    this.props.openMenu()
  }

  render() {
    return (
      <div
        style={MenuComponent.menuWrapperStyle}
      >
        <Paper
          style={MenuComponent.paperWrapperStyle}
          zDepth={3}
          rounded={false}
          onClick={this.handleChange}
        >
          <IconButton>
            {this.getIcon()}
          </IconButton>
          <img src={logoPath} alt="logo Space Climate Observatory" style={MenuComponent.logoStyle} />
          <IconButton>
            {this.getIcon()}
          </IconButton>
        </Paper >
      </div >
    )
  }
}

export default MenuComponent
