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
import isEqual from 'lodash/isEqual'
import isEmpty from 'lodash/isEmpty'
import size from 'lodash/size'
import forEach from 'lodash/forEach'

/**
 * Display scenario abstract
 * @author Léo Mieulet
 */
export class ScenarioDescriptionComponent extends React.Component {
  static propTypes = {
    abstract: PropTypes.string.isRequired,
    showDescription: PropTypes.bool.isRequired,
    toggleDescription: PropTypes.func.isRequired,
  }
  static linkStyle = {
    color: '#312783',
    textDecoration: 'underline',
  }
  static SHORT_DESCRIPTION_LENGTH = 75

  constructor(props) {
    super(props)
    this.state = {
      shortDescription: this.getShortDescription(props.abstract),
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!isEqual(this.props.abstract, nextProps.abstract) && !isEmpty(nextProps.abstract)) {
      this.setState({
        shortDescription: this.getShortDescription(nextProps.abstract),
      })
    }
  }

  getShortDescription = (abstract) => {
    const words = abstract.split(' ')
    let shortDescription = ''
    let built = false
    forEach(words, (word) => {
      // Check if the short description is not already build
      if (!built) {
        if (size(shortDescription) + size(word) < ScenarioDescriptionComponent.SHORT_DESCRIPTION_LENGTH) {
          // Append that word to the short description
          if (size(shortDescription) > 0) {
            shortDescription += ` ${word}`
          } else {
            shortDescription += word
          }
        } else {
          // cannot add that word - shortDescription is computed !
          // add elipsis
          shortDescription += '...'
          built = true
        }
      }
    })
    return shortDescription
  }

  render() {
    return this.props.showDescription ?
      (
        <div>
          <div dangerouslySetInnerHTML={{ __html: this.props.abstract }} />
          <a style={ScenarioDescriptionComponent.linkStyle} onClick={this.props.toggleDescription}>Less</a>
        </div>
      ) : (
        <span>
          {this.state.shortDescription}
          <a style={ScenarioDescriptionComponent.linkStyle} onClick={this.props.toggleDescription}>More</a>
        </span>
      )
  }
}


export default ScenarioDescriptionComponent
