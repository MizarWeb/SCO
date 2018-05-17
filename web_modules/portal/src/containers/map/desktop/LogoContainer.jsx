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
import LogoComponent from '../../../components/map/desktop/LogoComponent'
import { uiActions, uiSelectors } from '../../../clients/UIClient'

/**
 * @author Léo Mieulet
 */
export class LogoContainer extends React.Component {
  static propTypes = {
    toggleScenarioList: PropTypes.func.isRequired,
    currentPage: PropTypes.oneOf(PAGE_ENUM_VALUES),
  }
  static mapStateToProps = (state, ownProps) => ({
    currentPage: uiSelectors.getCurrentPage(state),
  })
  static mapDispatchToProps = dispatch => ({
    toggleScenarioList: isOpen => dispatch(uiActions.toggleScenarioList(isOpen)),
  })

  toggleScenarioList = () => {
    this.props.toggleScenarioList(this.props.currentPage !== PAGE_ENUM.LIST_SCENARIO)
  }

  render() {
    return (
      <LogoComponent
        isOpen={this.props.currentPage === PAGE_ENUM.LIST_SCENARIO}
        toggleScenarioList={this.toggleScenarioList}
      />
    )
  }
}

export default connect(LogoContainer.mapStateToProps, LogoContainer.mapDispatchToProps)(LogoContainer)
