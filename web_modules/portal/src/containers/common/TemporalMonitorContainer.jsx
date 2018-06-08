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
import { mapSelectors, mapActions } from '../../clients/MapClient'
import { uiActions } from '../../clients/UIClient'
import TemporalMonitorComponent from '../../components/common/TemporalMonitorComponent'


/**
 * @author Léo Mieulet
 */
export class TemporalMonitorContainer extends React.Component {
  static propTypes = {
    displaySeparator: PropTypes.bool,
    openTemporalFilter: PropTypes.func.isRequired,
    travelThroughTime: PropTypes.func.isRequired,
    travelToTimeBoundary: PropTypes.func.isRequired,
    layerTemporalInfos: Shapes.LayerTemporalInfos,
    loadingLayers: PropTypes.bool.isRequired,
  }
  static mapStateToProps = (state, ownProps) => ({
    layerTemporalInfos: mapSelectors.getLayerTemporalInfos(state),
    loadingLayers: mapSelectors.isLoadingLayers(state),
  })
  static mapDispatchToProps = dispatch => ({
    travelThroughTime: goFurther => dispatch(mapActions.travelThroughTime(goFurther)),
    travelToTimeBoundary: isEndBoundary => dispatch(mapActions.travelToTimeBoundary(isEndBoundary)),
    openTemporalFilter: () => dispatch(uiActions.toggleTemporalFilter(true)),
  })
  static defaultProps = {
    displaySeparator: true,
  }

  render() {
    const shouldDisplay = !!this.props.layerTemporalInfos.beginDate && this.props.layerTemporalInfos.nbStep !== 0
    return shouldDisplay ? (
      <TemporalMonitorComponent
        displaySeparator={this.props.displaySeparator}
        travelThroughTime={this.props.travelThroughTime}
        travelToTimeBoundary={this.props.travelToTimeBoundary}
        openTemporalFilter={this.props.openTemporalFilter}
        layerTemporalInfos={this.props.layerTemporalInfos}
        loadingLayers={this.props.loadingLayers}
      />
    ) : null
  }
}

export default connect(TemporalMonitorContainer.mapStateToProps, TemporalMonitorContainer.mapDispatchToProps)(TemporalMonitorContainer)
