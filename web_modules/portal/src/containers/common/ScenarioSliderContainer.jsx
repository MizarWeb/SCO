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
import ScenarioSliderComponent from '../../components/common/ScenarioSliderComponent'
import { mapSelectors, mapActions } from '../../clients/MapClient'

/**
 * @author Léo Mieulet
 */
export class ScenarioSliderContainer extends React.Component {
  static propTypes = {
    currentScenario: Shapes.Scenario,
    updateScenarioParameter: PropTypes.func.isRequired,
  }
  static mapStateToProps = (state, ownProps) => ({
    currentView: mapSelectors.getCurrentView(state),
    currentScenario: mapSelectors.getCurrentScenario(state),
  })
  static mapDispatchToProps = dispatch => ({
    updateScenarioParameter: (attrName, value) => dispatch(mapActions.updateScenarioParameter(attrName, value)),
  })

  render() {
    return (
      <ScenarioSliderComponent
        currentScenario={this.props.currentScenario}
        updateScenarioParameter={this.props.updateScenarioParameter}
      />
    )
  }
}

export default connect(ScenarioSliderContainer.mapStateToProps, ScenarioSliderContainer.mapDispatchToProps)(ScenarioSliderContainer)
