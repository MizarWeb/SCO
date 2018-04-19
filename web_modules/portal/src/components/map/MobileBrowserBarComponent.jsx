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
import isEqual from 'lodash/isEqual'
import IconButton from 'material-ui/IconButton'
import AppBar from 'material-ui/AppBar'
import MenuIcon from 'material-ui/svg-icons/navigation/menu'
import { Shapes, MAP_ENUM_VALUES, MAP_ENUM } from '@sco/domain'
import SettingsIcon from 'material-ui/svg-icons/action/settings-applications'
import PlayIcon from 'material-ui/svg-icons/image/slideshow'
import isEmpty from 'lodash/isEmpty'
// Import logo
import logoPath from '../../img/SCO_logo.png'


/**
 * This bar is only displayed on mobile and replace desktop utilities
 * @author Léo Mieulet
 */
export class MobileBrowserBarComponent extends React.Component {
  static propTypes = {
    toggleMenu: PropTypes.func.isRequired,
    activeDataForCurrentScenario: PropTypes.func.isRequired,
    currentScenario: Shapes.Scenario,
    currentView: PropTypes.oneOf(MAP_ENUM_VALUES),
    showScenarioMenu: PropTypes.func.isRequired,
  }

  static helpWrapperStyle = {
    position: 'absolute',
    width: '100%',
    height: '100%',
    // desactive event listener
    pointerEvents: 'none',
  }
  static appBarStyle = {
    zIndex: 2,
    borderWidth: '0 0 1px 0',
    borderColor: '#00AAFF',
    borderStyle: 'solid',
    // reactive event listener
    pointerEvents: 'auto',
  }
  static titleBarStyle = {
    display: 'flex',
  }
  static logoStyle = {
    height: '82px',
    userSelect: 'none',
  }
  static wrapperScenarioStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }
  static scenarioTitleStyle = {
    fontSize: '0.55em',
    wordWrap: 'break-word',
    whiteSpace: 'initial',
    marginRight: '15px',
    lineHeight: '1.7em',
  }
  static separatorStyle = {
    borderColor: '#312783',
    // borderLeft: '1px solid',
    margin: '12px 10px 12px 0px',
    borderWidth: '2px',
    borderStyle: 'solid',
    borderRadius: '2px',
  }

  static logo = (<img key="logo" src={logoPath} alt="logo Space Climate Observatory" style={MobileBrowserBarComponent.logoStyle} />)

  constructor(props) {
    super(props)
    this.state = {
      appTitle: [
        MobileBrowserBarComponent.logo,
      ],
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!isEqual(nextProps.currentScenario, this.props.currentScenario)
      || !isEqual(nextProps.currentView, this.props.currentView)) {
      const appTitle = [
        MobileBrowserBarComponent.logo,
      ]
      switch (nextProps.currentView) {
        case MAP_ENUM.INITIAL:
        case MAP_ENUM.SOON_INFO_SCENARIO:
        case MAP_ENUM.SOON_SHOWING_SCENARIO:
          break
        case MAP_ENUM.INFO_SCENARIO:
        case MAP_ENUM.SHOWING_SCENARIO:
          if (!isEmpty(nextProps.currentScenario)) {
            appTitle.push(this.renderSeparator())
            appTitle.push(this.renderScenarioTitle())
          }
          break
        default:
          throw new Error(`Unexpected state ${nextProps.currentView}`)
      }
      this.setState({
        appTitle,
      })
    }
  }

  getRightIcon = () => {
    switch (this.props.currentView) {
      case MAP_ENUM.INITIAL:
      case MAP_ENUM.SOON_INFO_SCENARIO:
      case MAP_ENUM.SOON_SHOWING_SCENARIO:
        break
      case MAP_ENUM.INFO_SCENARIO:
        return (
          <IconButton onClick={this.props.activeDataForCurrentScenario}>
            <PlayIcon />
          </IconButton>
        )
      case MAP_ENUM.SHOWING_SCENARIO:
        return (
          <IconButton onClick={this.props.showScenarioMenu}>
            <SettingsIcon />
          </IconButton>
        )
      default:
        throw new Error(`Unexpected state ${this.props.currentView}`)
    }
    return null
  }

  renderSeparator = () => (
    <div
      key="separator"
      style={MobileBrowserBarComponent.separatorStyle}
    />
  )
  renderScenarioTitle = () => (
    <div
      style={MobileBrowserBarComponent.wrapperScenarioStyle}
      key="scenario-manager"
    >
      <span
        style={MobileBrowserBarComponent.scenarioTitleStyle}
      >
        {this.props.currentScenario.title}
      </span>
    </div>
  )

  render() {
    const leftIcon = (
      <IconButton onClick={this.props.toggleMenu}>
        <MenuIcon />
      </IconButton>
    )
    return (
      <div
        style={MobileBrowserBarComponent.helpWrapperStyle}
      >
        <div className="visible-xs-block">
          <AppBar
            title={this.state.appTitle}
            titleStyle={MobileBrowserBarComponent.titleBarStyle}
            iconClassNameRight="muidocs-icon-navigation-expand-more"
            style={MobileBrowserBarComponent.appBarStyle}
            iconElementLeft={leftIcon}
            iconElementRight={this.getRightIcon()}
          />
        </div>
      </div >
    )
  }
}

export default MobileBrowserBarComponent
