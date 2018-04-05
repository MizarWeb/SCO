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
import { mapActions, mapSelectors } from '../../clients/MapClient'
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
    thematicList: Shapes.ThematicList,
    mounted: PropTypes.bool.isRequired,
  }

  static mapStateToProps = (state, ownProps) => ({
    scenarioList: mapSelectors.getScenarioList(state),
    thematicList: mapSelectors.getThematics(state),
  })

  static mapDispatchToProps = dispatch => ({
    closeView: () => dispatch(uiActions.toggleMenu(false)),
    showScenario: scenarioId => dispatch(mapActions.showScenario(scenarioId)),
  })

  onSelectScenario = (scenarioId) => {
    this.props.showScenario(scenarioId)
    this.props.closeView()
  }

  render() {
    return (
      <ClimateChangeScenarioListComponent
        closeView={this.props.closeView}
        scenarioList={this.props.scenarioList}
        thematicList={this.props.thematicList}
        onSelectScenario={this.onSelectScenario}
        mounted={this.props.mounted}
      />
    )
  }
}

export default connect(ClimateChangeScenarioListContainer.mapStateToProps, ClimateChangeScenarioListContainer.mapDispatchToProps)(ClimateChangeScenarioListContainer)

