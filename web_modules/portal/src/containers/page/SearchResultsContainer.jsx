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
import partition from 'lodash/partition'
import find from 'lodash/find'
import includes from 'lodash/includes'
import { connect } from 'react-redux'
import { Shapes } from '@sco/domain'
import { uiActions, uiSelectors } from '../../clients/UIClient'
import { mapActions, mapSelectors } from '../../clients/MapClient'
import SearchResultsComponent from '../../components/page/SearchResultsComponent'
/**
 *
 * @author Léo Mieulet
 */
export class SearchResultsContainer extends React.Component {
  static propTypes = {
    closeResearch: PropTypes.func.isRequired,
    showScenario: PropTypes.func.isRequired,
    updateSearchQuery: PropTypes.func.isRequired,
    mounted: PropTypes.bool.isRequired,
    searchQuery: PropTypes.string,
    scenarioList: Shapes.ScenarioList,
    thematicList: Shapes.ThematicList,
  }

  static mapStateToProps = (state, ownProps) => ({
    scenarioList: mapSelectors.getScenarioList(state),
    thematicList: mapSelectors.getThematics(state),
    searchQuery: uiSelectors.getSearchQuery(state),
  })

  static mapDispatchToProps = dispatch => ({
    closeResearch: () => dispatch(uiActions.closeResearch()),
    showScenario: scenarioId => dispatch(mapActions.showScenario(scenarioId)),
    updateSearchQuery: searchQuery => dispatch(uiActions.updateSearchQuery(searchQuery)),
  })

  onSelectScenario = (scenarioId) => {
    this.props.showScenario(scenarioId)
    this.props.closeResearch()
  }

  extractResultingScenarioList = () => {
    const simplerSearchQuery = this.props.searchQuery.toLowerCase()
    const scenarioPartitioned = partition(this.props.scenarioList, scenario =>
      includes(scenario.abstract.toLowerCase(), simplerSearchQuery) ||
      includes(scenario.title.toLowerCase(), simplerSearchQuery) ||
      includes(scenario.thematic.toLowerCase(), simplerSearchQuery) ||
      find(scenario.attributes, attr => (
        includes(attr.value.toLowerCase(), simplerSearchQuery)),
      ),
    )
    return scenarioPartitioned[0]
  }

  render() {
    const resultingScenarioList = this.extractResultingScenarioList()
    return (
      <SearchResultsComponent
        mounted={this.props.mounted}
        resultingScenarioList={resultingScenarioList}
        thematicList={this.props.thematicList}
        updateSearchQuery={this.props.updateSearchQuery}
        onSelectScenario={this.onSelectScenario}
        closeResearch={this.props.closeResearch}
        searchQuery={this.props.searchQuery}
      />
    )
  }
}

export default connect(SearchResultsContainer.mapStateToProps, SearchResultsContainer.mapDispatchToProps)(SearchResultsContainer)

