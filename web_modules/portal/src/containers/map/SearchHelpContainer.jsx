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
import SearchHelpComponent from '../../components/map/SearchHelpComponent'
import { uiActions, uiSelectors } from '../../clients/UIClient'

/**
 * @author Léo Mieulet
 */
export class SearchHelpContainer extends React.Component {
  static propTypes = {
    openResearch: PropTypes.func.isRequired,
    openHelp: PropTypes.func.isRequired,
    searchQuery: PropTypes.string.isRequired,
  }
  static mapStateToProps = (state, ownProps) => ({
    searchQuery: uiSelectors.getSearchQuery(state),
  })
  static mapDispatchToProps = dispatch => ({
    openResearch: searchWord => dispatch(uiActions.openResearch(searchWord)),
    openHelp: () => dispatch(uiActions.toggleHelp(true)),
  })

  render() {
    return (
      <SearchHelpComponent
        openResearch={this.props.openResearch}
        openHelp={this.props.openHelp}
        searchQuery={this.props.searchQuery}
      />
    )
  }
}

export default connect(SearchHelpContainer.mapStateToProps, SearchHelpContainer.mapDispatchToProps)(SearchHelpContainer)
