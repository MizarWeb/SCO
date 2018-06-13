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
import { ListItem, CardTitle, Modal } from '@sco/components'
import { CardActions, CardText } from 'material-ui/Card'
import { Shapes, getCategoryIcon } from '@sco/domain'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import IconButton from 'material-ui/IconButton'
import SearchIcon from 'material-ui/svg-icons/action/search'
import Subheader from 'material-ui/Subheader'
import map from 'lodash/map'
import size from 'lodash/size'
import isEmpty from 'lodash/isEmpty'

/**
 * Allows user to search a climate change scenario
 * @author Léo Mieulet
 */
export class SearchResultsComponent extends React.Component {
  static propTypes = {
    closeResearch: PropTypes.func.isRequired,
    mounted: PropTypes.bool.isRequired,
    resultingScenarioList: Shapes.ScenarioList,
    onSelectScenario: PropTypes.func.isRequired,
    updateSearchQuery: PropTypes.func.isRequired,
    thematicList: Shapes.ThematicList,
    searchQuery: PropTypes.string,
  }
  static contextTypes = {
    intl: PropTypes.object,
  }

  static searchBarWrapperStyle = {
    display: 'flex',
    justifyContent: 'center',
  }
  static subheaderStyle = {
    marginBottom: '30px',
  }
  static actionWrapperStyle = {
    display: 'flex',
    justifyContent: 'center',
  }
  constructor(props) {
    super(props)
    this.state = {
      value: props.searchQuery,
    }
  }

  componentWillReceiveProps(nextProps) {
    // Save the new search query in the state
    if (this.props.searchQuery !== nextProps.searchQuery) {
      this.setState({
        value: nextProps.searchQuery,
      })
    }
  }

  getDescription = scenario => (
    <div>
      {/* eslint-disable-next-line react/no-danger */}
      <div dangerouslySetInnerHTML={{ __html: scenario.abstract }} />
    </div>
  )

  /**
   * @return {boolean} true when the input field is empty
   */
  isSearchDisabled = () => this.state.value === ''


  /**
   * On input change
   */
  handleChange = (event) => {
    this.setState({
      value: event.target.value,
    })
  }

  /**
   * Allows the user to search when he hits the button enter
   */
  handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      document.getElementById('search-button').focus()
    }
  }


  launchResearch = () => {
    this.props.updateSearchQuery(this.state.value)
  }

  render() {
    return (
      <Modal
        title={
          <CardTitle
            title={this.context.intl.formatMessage({ id: 'page.search-results.title' })}
          />
        }
        onClose={this.props.closeResearch}
        mounted={this.props.mounted}
        hasSubtitle={false}
      >
        <div>
          <CardText>
            <div style={SearchResultsComponent.searchBarWrapperStyle}>
              <div
                className="col-xs-95"
              >
                <TextField
                  fullWidth
                  value={this.state.value}
                  onChange={this.handleChange}
                  hintText={this.context.intl.formatMessage({ id: 'map.search.hint' })}
                  onBlur={this.launchResearch}
                  onKeyDown={this.handleKeyDown}
                />
              </div>
              <div>
                <IconButton
                  disabled={this.isSearchDisabled()}
                  onClick={this.handleClickSubmit}
                  id="search-button"
                >
                  <SearchIcon />
                </IconButton>
              </div>
            </div>
            {!isEmpty(this.props.searchQuery) ? (
              <div>
                <Subheader style={SearchResultsComponent.subheaderStyle}>{this.context.intl.formatMessage({ id: 'map.search.size' }, { size: size(this.props.resultingScenarioList) })}</Subheader>
                {map(this.props.resultingScenarioList, scenario => (
                  <ListItem
                    key={scenario.id}
                    imageURL={scenario.image}
                    imageAlt={scenario.title}
                    imgCopyright={scenario.imgCopyright}
                    description={this.getDescription(scenario)}
                    title={scenario.title}
                    onClick={() => { this.props.onSelectScenario(scenario.id) }}
                    category={scenario.thematic}
                    iconCategoryURL={getCategoryIcon(scenario.thematic)}
                    thematicList={this.props.thematicList}
                  />
                ))}
              </div>
            ) : null}
          </CardText>
          <CardActions style={SearchResultsComponent.actionWrapperStyle}>
            <RaisedButton
              label={this.context.intl.formatMessage({ id: 'page.actions.close' })}
              onClick={this.props.closeResearch}
            />
          </CardActions>
        </div>
      </Modal>
    )
  }
}

export default SearchResultsComponent
