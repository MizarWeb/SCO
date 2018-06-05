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
import reverse from 'lodash/reverse'
import sortBy from 'lodash/sortBy'
import map from 'lodash/map'
import isUndefined from 'lodash/isUndefined'
import find from 'lodash/find'
import reject from 'lodash/reject'
import size from 'lodash/size'
import isEqual from 'lodash/isEqual'
import { CardTitle, Modal } from '@sco/components'
import { Shapes } from '@sco/domain'
import { CardActions, CardText } from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'
import Subheader from 'material-ui/Subheader'
import IconButton from 'material-ui/IconButton'
import DownIcon from 'material-ui/svg-icons/hardware/keyboard-arrow-down'
import UpIcon from 'material-ui/svg-icons/hardware/keyboard-arrow-up'
import Slider from 'material-ui/Slider'
import Divider from 'material-ui/Divider'

const TYPE = {
  LAYER: 'LAYER',
  RASTER: 'RASTER',
}
/**
 * Display the list of active layers for the current scenario
 * let the user manage deeply these layers
 * @author Léo Mieulet
 */
export class LayerManagerComponent extends React.Component {
  static propTypes = {
    closeLayerManager: PropTypes.func.isRequired,
    updateLayerInfos: PropTypes.func.isRequired,
    mounted: PropTypes.bool.isRequired,
    rasterList: Shapes.LayerList,
    layerList: Shapes.LayerList,
    scenario: Shapes.Scenario,
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
  static lineStyle = {
    display: 'flex',
    alignItems: 'center',
  }
  static lineNameStyle = {
    flexGrow: '6',
    display: 'flex',
    alignItems: 'center',
  }
  static lineOpacityStyle = {
    flexGrow: '2',
    width: '50',
  }
  static sliderWrapperStyle = {
    marginTop: 12,
  }
  static sliderStyle = {
    marginTop: 5,
    marginBottom: 20,
  }
  static sliderLegendStyle = {
    fontSize: '0.8em',
    color: '#00AAFF',
    display: 'flex',
    justifyContent: 'space-between',
    fontStyle: 'italic',
  }

  static titlePartLineStyle = {
    display: 'flex',
    alignItems: 'center',
  }

  constructor(props) {
    super(props)
    this.state = {
      rasterList: reverse(sortBy(props.rasterList, ['order'])),
      layerList: reverse(sortBy(props.layerList, ['order'])),
    }
  }
  componentWillReceiveProps(nextProps) {
    if (!isEqual(nextProps.rasterList, this.props.rasterList)
      || !isEqual(nextProps.layerList, this.props.layerList)
      || nextProps.mounted !== this.props.mounted) {
      this.setState({
        rasterList: reverse(sortBy(nextProps.rasterList, ['order'])),
        layerList: reverse(sortBy(nextProps.layerList, ['order'])),
      })
    }
  }
  isUpperDisabled = (layer, layerList) => (
    isUndefined(find(layerList, l => (l.order > layer.order)))
  )
  isDownDisabled = (layer, layerList) => (
    isUndefined(find(layerList, l => (l.order < layer.order)))
  )
  submitForm = () => {
    this.props.updateLayerInfos(this.state.layerList, this.state.rasterList)
    this.props.closeLayerManager()
  }
  handleUp = (layer, type) => {
    const { layerList, rasterList } = this.state
    let newLayers
    // remove the old entity
    if (type === TYPE.RASTER) {
      newLayers = reject(rasterList, l => (l.name === layer.name))
    } else {
      newLayers = reject(layerList, l => (l.name === layer.name))
    }
    // Reverse the list before finding the first entity, otherwise it wouldn't be the closer one
    const swappedLayer = find(reverse(newLayers), l => (l.order > layer.order))
    // remove the swapped layer too
    newLayers = reject(newLayers, l => (l.name === swappedLayer.name))

    // add the updated entity and the swapped entity
    newLayers.push({
      ...layer,
      order: swappedLayer.order,
    })
    newLayers.push({
      ...swappedLayer,
      order: layer.order,
    })
    // save the entity
    if (type === TYPE.RASTER) {
      this.setState({
        rasterList: reverse(sortBy(newLayers, ['order'])),
      })
    } else {
      this.setState({
        layerList: reverse(sortBy(newLayers, ['order'])),
      })
    }
  }
  handleDown = (layer, type) => {
    const { layerList, rasterList } = this.state
    let newLayers
    // remove the old entity
    if (type === TYPE.RASTER) {
      newLayers = reject(rasterList, l => (l.name === layer.name))
    } else {
      newLayers = reject(layerList, l => (l.name === layer.name))
    }
    const swappedLayer = find(newLayers, l => (l.order < layer.order))
    // remove the swapped layer too
    newLayers = reject(newLayers, l => (l.name === swappedLayer.name))

    // add the updated entity and the swapped entity
    newLayers.push({
      ...layer,
      order: swappedLayer.order,
    })
    newLayers.push({
      ...swappedLayer,
      order: layer.order,
    })
    // save the entity
    if (type === TYPE.RASTER) {
      this.setState({
        rasterList: reverse(sortBy(newLayers, ['order'])),
      })
    } else {
      this.setState({
        layerList: reverse(sortBy(newLayers, ['order'])),
      })
    }
  }
  handleChangeOpacity = (layer, value, type) => {
    const { layerList, rasterList } = this.state
    let newLayers
    // remove the old entity
    if (type === TYPE.RASTER) {
      newLayers = reject(rasterList, l => (l.name === layer.name))
    } else {
      newLayers = reject(layerList, l => (l.name === layer.name))
    }
    // add the updated entity
    newLayers.push({
      ...layer,
      opacity: value,
    })
    // save the entity
    if (type === TYPE.RASTER) {
      this.setState({
        rasterList: reverse(sortBy(newLayers, ['order'])),
      })
    } else {
      this.setState({
        layerList: reverse(sortBy(newLayers, ['order'])),
      })
    }
  }
  renderLine = (layer, layerList, type) => (
    <div key={layer.name} className="col-xs-100">
      <div className="col-xs-100 col-sm-60" style={LayerManagerComponent.titlePartLineStyle} >
        <div>
          <IconButton
            disabled={this.isUpperDisabled(layer, layerList)}
            onClick={() => { this.handleUp(layer, type) }}
          >
            <UpIcon />
          </IconButton>
          <IconButton
            disabled={this.isDownDisabled(layer, layerList)}
            onClick={() => { this.handleDown(layer, type) }}
          >
            <DownIcon />
          </IconButton>
        </div>
        <div >
          {layer.name}
        </div>
      </div>
      <div className="col-xs-100 col-sm-40" >
        <div style={LayerManagerComponent.sliderLegendStyle}>
          <span>{this.context.intl.formatMessage({ id: 'page.layer-manager.transparent' })}</span>
          <span>{this.context.intl.formatMessage({ id: 'page.layer-manager.opaque' })}</span>
        </div>
        <Slider
          step={0.01}
          value={layer.opacity}
          sliderStyle={LayerManagerComponent.sliderStyle}
          onChange={(e, value) => { this.handleChangeOpacity(layer, value, type) }}
        />
      </div>
    </div>
  )

  render() {
    const { scenario } = this.props
    return (
      <Modal
        title={
          <CardTitle
            title={this.context.intl.formatMessage({ id: 'page.layer-manager.title' }, { title: get(scenario, 'title', '') })}
            subtitle={this.context.intl.formatMessage({ id: 'page.layer-manager.subtitle' })}
            truncateTitle
          />
        }
        onClose={this.props.closeLayerManager}
        mounted={this.props.mounted}
        hasSubtitle
      >
        <div>
          <CardText>
            {size(this.state.rasterList) > 0 ? ([
              <Subheader key="title" style={LayerManagerComponent.subheaderStyle}>{this.context.intl.formatMessage({ id: 'page.layer-manager.rasters' }, { size: size(this.state.rasterList) })}</Subheader>,
              <div key="line-form" className="row">
                {map(this.state.rasterList, (layer, index) => [
                  this.renderLine(layer, this.state.rasterList, TYPE.RASTER),
                  index < size(this.state.rasterList) - 1 ? <Divider key="divider" className="col-xs-100" /> : null,
                ])}
              </div>,
            ]) : null}

            {size(this.state.layerList) > 0 ? ([
              <Subheader key="title" style={LayerManagerComponent.subheaderStyle}>{this.context.intl.formatMessage({ id: 'page.layer-manager.layers' }, { size: size(this.state.layerList) })}</Subheader>,
              <div key="line-form" className="row">
                {map(this.state.layerList, (layer, index) => [
                  this.renderLine(layer, this.state.layerList, TYPE.LAYER),
                  index < size(this.state.layerList) - 1 ? <Divider key="divider" className="col-xs-100" /> : null,
                ])}
              </div>,
            ]) : null}
            <CardActions style={LayerManagerComponent.actionWrapperStyle}>
              <RaisedButton
                label={this.context.intl.formatMessage({ id: 'page.actions.save' })}
                onClick={this.submitForm}
                primary
                style={LayerManagerComponent.buttonStyle}
              />
              <RaisedButton
                label={this.context.intl.formatMessage({ id: 'page.actions.close' })}
                onClick={this.props.closeLayerManager}
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
