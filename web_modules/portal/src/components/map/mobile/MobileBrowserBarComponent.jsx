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
import Paper from 'material-ui/Paper'
import MenuIcon from 'material-ui/svg-icons/navigation/menu'
// Import logo
import logoPath from '../../../img/SCO_logo.png'


/**
 * This bar is only displayed on mobile and replace desktop utilities
 * @author Léo Mieulet
 */
export class MobileBrowserBarComponent extends React.Component {
  static propTypes = {
    toggleMenu: PropTypes.func.isRequired,
  }

  static barWrapperStyle = {
    position: 'absolute',
    width: '100%',
    height: '100%',
    // desactive event listener
    pointerEvents: 'none',
  }
  static logoStyle = {
    height: '82px',
    userSelect: 'none',
  }
  static paperStyle = {
    zIndex: 2,
    borderWidth: '0 0 1px 0',
    borderColor: '#00AAFF',
    borderStyle: 'solid',
    display: 'flex',
    alignItems: 'center',
    width: '165px',
    // reactive event listener
    pointerEvents: 'auto',
  }

  static logo = (<img
    key="logo"
    src={logoPath}
    alt="logo Space Climate Observatory"
    style={MobileBrowserBarComponent.logoStyle}
  />)

  render() {
    return (
      <div
        style={MobileBrowserBarComponent.barWrapperStyle}
        className="visible-xs"
      >
        <Paper
          zDepth={3}
          rounded={false}
          style={MobileBrowserBarComponent.paperStyle}
        >
          <IconButton onClick={this.props.toggleMenu}>
            <MenuIcon />
          </IconButton>
          {MobileBrowserBarComponent.logo}
        </Paper>
      </div >
    )
  }
}

export default MobileBrowserBarComponent
