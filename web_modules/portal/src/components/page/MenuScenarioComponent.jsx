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

/**
 * Display the app menu (only mobile for now)
 * @author Léo Mieulet
 */
export class MenuComponent extends React.Component {
  static propTypes = {
    closeMenu: PropTypes.func.isRequired,
    mounted: PropTypes.bool.isRequired,
    openLayerManager: PropTypes.func.isRequired,
    closeCurrentScenario: PropTypes.func.isRequired,
  }
  static actionWrapperStyle = {
    display: 'flex',
    justifyContent: 'center',
  }

  static iconColor = '#312783'

  render() {
    return (
      <Modal
        title={
          <CardTitle
            title="Scenario menu"
          />
        }
        onClose={this.props.closeMenu}
        mounted={this.props.mounted}
      >
        <div>
          <List>
            <ListItem
              primaryText="Manage layers"
              leftIcon={<Search color={MenuComponent.iconColor} />}
              onClick={this.props.openLayerManager}
            />
            <ListItem
              primaryText="Quit scenario"
              leftIcon={<Help color={MenuComponent.iconColor} />}
              onClick={this.props.closeCurrentScenario}
            />
          </List>
        </div>
      </Modal>
    )
  }
}

export default MenuComponent
