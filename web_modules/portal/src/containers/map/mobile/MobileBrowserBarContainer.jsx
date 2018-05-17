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
import { PAGE_ENUM, MAP_ENUM_VALUES, PAGE_ENUM_VALUES, Shapes } from '@sco/domain'
import MobileBrowserBarComponent from '../../../components/map/mobile/MobileBrowserBarComponent'
import { uiActions, uiSelectors } from '../../../clients/UIClient'
import { mapSelectors, mapActions } from '../../../clients/MapClient'
/**
 * @author Léo Mieulet
 */
export class MobileBrowserBarContainer extends React.Component {
  static propTypes = {
    toggleMenu: PropTypes.func.isRequired,
    activeDataForCurrentScenario: PropTypes.func.isRequired,
    openLayerManager: PropTypes.func.isRequired,
    currentPage: PropTypes.oneOf(PAGE_ENUM_VALUES),
    currentView: PropTypes.oneOf(MAP_ENUM_VALUES),
    currentScenario: Shapes.Scenario,
    showScenarioMenu: PropTypes.func.isRequired,
  }
  static mapStateToProps = (state, ownProps) => ({
    currentPage: uiSelectors.getCurrentPage(state),
    currentScenario: mapSelectors.getCurrentScenario(state),
    currentView: mapSelectors.getCurrentView(state),
  })
  static mapDispatchToProps = dispatch => ({
    toggleMenu: isOpen => dispatch(uiActions.toggleMenu(isOpen)),
    showScenarioMenu: () => dispatch(uiActions.toggleScenarioMenu(true)),
    activeDataForCurrentScenario: () => dispatch(mapActions.activeDataForCurrentScenario()),
    openLayerManager: () => dispatch(uiActions.toggleLayerManager(true)),
  })

  toggleMenu = () => {
    this.props.toggleMenu(this.props.currentPage !== PAGE_ENUM.MENU)
  }

  render() {
    return (
      <MobileBrowserBarComponent
        isOpen={this.props.currentPage === PAGE_ENUM.LIST_SCENARIO}
        toggleMenu={this.toggleMenu}
        showScenarioMenu={this.props.showScenarioMenu}
        activeDataForCurrentScenario={this.props.activeDataForCurrentScenario}
        openLayerManager={this.props.openLayerManager}
        currentScenario={this.props.currentScenario}
        currentView={this.props.currentView}
      />
    )
  }
}

export default connect(MobileBrowserBarContainer.mapStateToProps, MobileBrowserBarContainer.mapDispatchToProps)(MobileBrowserBarContainer)
