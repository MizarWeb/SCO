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
import { Shapes } from '@sco/domain'
import { uiActions } from '../../clients/UIClient'
import { mapSelectors } from '../../clients/MapClient'
import ModalComponent from '../../components/page/ModalComponent'
import ClimateChangeCategoryListComponent from '../../components/page/ClimateChangeCategoryListComponent'

/**
 *
 * @author Léo Mieulet
 */
export class ClimateChangeCategoryListContainer extends React.Component {
  static propTypes = {
    closeView: PropTypes.func.isRequired,
    onSelectCollection: PropTypes.func.isRequired,
    collectionList: Shapes.CollectionList,
  }
  static mapStateToProps = (state, ownProps) => ({
    collectionList: mapSelectors.getCollections(state),
  })
  static mapDispatchToProps = dispatch => ({
    closeView: () => dispatch(uiActions.toggleMenu(false)),
    onSelectCollection: collectionId => dispatch(uiActions.openScenarioList(collectionId)),
  })

  render() {
    return (
      <ModalComponent>
        <ClimateChangeCategoryListComponent
          closeView={this.props.closeView}
          collectionList={this.props.collectionList}
          onSelectCollection={this.props.onSelectCollection}
        />
      </ModalComponent>
    )
  }
}

export default connect(ClimateChangeCategoryListContainer.mapStateToProps, ClimateChangeCategoryListContainer.mapDispatchToProps)(ClimateChangeCategoryListContainer)

