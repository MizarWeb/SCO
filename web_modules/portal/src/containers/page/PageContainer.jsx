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
import { uiSelectors } from '../../clients/UIClient'
import HelpPageContainer from './HelpPageContainer'
import TemporalFormContainer from './TemporalFormContainer'
import SearchResultsContainer from './SearchResultsContainer'
import ClimateChangeScenarioListContainer from './ClimateChangeScenarioListContainer'

/**
 *
 * @author Léo Mieulet
 */
export class PageContainer extends React.Component {
  static propTypes = {
    currentPage: PropTypes.oneOf(PAGE_ENUM_VALUES),
  }
  static mapStateToProps = (state, ownProps) => ({
    currentPage: uiSelectors.getCurrentPage(state),
  })
  static mapDispatchToProps = dispatch => ({
  })

  render() {
    const { currentPage } = this.props
    return (
      <div>
        <HelpPageContainer
          mounted={currentPage === PAGE_ENUM.HELP}
        />
        <TemporalFormContainer
          mounted={currentPage === PAGE_ENUM.TEMPORAL_FORM}
        />
        <SearchResultsContainer
          mounted={currentPage === PAGE_ENUM.SEARCH_RESULTS}
        />
        <ClimateChangeScenarioListContainer
          mounted={currentPage === PAGE_ENUM.LIST_SCENARIO}
        />
      </div>
    )
  }
}

export default connect(PageContainer.mapStateToProps, PageContainer.mapDispatchToProps)(PageContainer)

