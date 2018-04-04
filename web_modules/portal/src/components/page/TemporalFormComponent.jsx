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
 * Temporal form
 * @author Léo Mieulet
 */
export class TemporalFormComponent extends React.Component {
  static propTypes = {
    closeForm: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    //todo current value
  }

  render() {
    return (
      <Modal
        title={
          <CardTitle
            title="Information & data credits"
          />
        }
        onClose={this.props.closeForm}
      >
        <div>
          <CardText>
            Form
          </CardText>
          <CardActions>
            <FlatButton
              label="Close"
              onClick={this.props.closeForm}
            />
            <FlatButton
              label="Save"
              onClick={this.props.onSubmit}
            />
          </CardActions>
        </div>
      </Modal>
    )
  }
}

export default TemporalFormComponent
