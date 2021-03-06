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
import { PAGE_ENUM, PAGE_ENUM_VALUES } from '@sco/domain'
import MobileBrowserBarComponent from '../../../components/map/mobile/MobileBrowserBarComponent'
import { uiActions } from '../../../clients/UIClient'
import { mapSelectors } from '../../../clients/MapClient'
/**
 * @author Léo Mieulet
 */
export class MobileBrowserBarContainer extends React.Component {
  static propTypes = {
    toggleMenu: PropTypes.func.isRequired,
    currentPage: PropTypes.oneOf(PAGE_ENUM_VALUES),
  }
  static mapStateToProps = (state, ownProps) => ({
    currentScenario: mapSelectors.getCurrentScenario(state),
  })
  static mapDispatchToProps = dispatch => ({
    toggleMenu: isOpen => dispatch(uiActions.toggleMenu(isOpen)),
  })

  toggleMenu = () => {
    this.props.toggleMenu(this.props.currentPage !== PAGE_ENUM.MENU)
  }

  render() {
    return (
      <MobileBrowserBarComponent
        toggleMenu={this.toggleMenu}
      />
    )
  }
}

export default connect(MobileBrowserBarContainer.mapStateToProps, MobileBrowserBarContainer.mapDispatchToProps)(MobileBrowserBarContainer)
