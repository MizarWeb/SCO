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
import { userSelectors } from '../../clients/UserClient'
import HelpPageContainer from './HelpPageContainer'
import TemporalFormContainer from './TemporalFormContainer'
import ClimateChangeListContainer from './ClimateChangeListContainer'
import SearchResultsContainer from './SearchResultsContainer'

/**
 *
 * @author Léo Mieulet
 */
export class PageContainer extends React.Component {
  static propTypes = {
    currentPage: PropTypes.oneOf(PAGE_ENUM_VALUES),
  }
  static mapStateToProps = (state, ownProps) => ({
    currentPage: userSelectors.getCurrentPage(state),
  })
  static mapDispatchToProps = dispatch => ({
  })

  render() {
    const { currentPage } = this.props
    switch (currentPage) {
      case PAGE_ENUM.NONE:
        return null
      case PAGE_ENUM.HELP:
        return (
          <HelpPageContainer />
        )
      case PAGE_ENUM.TEMPORAL_FORM:
        return (
          <TemporalFormContainer />
        )
      case PAGE_ENUM.LIST_CLIMATE_CHANGES:
        return (
          <ClimateChangeListContainer />
        )
      case PAGE_ENUM.SEARCH_RESULTS:
        return (
          <SearchResultsContainer />
        )

      default:
        throw new Error(`Unexpected state ${currentPage}`)
    }
  }
}

export default connect(PageContainer.mapStateToProps, PageContainer.mapDispatchToProps)(PageContainer)

