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
import isEmpty from 'lodash/isEmpty'
import TextField from 'material-ui/TextField'
import Paper from 'material-ui/Paper'
import IconButton from 'material-ui/IconButton'
import SearchIcon from 'material-ui/svg-icons/action/search'


/**
 * Search input component
 * @author Léo Mieulet
 */
export class SearchComponent extends React.Component {
  static propTypes = {
    openResearch: PropTypes.func.isRequired,
    searchQuery: PropTypes.string.isRequired,
  }
  static searchFieldWrapperStyle = {
    position: 'absolute',
    right: '15px',
    top: '15px',
    padding: '5px 5px 5px 15px',
    display: 'flex',
    alignItems: 'center',
  }
  static DEFAULT_STATE = {
    value: '',
  }
  static contextTypes = {
    intl: PropTypes.object,
  }
  state = SearchComponent.DEFAULT_STATE


  componentWillReceiveProps(nextProps) {
    // Save the new search query in the state
    if (this.props.searchQuery !== nextProps.searchQuery) {
      this.setState({
        value: nextProps.searchQuery,
      })
    }
  }

  /**
   * On input change
   */
  handleChange = (event) => {
    this.setState({
      value: event.target.value,
    })
  }

  /**
   * On form submit
   */
  handleSubmit = (event) => {
    event.preventDefault()
    this.handleClickSubmit()
  }

  /**
   * On icon click - send form
   */
  handleClickSubmit = () => {
    const { value } = this.state
    if (!isEmpty(value)) {
      this.props.openResearch(value)
    }
  }

  /**
   * @return {boolean} true when the input field is empty
   */
  isSearchDisabled = () => this.state.value === SearchComponent.DEFAULT_STATE.value

  render() {
    return (
      <Paper
        style={SearchComponent.searchFieldWrapperStyle}
        zDepth={3}
        rounded={false}
      >
        <form onSubmit={this.handleSubmit}>
          <TextField
            value={this.state.value}
            onChange={this.handleChange}
            hintText={this.context.intl.formatMessage({ id: 'map.search.hint' })}
          />
          <IconButton
            disabled={this.isSearchDisabled()}
            onClick={this.handleClickSubmit}
          >
            <SearchIcon />
          </IconButton>
        </form>
      </Paper>
    )
  }
}

export default SearchComponent
