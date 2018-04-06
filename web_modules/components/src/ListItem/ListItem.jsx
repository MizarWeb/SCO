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
import { CardText } from 'material-ui/Card'
import Divider from 'material-ui/Divider/Divider'
import find from 'lodash/find'
import { Shapes } from '@sco/domain'
import CardTitle from '../CardTitle/CardTitle'
import './ListItem.css'

/**
 * A piece of entry in a list
 * @author Léo Mieulet
 */
export class ListItem extends React.Component {
  static propTypes = {
    imageURL: PropTypes.string.isRequired,
    imageAlt: PropTypes.string.isRequired,
    iconCategoryURL: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    description: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
    title: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    thematicList: Shapes.ThematicList.isRequired,
  }

  static imgStyle = {
    height: '100%',
  }
  static imgWrapperStyle = {
    display: 'flex',
    justifyContent: 'center',
  }
  static titleLayoutStyle = {
    display: 'flex',
    alignItems: 'center',
  }
  static titleStyle = {
    marginBottom: '4px',
  }
  static subtitleStyle = {
    fontWeight: 700,
  }
  static textStyle = {
    paddingTop: '5px',
    marginLeft: '50px',
    lineHeight: '1.5em',
    fontSize: '1.2em',
  }
  static imgCategoryStyle = {
    height: 48,
  }
  static dividerStyle = {
    marginBottom: '4px',
    marginTop: '4px',
  }


  /**
   * Retrieve the thematic color using its id
   */
  getThematicColor = (thematicId) => {
    const thematic = find(this.props.thematicList, t => (
      t.id === thematicId
    ))
    return thematic.color
  }

  /**
   * Retrieve the thematic name using its id
   */
  getThematicName = (thematicId) => {
    const thematic = find(this.props.thematicList, t => (
      t.id === thematicId
    ))
    return thematic.name
  }

  render() {
    return (
      <div className="listitem" onClick={this.props.onClick}>
        <div className="row">
          <div className="col-xs-25" style={ListItem.imgWrapperStyle}>
            <img
              src={this.props.imageURL}
              style={ListItem.imgStyle}
              alt={this.props.imageAlt}
            />
          </div>
          <div className="col-xs-75">
            <div style={ListItem.titleLayoutStyle}>
              <img
                src={this.props.iconCategoryURL}
                alt={this.getThematicName(this.props.category)}
                style={ListItem.imgCategoryStyle}
              />
              <CardTitle
                title={this.props.title}
                titleStyle={ListItem.titleStyle}
                subtitle={this.getThematicName(this.props.category)}
                subtitleColor={this.getThematicColor(this.props.category)}
                subtitleStyle={ListItem.subtitleStyle}
              />
            </div>
            <CardText style={ListItem.textStyle}>
              {this.props.description}
            </CardText>
          </div>
        </div>
        <div className="row" style={ListItem.dividerStyle}>
          <Divider />
        </div>
      </div>
    )
  }
}

export default ListItem
