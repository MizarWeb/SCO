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
import { Shapes, getCategoryIcon } from '@sco/domain'
import map from 'lodash/map'
import find from 'lodash/find'
import { CardActions, CardText } from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'
import { ListItem, CardTitle } from '@sco/components'

/**
 * List climate change categories
 * @author Léo Mieulet
 */
export class ClimateChangeCategoryListComponent extends React.Component {
  static propTypes = {
    closeView: PropTypes.func.isRequired,
    onSelectCollection: PropTypes.func.isRequired,
    collectionList: Shapes.CollectionList,
    thematicList: Shapes.ThematicList,
  }
  static imgStyle = {
    height: '100%',
    width: '100%',
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
      <div>
        <CardTitle
          title="Climate changes"
        />
        <CardText>
          {map(this.props.collectionList, collection => (
            <ListItem
              key={collection.id}
              imageURL="http://lorempicsum.com/futurama/350/200/1"
              imageAlt={collection.title}
              iconCategoryURL={getCategoryIcon(collection.thematic)}
              category={this.getThematicName(collection.thematic)}
              categoryColor={this.getThematicColor(collection.thematic)}
              description={collection.abstract}
              title={collection.title}
              onClick={() => { this.props.onSelectCollection(collection.id) }}
            />
          ))}
        </CardText>
        <CardActions>
          <FlatButton
            label="Close"
            onClick={this.props.closeView}
          />
        </CardActions>
      </div>
    )
  }
}

export default ClimateChangeCategoryListComponent
