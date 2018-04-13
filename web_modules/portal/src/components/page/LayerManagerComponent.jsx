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
import get from 'lodash/get'
import map from 'lodash/map'
import size from 'lodash/size'
import { CardTitle, Modal } from '@sco/components'
import { delayEvent, Shapes } from '@sco/domain'
import { CardActions, CardText } from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'
import Subheader from 'material-ui/Subheader'
import IconButton from 'material-ui/IconButton'
import DownIcon from 'material-ui/svg-icons/hardware/keyboard-arrow-down'
import UpIcon from 'material-ui/svg-icons/hardware/keyboard-arrow-up'
import EditIcon from 'material-ui/svg-icons/editor/mode-edit'
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table'

/**
 * Display the list of active layers for the current scenario
 * let the user manage deeply these layers
 * @author Léo Mieulet
 */
export class LayerManagerComponent extends React.Component {
  static propTypes = {
    closeLayerManager: PropTypes.func.isRequired,
    mounted: PropTypes.bool.isRequired,
    rasterList: Shapes.LayerList,
    layerList: Shapes.LayerList,
    scenario: Shapes.Scenario,
  }
  static actionWrapperStyle = {
    display: 'flex',
    justifyContent: 'center',
  }
  static buttonStyle = {
    margin: '0 10px',
  }
  isSearchDisabled = () => (true)
  handleUp = () => {

  }
  handleDown = () => {

  }
  renderTableRow = layer => (
    <TableRow key={layer.name}>
      <TableRowColumn style={{ width: '10%' }}>
        <IconButton
          disabled={this.isSearchDisabled()}
          onClick={this.handleUp}
        >
          <UpIcon />
        </IconButton>
        <IconButton
          disabled={this.isSearchDisabled()}
          onClick={this.handleDown}
        >
          <DownIcon />
        </IconButton>
      </TableRowColumn>
      <TableRowColumn style={{ width: '70%' }}>
        {layer.name}
      </TableRowColumn>
      <TableRowColumn style={{ width: '20%' }}>
        100%
        <IconButton
          disabled={this.isSearchDisabled()}
          onClick={this.handleDown}
        >
          <EditIcon />
        </IconButton>
      </TableRowColumn>
    </TableRow>
  )

  renderTableHeader = () => (
    <TableHeader
      enableSelectAll={false}
      adjustForCheckbox={false}
      displaySelectAll={false}
    >
      <TableRow>
        <TableHeaderColumn style={{ width: '10%' }}>
        </TableHeaderColumn>
        <TableHeaderColumn style={{ width: '70%' }}>Name</TableHeaderColumn>
        <TableHeaderColumn style={{ width: '20%' }}>Opacity</TableHeaderColumn>
      </TableRow>
    </TableHeader>
  )
  render() {
    const { scenario } = this.props
    return (
      <Modal
        title={
          <CardTitle
            title={`${get(scenario, 'title', '')} layers`}
            subtitle="Manage layers order and opacity"
          />
        }
        onClose={this.props.closeLayerManager}
        mounted={this.props.mounted}
      >
        <div>
          <CardText>
            {size(this.props.rasterList) > 0 ? ([
              <Subheader key="title" style={LayerManagerComponent.subheaderStyle}>{size(this.props.rasterList)} Rasters</Subheader>,
              <Table
                key="table"
                selectable={false}
              >
                {this.renderTableHeader()}
                <TableBody
                  displayRowCheckbox={false}
                  preScanRows={false}
                  showRowHover
                >
                  {map(this.props.rasterList, layer => (
                    this.renderTableRow(layer)
                  ))}
                </TableBody>
              </Table>,
            ]) : null}

            {size(this.props.layerList) > 0 ? ([
              <Subheader key="title" style={LayerManagerComponent.subheaderStyle}>{size(this.props.layerList)} Layers</Subheader>,
              <Table
                key="table"
                selectable={false}
                style={{ tableLayout: 'auto' }}
                fixedHeader={false}
              >
                {this.renderTableHeader()}
                <TableBody
                  displayRowCheckbox={false}
                  preScanRows={false}
                  showRowHover
                >
                  {map(this.props.layerList, layer => (
                    this.renderTableRow(layer)
                  ))}
                </TableBody>
              </Table>,
            ]) : null}
            <CardActions style={LayerManagerComponent.actionWrapperStyle}>
              <RaisedButton
                label="Save"
                onClick={delayEvent(this.submitForm)}
                primary
                style={LayerManagerComponent.buttonStyle}
              />
              <RaisedButton
                label="Close"
                onClick={delayEvent(this.props.closeLayerManager)}
                style={LayerManagerComponent.buttonStyle}
              />
            </CardActions>
          </CardText>
        </div>
      </Modal>
    )
  }
}

export default LayerManagerComponent
