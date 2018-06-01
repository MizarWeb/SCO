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
import isEmpty from 'lodash/isEmpty'
import { CardTitle, Modal } from '@sco/components'
import { Shapes } from '@sco/domain'
import { CardActions, CardText } from 'material-ui/Card'
import Subheader from 'material-ui/Subheader'
import { List, ListItem } from 'material-ui/List'
import RaisedButton from 'material-ui/RaisedButton'

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
    marginBottom: '25px',
  }
  static titleStyle = {
    fontWeight: '700',
    marginBottom: '25px',
  }

  getLayerCopyrights = (layer) => {
    if (layer.copyrightURL) {
      return (
        <ListItem key={layer.id}>
          <a href={layer.copyrightURL} >
            {/* eslint-disable-next-line react/no-danger */}
            <span dangerouslySetInnerHTML={{ __html: layer.attribution }} />
          </a>
        </ListItem>
      )
    }
    return (
      <ListItem key={layer.id} disabled>
        {/* eslint-disable-next-line react/no-danger */}
        <span dangerouslySetInnerHTML={{ __html: layer.attribution }} />
      </ListItem>
    )
  }
  render() {
    const { scenario } = this.props
    return (
      <Modal
        title={
          <CardTitle
            title={`${get(scenario, 'title', '')} legend`}
            truncateTitle
          />
        }
        onClose={this.props.closeLegend}
        mounted={this.props.mounted}
        hasSubtitle={false}
      >
        <div>
          <CardText>
            {!!scenario && !isEmpty(scenario.legend) ? (
              <div style={LegendComponent.legendWrapperStyle}>
                <span style={LegendComponent.titleStyle}>{scenario.legend.title}</span>
                <img
                  src={scenario.legend.url}
                  alt=""
                />
              </div>
            ) : null}
            {!!scenario && !isEmpty(scenario.notice) ? (
              <div>
                <span style={LegendComponent.titleStyle}>Scenario notice</span><br />
                {/* eslint-disable-next-line react/no-danger */}
                <span dangerouslySetInnerHTML={{ __html: this.props.scenario.notice }} />
              </div>
            ) : null}

            <List>
              <Subheader>List of layers and corresponding copyrights :</Subheader>
              {map(this.props.layerList, layer => (
                this.getLayerCopyrights(layer)
              ))}
            </List>

            <CardActions style={LegendComponent.actionWrapperStyle}>
              <RaisedButton
                label="Close"
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
