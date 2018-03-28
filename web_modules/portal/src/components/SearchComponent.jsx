/**
 * Copyright 2018 SCO - Space Climate Observatory
 *
 * This file is part of CSO.
 *
 * CSO is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * CSO is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with CSO. If not, see <http://www.gnu.org/licenses/>.
 **/
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

  state = SearchComponent.DEFAULT_STATE

  /**
   * On input change
   */
  handleChange = (event) => {
    this.setState({
      value: event.target.value,
    })
  }

  /**
   *
   */
  isSearchDisabled = () => this.state.value === SearchComponent.DEFAULT_STATE.value

  render() {
    return (
      <Paper
        style={SearchComponent.searchFieldWrapperStyle}
        zDepth={3}
        rounded={false}
      >
        <TextField
          id="text-field-controlled"
          value={this.state.value}
          onChange={this.handleChange}
          hintText="Search"
        />
        <IconButton disabled={this.isSearchDisabled()}>
          <SearchIcon />
        </IconButton>
      </Paper>
    )
  }
}

export default SearchComponent
