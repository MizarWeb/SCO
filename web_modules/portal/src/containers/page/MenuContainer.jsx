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
import { connect } from 'react-redux'
import { uiActions } from '../../clients/UIClient'
import MenuComponent from '../../components/page/MenuComponent'
/**
 *
 * @author Léo Mieulet
 */
export class MenuContainer extends React.Component {
  static propTypes = {
    closeMenu: PropTypes.func.isRequired,
    mounted: PropTypes.bool.isRequired,
    showScenarioList: PropTypes.func.isRequired,
    showSearchForm: PropTypes.func.isRequired,
    showHelp: PropTypes.func.isRequired,
  }
  static mapStateToProps = (state, ownProps) => ({
  })
  static mapDispatchToProps = dispatch => ({
    closeMenu: () => dispatch(uiActions.toggleMenu(false)),
    showHelp: () => dispatch(uiActions.toggleHelp(true)),
    showSearchForm: () => dispatch(uiActions.openResearch('')),
    showScenarioList: () => dispatch(uiActions.toggleScenarioList(true)),
  })

  render() {
    return (
      <MenuComponent
        closeMenu={this.props.closeMenu}
        mounted={this.props.mounted}
        showScenarioList={this.props.showScenarioList}
        showSearchForm={this.props.showSearchForm}
        showHelp={this.props.showHelp}
      />
    )
  }
}

export default connect(MenuContainer.mapStateToProps, MenuContainer.mapDispatchToProps)(MenuContainer)

