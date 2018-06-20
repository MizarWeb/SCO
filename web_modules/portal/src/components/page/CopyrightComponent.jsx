

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
/* eslint-disable react/no-danger */
import get from 'lodash/get'
import map from 'lodash/map'
import { CardTitle, Modal } from '@sco/components'
import { Shapes } from '@sco/domain'
import { CardActions, CardText } from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table'

/**
 * Display layer copyright about the current scenario
 * @author Léo Mieulet
 */
export class CopyrightComponent extends React.Component {
  static propTypes = {
    closeCopyright: PropTypes.func.isRequired,
    mounted: PropTypes.bool.isRequired,
    scenario: Shapes.Scenario,
    layerList: Shapes.LayerList,
    globalLayerList: Shapes.GlobalLayerList,
  }
  static contextTypes = {
    intl: PropTypes.object,
  }
  static actionWrapperStyle = {
    display: 'flex',
    justifyContent: 'center',
  }
  static buttonStyle = {
    margin: '0 10px',
  }
  static subHeaderStyle = {
    color: 'black',
    textAlign: 'center',
    fontWeight: 700,
  }
  static labNameStyle = {
    whiteSpace: 'normal',
  }

  getLayerCopyrights = layer => (
    <TableRow key={layer.id}>
      { layer.attribution ? (
        <TableRowColumn>
          {layer.name}
        </TableRowColumn>
     ) : (
       <TableRowColumn />
     )}

      { layer.attribution ? (
        <TableRowColumn style={CopyrightComponent.labNameStyle}>
          { layer.copyrightURL ? (
            <a href={layer.copyrightURL} target="_blank">
              <span dangerouslySetInnerHTML={{ __html: layer.attribution }} />
            </a>
		) : (
  <span dangerouslySetInnerHTML={{ __html: layer.attribution }} />
		)}
        </TableRowColumn>
      ) : (
        <TableRowColumn style={CopyrightComponent.labNameStyle} />
      )}
    </TableRow>
  )

  render() {
    const { scenario } = this.props
    return (
      <Modal
        title={
          <CardTitle
            title={this.context.intl.formatMessage({ id: 'page.copyright.title' }, { title: get(scenario, 'title', '') })}
            truncateTitle
          />
        }
        onClose={this.props.closeCopyright}
        mounted={this.props.mounted}
        hasSubtitle={false}
      >
        <div>
          <CardText>
            <Table
              fixedHeader={false}
              fixedFooter={false}
              selectable={false}
            >
              <TableHeader
                displaySelectAll={false}
                adjustForCheckbox={false}
                enableSelectAll={false}
              >
                <TableRow>
                  <TableHeaderColumn>{this.context.intl.formatMessage({ id: 'page.copyright.layer-name' })}</TableHeaderColumn>
                  <TableHeaderColumn>{this.context.intl.formatMessage({ id: 'page.copyright.copyright' })}</TableHeaderColumn>
                </TableRow>
              </TableHeader>
              <TableBody
                displayRowCheckbox={false}
                deselectOnClickaway={false}
              >
                {map(this.props.layerList, layer => (
					this.getLayerCopyrights(layer)
				))}
                {map(this.props.globalLayerList, layer => (
					this.getLayerCopyrights(layer)
                ))}
              </TableBody>
            </Table>


            <CardActions style={CopyrightComponent.actionWrapperStyle}>
              <RaisedButton
                label={this.context.intl.formatMessage({ id: 'page.actions.close' })}
                onClick={this.props.closeCopyright}
                style={CopyrightComponent.buttonStyle}
              />
            </CardActions>
          </CardText>
        </div>
      </Modal>
    )
  }
}

export default CopyrightComponent
