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
import { CardText, CardTitle } from 'material-ui/Card'

/**
 * List climate change categories
 * @author Léo Mieulet
 */
export class ClimateChangeCategoryListComponent extends React.Component {
  static propTypes = {
    imageURL: PropTypes.string.isRequired,
    imageAlt: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }
  static imgStyle = {
    height: '100%',
    width: '100%',
  }
  render() {
    return (
      <div className="row">
        <div className="col-xs-100 col-sm-30">
          <img src={this.props.imageURL} style={ClimateChangeCategoryListComponent.imgStyle} alt={this.props.imageAlt} />
        </div>
        <div className=" col-xs-100 col-sm-70">
          <CardTitle title={this.props.title} />
          <CardText>
            {this.props.description}
          </CardText>
        </div>
      </div>

    )
  }
}

export default ClimateChangeCategoryListComponent
