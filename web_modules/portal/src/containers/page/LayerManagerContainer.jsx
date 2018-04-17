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
import { Shapes } from '@sco/domain'
import { connect } from 'react-redux'
import { uiActions } from '../../clients/UIClient'
import { mapSelectors, mapActions } from '../../clients/MapClient'
import LayerManagerComponent from '../../components/page/LayerManagerComponent'
/**
 *
 * @author Léo Mieulet
 */
export class LayerManagerContainer extends React.Component {
  static propTypes = {
    closeLayerManager: PropTypes.func.isRequired,
    updateLayerInfos: PropTypes.func.isRequired,
    mounted: PropTypes.bool.isRequired,
    rasterList: Shapes.LayerList,
    layerList: Shapes.LayerList,
    scenario: Shapes.Scenario,
  }
  static mapStateToProps = (state, ownProps) => ({
    rasterList: mapSelectors.getRasters(state),
    layerList: mapSelectors.getLayers(state),
    scenario: mapSelectors.getCurrentScenario(state),
  })
  static mapDispatchToProps = dispatch => ({
    closeLayerManager: () => dispatch(uiActions.toggleLayerManager(false)),
    updateLayerInfos: (layerList, rasterList) => dispatch(mapActions.updateLayerInfos(layerList, rasterList)),
  })

  render() {
    return (
      <LayerManagerComponent
        closeLayerManager={this.props.closeLayerManager}
        mounted={this.props.mounted}
        rasterList={this.props.rasterList}
        layerList={this.props.layerList}
        scenario={this.props.scenario}
        updateLayerInfos={this.props.updateLayerInfos}
      />
    )
  }
}

export default connect(LayerManagerContainer.mapStateToProps, LayerManagerContainer.mapDispatchToProps)(LayerManagerContainer)

