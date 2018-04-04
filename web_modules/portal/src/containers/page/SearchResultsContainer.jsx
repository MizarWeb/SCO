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
import { Modal } from '@sco/components'
import { uiActions } from '../../clients/UIClient'
import SearchResultsComponent from '../../components/page/SearchResultsComponent'
/**
 *
 * @author Léo Mieulet
 */
export class SearchResultsContainer extends React.Component {
  static propTypes = {
    closeResearch: PropTypes.func.isRequired,
  }
  static mapStateToProps = (state, ownProps) => ({
  })
  static mapDispatchToProps = dispatch => ({
    closeResearch: () => dispatch(uiActions.closeResearch()),
  })

  render() {
    return (
      <Modal>
        <SearchResultsComponent
          closeResearch={this.props.closeResearch}
        />
      </Modal>
    )
  }
}

export default connect(SearchResultsContainer.mapStateToProps, SearchResultsContainer.mapDispatchToProps)(SearchResultsContainer)

