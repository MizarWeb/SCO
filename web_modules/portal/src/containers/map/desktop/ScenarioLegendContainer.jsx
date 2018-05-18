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
import { Shapes, MAP_ENUM, MAP_ENUM_VALUES } from '@sco/domain'
import ScenarioLegendComponent from '../../../components/map/desktop/ScenarioLegendComponent'
import { mapSelectors } from '../../../clients/MapClient'
import { uiActions } from '../../../clients/UIClient'

/**
 * @author Léo Mieulet
 */
export class ScenarioSliderContainer extends React.Component {
  static propTypes = {
    currentView: PropTypes.oneOf(MAP_ENUM_VALUES),
    currentScenario: Shapes.Scenario,
    openLegend: PropTypes.func.isRequired,
  }
  static mapStateToProps = (state, ownProps) => ({
    currentView: mapSelectors.getCurrentView(state),
    currentScenario: mapSelectors.getCurrentScenario(state),
  })
  static mapDispatchToProps = dispatch => ({
    openLegend: (attrName, value) => dispatch(uiActions.toggleLegend(true)),
  })

  render() {
    const { currentView } = this.props
    switch (currentView) {
      case MAP_ENUM.INITIAL:
      case MAP_ENUM.SOON_INFO_SCENARIO:
      case MAP_ENUM.SOON_SHOWING_SCENARIO:
      case MAP_ENUM.INFO_SCENARIO:
        return null
      case MAP_ENUM.SHOWING_SCENARIO:
        return (
          <ScenarioLegendComponent
            currentScenario={this.props.currentScenario}
            openLegend={this.props.openLegend}
          />
        )
      default:
        throw new Error(`Unexpected state ${currentView}`)
    }
  }
}

export default connect(ScenarioSliderContainer.mapStateToProps, ScenarioSliderContainer.mapDispatchToProps)(ScenarioSliderContainer)
