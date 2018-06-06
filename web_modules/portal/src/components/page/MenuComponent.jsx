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
import { CardTitle, Modal } from '@sco/components'
import { List, ListItem } from 'material-ui/List'
import Help from 'material-ui/svg-icons/communication/live-help'
import Search from 'material-ui/svg-icons/action/search'
import ViewListIcon from 'material-ui/svg-icons/action/view-list'
import { LOCALES_ENUM, LOCALES_ENUM_VALUES } from '@sco/domain'
import Avatar from 'material-ui/Avatar'
import frFlag from '../../img/fr_flag.png'
import enFlag from '../../img/gb_flag.png'

/**
 * Display the app menu (only mobile for now)
 * @author Léo Mieulet
 */
export class MenuComponent extends React.Component {
  static propTypes = {
    currentLocale: PropTypes.oneOf(LOCALES_ENUM_VALUES),
    closeMenu: PropTypes.func.isRequired,
    mounted: PropTypes.bool.isRequired,
    showScenarioList: PropTypes.func.isRequired,
    showSearchForm: PropTypes.func.isRequired,
    showHelp: PropTypes.func.isRequired,
    toggleLocale: PropTypes.func.isRequired,
  }
  static contextTypes = {
    intl: PropTypes.object,
  }
  static actionWrapperStyle = {
    display: 'flex',
    justifyContent: 'center',
  }
  static flagStyle = {
    backgroundColor: 'transparent',
    borderRadius: '0',
  }

  static iconColor = '#312783'

  getIcon = () => {
    if (this.props.currentLocale === LOCALES_ENUM.EN) {
      return (<Avatar src={enFlag} style={MenuComponent.flagStyle} />)
    }
    return (<Avatar src={frFlag} style={MenuComponent.flagStyle} />)
  }

  render() {
    return (
      <Modal
        title={
          <CardTitle
            title={this.context.intl.formatMessage({ id: 'page.menu.title' })}
          />
        }
        onClose={this.props.closeMenu}
        mounted={this.props.mounted}
        hasSubtitle={false}
      >
        <div>
          <List>
            <ListItem
              primaryText={this.context.intl.formatMessage({ id: 'page.menu.scenario-list' })}
              leftIcon={<ViewListIcon color={MenuComponent.iconColor} />}
              onClick={this.props.showScenarioList}
            />
            <ListItem
              primaryText={this.context.intl.formatMessage({ id: 'page.menu.search' })}
              leftIcon={<Search color={MenuComponent.iconColor} />}
              onClick={this.props.showSearchForm}
            />
            <ListItem
              primaryText={this.context.intl.formatMessage({ id: 'page.menu.locale' })}
              leftAvatar={this.getIcon()}
              onClick={this.props.toggleLocale}
            />
            <ListItem
              primaryText={this.context.intl.formatMessage({ id: 'page.menu.about' })}
              leftIcon={<Help color={MenuComponent.iconColor} />}
              onClick={this.props.showHelp}
            />
          </List>
        </div>
      </Modal>
    )
  }
}

export default MenuComponent
