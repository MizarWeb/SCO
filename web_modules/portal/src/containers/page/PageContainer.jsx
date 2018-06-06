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
import { LOCALES_ENUM, LOCALES_ENUM_VALUES, PAGE_ENUM, PAGE_ENUM_VALUES } from '@sco/domain'
import HelpPageContainer from './HelpPageContainer'
import TemporalFormContainer from './TemporalFormContainer'
import SearchResultsContainer from './SearchResultsContainer'
import MenuContainer from './MenuContainer'
import LayerManagerContainer from './LayerManagerContainer'
import ScenarioListContainer from './ScenarioListContainer'
import LegendContainer from './LegendContainer'
import GraphContainer from './GraphContainer'
import { mapSelectors } from '../../clients/MapClient'
import { uiSelectors } from '../../clients/UIClient'

/**
 *
 * @author Léo Mieulet
 */
export class PageContainer extends React.Component {
  static propTypes = {
    currentLocale: PropTypes.oneOf(LOCALES_ENUM_VALUES),
    currentPage: PropTypes.oneOf(PAGE_ENUM_VALUES),
    isDisplayingSplashScreen: PropTypes.bool.isRequired,
  }
  static mapStateToProps = (state, ownProps) => ({
    currentPage: uiSelectors.getCurrentPage(state),
    currentLocale: uiSelectors.getCurrentLocale(state),
    isDisplayingSplashScreen: mapSelectors.isDisplayingSplashScreen(state),
  })
  state = {
    currentLocale: LOCALES_ENUM.EN,
  }
  /**
   * MapToolsContainer and PageContainer hard refresh every time user change the locale
   */
  componentWillReceiveProps(nextProps) {
    this.setState({
      currentLocale: nextProps.currentLocale,
    })
  }
  render() {
    const { currentPage, isDisplayingSplashScreen } = this.props

    // Do not display subcontainers if Mizar is loading
    if (isDisplayingSplashScreen) {
      return null
    }
    return (
      <div somethingnotused={this.state.currentLocale}>
        <HelpPageContainer
          mounted={currentPage === PAGE_ENUM.HELP}
        />
        <TemporalFormContainer
          mounted={currentPage === PAGE_ENUM.TEMPORAL_FORM}
        />
        <SearchResultsContainer
          mounted={currentPage === PAGE_ENUM.SEARCH_RESULTS}
        />
        <ScenarioListContainer
          mounted={currentPage === PAGE_ENUM.LIST_SCENARIO}
        />
        <LayerManagerContainer
          mounted={currentPage === PAGE_ENUM.LAYER_MANAGER}
        />
        <MenuContainer
          mounted={currentPage === PAGE_ENUM.MENU}
        />
        <LegendContainer
          mounted={currentPage === PAGE_ENUM.LEGEND}
        />
        <GraphContainer
          mounted={currentPage === PAGE_ENUM.GRAPH}
        />
      </div>
    )
  }
}

export default connect(PageContainer.mapStateToProps)(PageContainer)

