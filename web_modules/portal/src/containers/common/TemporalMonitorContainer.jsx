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
import { Shapes, LOCALES_ENUM, LOCALES_ENUM_VALUES } from '@sco/domain'
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
    travelTimeToDate: PropTypes.func.isRequired,
    layerTemporalInfos: Shapes.LayerTemporalInfos,
    loadingLayers: PropTypes.bool.isRequired,
    currentLocale: PropTypes.oneOf(LOCALES_ENUM_VALUES),
  }
  static mapStateToProps = (state, ownProps) => ({
    layerTemporalInfos: mapSelectors.getLayerTemporalInfos(state),
    loadingLayers: mapSelectors.isLoadingLayers(state),
  })
  static mapDispatchToProps = dispatch => ({
    travelThroughTime: goFurther => dispatch(mapActions.travelThroughTime(goFurther)),
    travelToTimeBoundary: isEndBoundary => dispatch(mapActions.travelToTimeBoundary(isEndBoundary)),
    travelTimeToDate: (nextStep, nextDate) => dispatch(mapActions.travelTimeToDate(nextStep, nextDate)),
    openTemporalFilter: () => dispatch(uiActions.toggleTemporalFilter(true)),
  })
  static defaultProps = {
    displaySeparator: true,
  }
  state = {
    currentLocale: LOCALES_ENUM.EN,
  }
  /**
   * MapToolsContainer TemporalMonitorContainer and PageContainer hard refresh every time user change the locale
   */
  componentWillReceiveProps(nextProps) {
    this.setState({
      currentLocale: nextProps.currentLocale,
    })
  }

  render() {
    const shouldDisplay = !!this.props.layerTemporalInfos.beginDate && this.props.layerTemporalInfos.nbStep !== 0
    return shouldDisplay ? (
      <div somethingnotused={this.state.currentLocale}>
        <TemporalMonitorComponent
          displaySeparator={this.props.displaySeparator}
          travelThroughTime={this.props.travelThroughTime}
          travelToTimeBoundary={this.props.travelToTimeBoundary}
          travelTimeToDate={this.props.travelTimeToDate}
          openTemporalFilter={this.props.openTemporalFilter}
          layerTemporalInfos={this.props.layerTemporalInfos}
          loadingLayers={this.props.loadingLayers}
        />
      </div>
    ) : null
  }
}

export default connect(TemporalMonitorContainer.mapStateToProps, TemporalMonitorContainer.mapDispatchToProps)(TemporalMonitorContainer)
