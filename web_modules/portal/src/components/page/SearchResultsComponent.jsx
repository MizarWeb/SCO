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
import { CardTitle, Modal } from '@sco/components'
import { CardActions, CardText } from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'

/**
 * Allows user to search a climate change
 * @author Léo Mieulet
 */
export class SearchResultsComponent extends React.Component {
  static propTypes = {
    closeResearch: PropTypes.func.isRequired,
  }

  render() {
    return (
      <Modal
        title={
          <CardTitle
            title="Search results"
          />
        }
        onClose={this.props.closeResearch}
      >
        <div>
          <CardText>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
            Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
            Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
          </CardText>
          <CardActions>
            <FlatButton
              label="Close"
              onClick={this.props.closeResearch}
            />
          </CardActions>
        </div>
      </Modal>
    )
  }
}

export default SearchResultsComponent
