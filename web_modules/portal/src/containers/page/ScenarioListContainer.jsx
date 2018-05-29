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
import isEmpty from 'lodash/isEmpty'
import { connect } from 'react-redux'
import { Shapes } from '@sco/domain'
import { uiActions } from '../../clients/UIClient'
import { mapActions, mapSelectors } from '../../clients/MapClient'
import ScenarioListComponent from '../../components/page/ScenarioListComponent'

/**
 *
 * @author Léo Mieulet
 */
export class ScenarioListContainer extends React.Component {
  static propTypes = {
    closeView: PropTypes.func.isRequired,
    showScenario: PropTypes.func.isRequired,
    quitScenario: PropTypes.func.isRequired,
    scenarioList: Shapes.ScenarioList,
    thematicList: Shapes.ThematicList,
    scenario: Shapes.Scenario,
    mounted: PropTypes.bool.isRequired,
  }

  static mapStateToProps = (state, ownProps) => ({
    scenarioList: mapSelectors.getScenarioList(state),
    thematicList: mapSelectors.getThematics(state),
    scenario: mapSelectors.getCurrentScenario(state),
  })

  static mapDispatchToProps = dispatch => ({
    closeView: () => dispatch(uiActions.toggleScenarioList(false)),
    showScenario: scenarioId => dispatch(mapActions.showScenario(scenarioId)),
    quitScenario: () => dispatch(mapActions.quitScenario()),
  })

  onSelectScenario = (scenarioId) => {
    // Actions to dispatch that will show that scenario
    const postActions = () => {
      this.props.showScenario(scenarioId)
      this.props.closeView()
    }
    // But first we need to know if a scenario is already opened
    if (!isEmpty(this.props.scenario)) {
      this.props.quitScenario()
        .then(() => {
          postActions()
        })
    } else {
      postActions()
    }
  }

  render() {
    return (
      <ScenarioListComponent
        closeView={this.props.closeView}
        scenarioList={this.props.scenarioList}
        thematicList={this.props.thematicList}
        onSelectScenario={this.onSelectScenario}
        mounted={this.props.mounted}
      />
    )
  }
}

export default connect(ScenarioListContainer.mapStateToProps, ScenarioListContainer.mapDispatchToProps)(ScenarioListContainer)

