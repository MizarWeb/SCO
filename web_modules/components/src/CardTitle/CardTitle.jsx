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
import { CardTitle } from 'material-ui/Card'

/**
 * A piece of entry in a list
 * @author Léo Mieulet
 */
export class CardTitleSCO extends React.Component {
  static propTypes = {
    titleStyle: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
    subtitleStyle: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
    cardStyle: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
    backgroundColor: PropTypes.string,
    truncateTitle: PropTypes.bool,
  }
  static defaultProps = {
    cardStyle: {},
    truncateTitle: false,
  }
  render() {
    const {
      titleStyle, subtitleStyle, backgroundColor, cardStyle, truncateTitle, ...otherProps
    } = this.props
    const newTitleStyle = {
      ...titleStyle,
      fontFamily: "'Montserrat', sans-serif",
    }
    const newSubtitleStyle = {
      ...subtitleStyle,
      fontFamily: "'Montserrat', sans-serif",
    }
    const newCardTitleStyle = {
      ...cardStyle,
    }
    if (backgroundColor) {
      newCardTitleStyle.backgroundColor = backgroundColor
    }
    if (truncateTitle) {
      newTitleStyle.whiteSpace = 'nowrap'
      newTitleStyle.textOverflow = 'ellipsis'
      newTitleStyle.overflowY = 'hidden'
      newCardTitleStyle.overflowY = 'hidden'
    }
    return (
      <CardTitle
        titleStyle={newTitleStyle}
        subtitleStyle={newSubtitleStyle}
        style={newCardTitleStyle}
        {...otherProps}
      />
    )
  }
}

export default CardTitleSCO
