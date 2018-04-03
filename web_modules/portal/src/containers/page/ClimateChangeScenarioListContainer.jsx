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
import { uiActions, uiSelectors } from '../../clients/UIClient'
import { mapActions, mapSelectors } from '../../clients/MapClient'
import ModalComponent from '../../components/page/ModalComponent'
import ClimateChangeScenarioListComponent from '../../components/page/ClimateChangeScenarioListComponent'

/**
 *
 * @author Léo Mieulet
 */
export class ClimateChangeScenarioListContainer extends React.Component {
  static propTypes = {
    closeView: PropTypes.func.isRequired,
    showScenario: PropTypes.func.isRequired,
    scenarioList: Shapes.ScenarioList,
    collectionId: PropTypes.string.isRequired,
  }

  static mapStateToProps = (state, ownProps) => ({
    scenarioList: mapSelectors.getScenarioList(state, uiSelectors.getCurrentCollection(state)),
    collectionId: uiSelectors.getCurrentCollection(state),
  })

  static mapDispatchToProps = dispatch => ({
    closeView: () => dispatch(uiActions.toggleMenu(false)),
    showScenario: (collectionId, scenarioId) => dispatch(mapActions.showScenario(collectionId, scenarioId)),
  })

  onSelectScenario = (scenarioId) => {
    this.props.showScenario(this.props.collectionId, scenarioId)
    this.props.closeView()
  }

  render() {
    return (
      <ModalComponent>
        <ClimateChangeScenarioListComponent
          closeView={this.props.closeView}
          scenarioList={this.props.scenarioList}
          onSelectScenario={this.onSelectScenario}
        />
      </ModalComponent>
    )
  }
}

export default connect(ClimateChangeScenarioListContainer.mapStateToProps, ClimateChangeScenarioListContainer.mapDispatchToProps)(ClimateChangeScenarioListContainer)

