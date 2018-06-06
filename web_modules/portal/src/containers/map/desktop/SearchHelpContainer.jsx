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
import { LOCALES_ENUM_VALUES } from '@sco/domain'
import SearchHelpComponent from '../../../components/map/desktop/SearchHelpComponent'
import { uiActions, uiSelectors } from '../../../clients/UIClient'

/**
 * @author Léo Mieulet
 */
export class SearchHelpContainer extends React.Component {
  static propTypes = {
    currentLocale: PropTypes.oneOf(LOCALES_ENUM_VALUES),
    searchQuery: PropTypes.string,

    openResearch: PropTypes.func.isRequired,
    openHelp: PropTypes.func.isRequired,
    toggleLocale: PropTypes.func.isRequired,
  }
  static mapStateToProps = (state, ownProps) => ({
    searchQuery: uiSelectors.getSearchQuery(state),
    currentLocale: uiSelectors.getCurrentLocale(state),
  })
  static mapDispatchToProps = dispatch => ({
    openResearch: searchWord => dispatch(uiActions.openResearch(searchWord)),
    openHelp: () => dispatch(uiActions.toggleHelp(true)),
    toggleLocale: () => dispatch(uiActions.toggleLocale()),
  })

  render() {
    return (
      <SearchHelpComponent
        currentLocale={this.props.currentLocale}
        searchQuery={this.props.searchQuery}
        openResearch={this.props.openResearch}
        openHelp={this.props.openHelp}
        toggleLocale={this.props.toggleLocale}
      />
    )
  }
}

export default connect(SearchHelpContainer.mapStateToProps, SearchHelpContainer.mapDispatchToProps)(SearchHelpContainer)
