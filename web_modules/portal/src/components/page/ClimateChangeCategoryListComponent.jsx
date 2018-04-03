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
import { Shapes } from '@sco/domain'
import map from 'lodash/map'
import { CardActions, CardText, CardTitle } from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'
import { List, ListItem } from 'material-ui/List'
import Avatar from 'material-ui/Avatar'
import FileFolder from 'material-ui/svg-icons/file/folder'
import ItemList from './ItemList'

/**
 * List climate change categories
 * @author Léo Mieulet
 */
export class ClimateChangeCategoryListComponent extends React.Component {
  static propTypes = {
    closeView: PropTypes.func.isRequired,
    onSelectCollection: PropTypes.func.isRequired,
    collectionList: Shapes.CollectionList,
  }
  static imgStyle = {
    height: '100%',
    width: '100%',
  }
  render() {
    return (
      <div>
        <CardTitle
          title="Climate changes"
        />
        <CardText>
          {map(this.props.collectionList, collection => (
            <ItemList
              key={collection.id}
              imageURL="http://lorempicsum.com/futurama/350/200/1"
              imageAlt={collection.title}
              description={collection.abstract}
              title={collection.title}
            />
          ))}
          <List>
            {map(this.props.collectionList, collection => (
              <ListItem
                key={collection.id}
                leftAvatar={<Avatar icon={<FileFolder />} />}
                primaryText={collection.title}
                secondaryText={collection.abstract}
                onClick={() => { this.props.onSelectCollection(collection.id) }}
              />
            ))}
          </List>
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
