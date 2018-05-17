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
import MenuIcon from 'material-ui/svg-icons/navigation/menu'
// Import logo
import logoPath from '../../../img/SCO_logo.png'

/**
 * Lgoo component - clicking on it show the list of climate changes categories
 * @author Léo Mieulet
 */
export class LogoComponent extends React.Component {
  static propTypes = {
    toggleScenarioList: PropTypes.func.isRequired,
    isOpen: PropTypes.bool.isRequired,
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
    zIndex: 2,
    // reactive event listener
    pointerEvents: 'auto',
  }
  static logoStyle = {
    height: '80px',
    userSelect: 'none',
  }


  /**
   * Return the icon depending of the property isOpen
   */
  getIcon = () => {
    if (this.props.isOpen) {
      return (<LessIcon />)
    }
    return (<MoreIcon />)
  }

  render() {
    return (
      <div
        style={LogoComponent.menuWrapperStyle}
      >
        <Paper
          style={LogoComponent.paperWrapperStyle}
          zDepth={3}
          rounded={false}
          onClick={this.props.toggleScenarioList}
          className="hidden-xs"
        >
          <IconButton>
            <MenuIcon />
          </IconButton>
          <img src={logoPath} alt="logo Space Climate Observatory" style={LogoComponent.logoStyle} />
          <IconButton>
            {this.getIcon()}
          </IconButton>
        </Paper >
      </div >
    )
  }
}

export default LogoComponent
