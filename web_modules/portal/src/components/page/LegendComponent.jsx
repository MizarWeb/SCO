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
import isEmpty from 'lodash/isEmpty'
import { CardTitle, Modal } from '@sco/components'
import { Shapes } from '@sco/domain'
import { CardActions, CardText } from 'material-ui/Card'
import Subheader from 'material-ui/Subheader'
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
 * Display the legend in full size
 * @author Léo Mieulet
 */
export class LegendComponent extends React.Component {
  static propTypes = {
    closeLegend: PropTypes.func.isRequired,
    mounted: PropTypes.bool.isRequired,
    scenario: Shapes.Scenario,
    layerList: Shapes.LayerList,
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
  static legendWrapperStyle = {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: '10px',
  }
  static titleStyle = {
    fontWeight: '700',
    margin: '10px 0 15px',
  }
  static noticeWrapperStyle = {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
  }
  static noticeStyle = {
    marginBottom: '10px',
  }
  static subHeaderStyle = {
    color: 'black',
    textAlign: 'center',
    fontWeight: 700,
  }

  getLayerCopyrights = layer => (
    <TableRow key={layer.id}>
      <TableRowColumn>
        {layer.name}
      </TableRowColumn>
      <TableRowColumn>
        {layer.copyrightURL ? (
          <a href={layer.copyrightURL} target="_blank">
            <span dangerouslySetInnerHTML={{ __html: layer.attribution }} />
          </a>
        ) : (
          <span dangerouslySetInnerHTML={{ __html: layer.attribution }} />
          )}
      </TableRowColumn>
    </TableRow>
  )
  render() {
    const { scenario } = this.props
    return (
      <Modal
        title={
          <CardTitle
            title={this.context.intl.formatMessage({ id: 'page.legend.title' }, { title: get(scenario, 'title', '') })}
            truncateTitle
          />
        }
        onClose={this.props.closeLegend}
        mounted={this.props.mounted}
        hasSubtitle={false}
      >
        <div>
          <CardText>
            {!!scenario && !isEmpty(scenario.notice) ? (
              <div style={LegendComponent.noticeWrapperStyle}>
                <span style={LegendComponent.titleStyle}>{this.context.intl.formatMessage({ id: 'page.legend.scenario-notice.title' })}</span><br />
                {/* eslint-disable-next-line react/no-danger */}
                <span style={LegendComponent.noticeStyle} dangerouslySetInnerHTML={{ __html: this.props.scenario.notice }} />
              </div>
            ) : null}
            {!!scenario && !isEmpty(scenario.legend) ? (
              <div style={LegendComponent.legendWrapperStyle}>
                <span style={LegendComponent.titleStyle}>{scenario.legend.title}</span>
                <img
                  src={scenario.legend.url}
                  alt=""
                />
              </div>
            ) : null}
            <Subheader style={LegendComponent.subHeaderStyle}>{this.context.intl.formatMessage({ id: 'page.legend.layer-copyright.title' })}</Subheader>
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
                  <TableHeaderColumn>{this.context.intl.formatMessage({ id: 'page.legend.layer-copyright.layer-name' })}</TableHeaderColumn>
                  <TableHeaderColumn>{this.context.intl.formatMessage({ id: 'page.legend.layer-copyright.copyright' })}</TableHeaderColumn>
                </TableRow>
              </TableHeader>
              <TableBody
                displayRowCheckbox={false}
                deselectOnClickaway={false}
              >
                {map(this.props.layerList, layer => (
                  this.getLayerCopyrights(layer)
                ))}
              </TableBody>
            </Table>


            <CardActions style={LegendComponent.actionWrapperStyle}>
              <RaisedButton
                label={this.context.intl.formatMessage({ id: 'page.actions.close' })}
                onClick={this.props.closeLegend}
                style={LegendComponent.buttonStyle}
              />
            </CardActions>
          </CardText>
        </div>
      </Modal>
    )
  }
}

export default LegendComponent
