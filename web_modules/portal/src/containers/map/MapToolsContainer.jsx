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
import { LOCALES_ENUM, LOCALES_ENUM_VALUES } from '@sco/domain'
import SearchHelpContainer from './desktop/SearchHelpContainer'
import LogoContainer from './desktop/LogoContainer'
import LoadingDataContainer from './LoadingDataContainer'
import POIPopupContainer from './desktop/POIPopupContainer'
import MobileBrowserBarContainer from './mobile/MobileBrowserBarContainer'
import ScenarioGraphContainer from './desktop/ScenarioGraphContainer'
import DesktopScenarioSliderContainer from './desktop/DesktopScenarioSliderContainer'
import ScenarioLegendContainer from './desktop/ScenarioLegendContainer'
import ControlBarContainer from './mobile/ControlBarContainer'
import POMobileInfoContainer from './mobile/POMobileInfoContainer'
import { mapSelectors } from '../../clients/MapClient'
import { uiSelectors } from '../../clients/UIClient'

/**
 * @author Léo Mieulet
 */
export class MapToolsContainer extends React.Component {
  static propTypes = {
    isDisplayingSplashScreen: PropTypes.bool.isRequired,
    currentLocale: PropTypes.oneOf(LOCALES_ENUM_VALUES),
  }
  static mapStateToProps = (state, ownProps) => ({
    isDisplayingSplashScreen: mapSelectors.isDisplayingSplashScreen(state),
    currentLocale: uiSelectors.getCurrentLocale(state),
    scenarioList: mapSelectors.getScenarioList(state),
    currentScenarioId: mapSelectors.getCurrentScenarioId(state),
  })
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
    // Do not display subcontainers if Mizar is loading
    if (this.props.isDisplayingSplashScreen) {
      return null
    }
    return (
      <div somethingnotused={this.state.currentLocale}>
        <POIPopupContainer />
        <LoadingDataContainer />
        <LogoContainer />
        <SearchHelpContainer />
        <ScenarioGraphContainer />
        <DesktopScenarioSliderContainer />
        <ScenarioLegendContainer />
        <MobileBrowserBarContainer />
        <ControlBarContainer />
        <POMobileInfoContainer />
      </div>
    )
  }
}

export default connect(MapToolsContainer.mapStateToProps)(MapToolsContainer)
