

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
import includes from 'lodash/includes'
import { connect } from 'react-redux'
import { MizarAdapter } from '@sco/adapter'
import { Shapes, MAP_ENUM, MAP_ENUM_VALUES } from '@sco/domain'
import { mapSelectors, mapActions } from '../../clients/MapClient'

/**
 * @author Léo Mieulet
 */
export class MizarContainer extends React.Component {
  static propTypes = {
    thematicList: Shapes.ThematicList.isRequired,
    baseLayerList: Shapes.LayerList.isRequired,
    scenarioList: Shapes.ScenarioList.isRequired,
    centerToScenarioId: PropTypes.string.isRequired,
    currentView: PropTypes.oneOf(MAP_ENUM_VALUES),

    onMizarLibraryLoaded: PropTypes.func.isRequired,
    hideSplashScreen: PropTypes.func.isRequired,
    showScenarioInfo: PropTypes.func.isRequired,
    handleEndCenterTo: PropTypes.func.isRequired,
    handleRandomMovement: PropTypes.func.isRequired,
    saveLayerInfo: PropTypes.func.isRequired,
  }

  static mapStateToProps = (state, ownProps) => ({
    thematicList: mapSelectors.getThematics(state),
    baseLayerList: mapSelectors.getBaseLayers(state),
    scenarioList: mapSelectors.getScenarioList(state),
    centerToScenarioId: mapSelectors.getCenterToScenarioId(state),
    currentView: mapSelectors.getCurrentView(state),
  })

  static mapDispatchToProps = dispatch => ({
    hideSplashScreen: () => dispatch(mapActions.hideSplashScreen()),
    onMizarLibraryLoaded: () => dispatch(mapActions.onMizarLibraryLoaded()),
    showScenarioInfo: scenarioId => dispatch(mapActions.showScenarioInfo(scenarioId)),
    handleEndCenterTo: () => dispatch(mapActions.endCenterTo()),
    handleRandomMovement: () => dispatch(mapActions.onRandomMovement()),
    saveLayerInfo: layerInfo => dispatch(mapActions.saveLayerInfo(layerInfo)),
  })

  render() {
    const { currentView } = this.props
    // during these two transitions, Mizar should not receive any other event
    const listenUserEvent = !includes([MAP_ENUM.SOON_INFO_SCENARIO, MAP_ENUM.SOON_SHOWING_SCENARIO], currentView)
    return (
      <MizarAdapter
        listenUserEvent={listenUserEvent}
        thematicList={this.props.thematicList}
        baseLayerList={this.props.baseLayerList}
        scenarioList={this.props.scenarioList}
        centerToScenarioId={this.props.centerToScenarioId}

        onMizarLibraryLoaded={this.props.onMizarLibraryLoaded}
        onMizarBaseLayersLoaded={this.props.hideSplashScreen}
        showScenarioInfo={this.props.showScenarioInfo}
        handleEndCenterTo={this.props.handleEndCenterTo}
        handleRandomMovement={this.props.handleRandomMovement}
        saveLayerInfo={this.props.saveLayerInfo}
      />
    )
  }
}

export default connect(MizarContainer.mapStateToProps, MizarContainer.mapDispatchToProps)(MizarContainer)
