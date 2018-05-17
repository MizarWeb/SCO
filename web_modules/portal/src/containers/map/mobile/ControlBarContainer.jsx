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
import { MAP_ENUM, MAP_ENUM_VALUES } from '@sco/domain'
import { uiActions } from '../../../clients/UIClient'
import { mapActions, mapSelectors } from '../../../clients/MapClient'
import ControlBarComponent from '../../../components/map/mobile/ControlBarComponent'

/**
 * @author Léo Mieulet
 */
export class ControlBarContainer extends React.Component {
  static propTypes = {
    currentView: PropTypes.oneOf(MAP_ENUM_VALUES),
  }
  static mapStateToProps = (state, ownProps) => ({
    currentView: mapSelectors.getCurrentView(state),
    currentScenario: mapSelectors.getCurrentScenario(state),
  })
  static mapDispatchToProps = dispatch => ({
    openTemporalFilter: () => dispatch(uiActions.toggleTemporalFilter(true)),
    travelThroughTime: goFurther => dispatch(uiActions.travelThroughTime(goFurther)),
    updateScenarioParameter: (attrName, value) => dispatch(mapActions.updateScenarioParameter(attrName, value)),
  })


  render() {
    const { currentView } = this.props
    switch (currentView) {
      case MAP_ENUM.INITIAL:
      case MAP_ENUM.INFO_SCENARIO:
      case MAP_ENUM.SOON_INFO_SCENARIO:
      case MAP_ENUM.SOON_SHOWING_SCENARIO:
        return null
      case MAP_ENUM.SHOWING_SCENARIO:
        return (
          <ControlBarComponent />
        )
      default:
        throw new Error(`Unexpected state ${currentView}`)
    }
  }
}

export default connect(ControlBarContainer.mapStateToProps, ControlBarContainer.mapDispatchToProps)(ControlBarContainer)
