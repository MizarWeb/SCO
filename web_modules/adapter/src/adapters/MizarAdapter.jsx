/**
 * Copyright 2017 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import forEach from 'lodash/forEach'
import debounce from 'lodash/debounce'
import find from 'lodash/find'
import findIndex from 'lodash/findIndex'
import size from 'lodash/size'
import has from 'lodash/has'
import isEmpty from 'lodash/isEmpty'
import isEqual from 'lodash/isEqual'
import isDate from 'lodash/isDate'
import { Shapes, PeriodUtils } from '@sco/domain'
import './MizarLoader'
import './rconfig'
import MizarError from './MizarError'

/**
 * Mizar Adapter
 */
export default class MizarAdapter extends React.Component {
  static propTypes = {
    thematicList: Shapes.ThematicList.isRequired,
    baseLayerList: Shapes.LayerList.isRequired,
    scenarioList: Shapes.ScenarioList.isRequired,
    currentScenario: Shapes.Scenario.isRequired,
    centerToScenarioId: PropTypes.string.isRequired,
    listenUserEvent: PropTypes.bool.isRequired,
    rasterList: Shapes.LayerList,
    layerList: Shapes.LayerList,
    showScenarioLayers: PropTypes.bool.isRequired,
    layerTemporalInfos: Shapes.LayerTemporalInfos,
    layerParameters: Shapes.LayerParameters,

    onMizarLibraryLoaded: PropTypes.func.isRequired,
    onMizarBaseLayersLoaded: PropTypes.func.isRequired,
    showScenarioInfo: PropTypes.func.isRequired,
    handleEndCenterTo: PropTypes.func.isRequired,
    handleRandomMovement: PropTypes.func.isRequired,
    saveLayerInfo: PropTypes.func.isRequired,
  }

  static canvaStyle = {
    border: 'none',
    margin: 0,
    padding: 0,
  }

  static hiddenWrapperStyle = {
    display: 'none',
  }

  static preventEventToPassThroughStyle = {
    position: 'absolute',
    width: '100%',
    height: '100%',
    // active event listener on that empty layer- Mizar can't receive event if this layer is active
    pointerEvents: 'auto',
  }

  /**
   * Mizar current instance
   */
  // eslint-disable-next-line react/sort-comp
  mizar = null

  componentWillMount() {
    if (process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'coverage') {
      // Do nothing
    } else {
      // load required elements
      window.requirejs(['Mizar'], this.loadMizar)
    }
  }

  /**
   * Track some props change to implement map behaviors
   * @param {*} nextProps
   */
  componentWillReceiveProps(nextProps) {
    // center on the scenario when changed
    if (this.props.centerToScenarioId !== nextProps.centerToScenarioId
      && !isEmpty(nextProps.centerToScenarioId)) {
      console.error('CENTERING')
      this.moveToScenario(nextProps.centerToScenarioId)
    }

    // detect that we need to load / remove a scenario
    if (!isEqual(this.props.currentScenario, nextProps.currentScenario) ||
      !isEqual(this.props.showScenarioLayers, nextProps.showScenarioLayers)) {
      console.error('SWITCH SCENARIO')
      // Remove current scenario layers if there is
      if (!isEmpty(this.props.currentScenario)) {
        console.error('UNCHARGING LAYER FOR PREVIOSU SCENAR')
        this.removeScenarioLayers(this.props.currentScenario, this.props.rasterList, this.props.layerList)
      }
      // load the next scenario layers
      if (!isEmpty(nextProps.currentScenario) && nextProps.showScenarioLayers) {
        console.error('LOADING SCENAR')
        this.loadScenario(nextProps.currentScenario)
      }
    }

    // detect if there is a change in temporal infos
    if (!isEqual(this.props.layerTemporalInfos, nextProps.layerTemporalInfos) &&
      isDate(nextProps.layerTemporalInfos.currentDate) && isDate(this.props.layerTemporalInfos.currentDate)) {
      this.changeTime(nextProps.layerTemporalInfos)
    }

    // detect if there is a change in a layer parameter
    if (!isEqual(this.props.layerParameters, nextProps.layerParameters) && !isEmpty(nextProps.layerParameters)) {
      this.changeParameter(nextProps.layerParameters)
    }
  }

  changeTime = ({ currentDate, step, endDate }) => {
    let nextDate = PeriodUtils.getNextDate(currentDate, step)
    if (nextDate.getTime() > endDate.getTime()) {
      nextDate = endDate
    }
    const periodAsString = `${currentDate.toISOString()}/${nextDate.toISOString()}`
    this.mizar.setTime(periodAsString)
  }

  /**
   * Find the scenario layer having the parameter and apply the updated value
   */
  changeParameter = (layerParameters) => {
    forEach(this.props.layerList, (layer) => {
      const mizarScenarioLayer = this.mizar.getLayerByID(layer.id)
      if (mizarScenarioLayer.options.hasParameter) {
        const value = this.props.currentScenario.parameter.formatValue(layerParameters.value)
        mizarScenarioLayer.setParameter(layerParameters.attrName, value)
        this.mizar.reloadLayer(mizarScenarioLayer)
      }
    })
  }

  /**
   * @author Michael Zaporozhets https://stackoverflow.com/a/11381730/2294168
   * @return {bool} true when the device is a mobile
   */
  isMobile = () => {
    let check = false;
    (function (a) {
      if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw-(n|u)|c55\/|capi|ccwa|cdm-|cell|chtm|cldc|cmd-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc-s|devi|dica|dmob|do(c|p)o|ds(12|-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(-|_)|g1 u|g560|gene|gf-5|g-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd-(m|p|t)|hei-|hi(pt|ta)|hp( i|ip)|hs-c|ht(c(-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i-(20|go|ma)|i230|iac( |-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|-[a-w])|libw|lynx|m1-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|-([1-8]|c))|phil|pire|pl(ay|uc)|pn-2|po(ck|rt|se)|prox|psio|pt-g|qa-a|qc(07|12|21|32|60|-[2-7]|i-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h-|oo|p-)|sdk\/|se(c(-|0|1)|47|mc|nd|ri)|sgh-|shar|sie(-|m)|sk-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h-|v-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl-|tdg-|tel(i|m)|tim-|t-mo|to(pl|sh)|ts(70|m-|m3|m5)|tx-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas-|your|zeto|zte-/i.test(a.substr(0, 4))) {
        check = true
      }
    }(navigator.userAgent || navigator.vendor || window.opera))
    return check
  }


  /**
   * load scenario layers
   */
  loadScenario = (scenario) => {
    forEach(scenario.layers, (layer) => {
      this.mizar.addLayer(layer, (layerInfo) => { this.handleNewScenarioLayer(layerInfo, scenario) })
    })
  }

  removeScenarioLayers = (scenario, rasterList, layerList) => {
    forEach(layerList, (layer) => {
      this.mizar.removeLayer(layer.id)
    })
  }

  /**
   * Called after Mizar loaded base layers
   */
  handleLoaded = () => {
    this.props.onMizarBaseLayersLoaded()
    this.postMizarLoad()
  }

  /**
   * Event listener (debounced) that catch Mizar.EVENT_MSG.NAVIGATION_MODIFIED
   * Note that we do not listen these events while it zoomTo a scenario
   */
  handleNavigationModified = debounce(() => {
    this.props.handleRandomMovement()
  }, 200)

  /**
   * Event listener that catch clicks on the mizar canva
   */
  handleMouseUp = (event) => {
    const mizarInternalLocation = this.mizar.getActivatedContext().getLonLatFromPixel(event.pageX, event.pageY)
    this.handleUserInteraction(mizarInternalLocation)
  }

  /**
   * Event listener that catch touches on the mizar canva
   */
  handleTouchEnd = (event) => {
    if (size(event.changedTouches) === 1) {
      const mizarInternalLocation = this.mizar.getActivatedContext().getLonLatFromPixel(event.changedTouches[0].pageX, event.changedTouches[0].pageY)
      this.handleUserInteraction(mizarInternalLocation)
    }
  }

  /**
   * Common algorithm to detect if the user wants to open a scenario
   */
  handleUserInteraction = (mizarInternalLocation) => {
    // Defined if we clicked inside the map
    if (mizarInternalLocation) {
      const picking = this.mizar.getServiceByName(this.Mizar.SERVICE.PickingManager)
      const selection = picking.computeFilterPickSelection(mizarInternalLocation)
      if (selection && size(selection) === 1 && has(selection[0], 'feature.properties.scenarioId')) {
        const { scenarioId } = selection[0].feature.properties
        const scenario = find(this.props.scenarioList, s => s.id === scenarioId)
        // Defined if there is a feature where the user clicked
        if (scenario) {
          this.props.showScenarioInfo(scenario.id)
        }
      }
    }
  }

  handleInitialZoomTo = () => {
    // check if the user didn't already ask for a scenario
    if (isEmpty(this.props.centerToScenarioId)) {
      // subscribe to navigation events
      this.mizar.getActivatedContext().subscribe(this.Mizar.EVENT_MSG.NAVIGATION_MODIFIED, this.handleNavigationModified)
    }
  }

  /**
   * Called every time a base layer is added
   */
  handleBaseLayerAdded = (layerId) => {
    console.error('handleBaseLayerAdded', layerId)
  }

  /**
   * Called every time a scenario layer is added
   */
  handleAddPoiInsideLayer = (layerId, scenario) => {
    const climateLayer = this.mizar.getLayerByID(layerId)
    const feature = this.generateFeature(scenario.poi.lon, scenario.poi.lat, scenario.id)
    climateLayer.addFeatureCollection(feature)
  }


  handleNewScenarioLayer = (layerId, scenario) => {
    console.error('handleBaseLayerAdded', layerId)
    const layer = this.mizar.getLayerByID(layerId)
    const order = findIndex(this.mizar.getAllLayers(), l => (l.getID() === layerId))
    const layerInfo = {
      order,
      id: layerId,
      name: layer.name,
      scenarioId: scenario.id,
      opacity: layer.opacity,
      type: 'LAYER',
    }
    if (layer.hasDimension()) {
      const dimension = layer.getDimensions()
      if (dimension.time) {
        layerInfo.period = dimension.time.value
        console.log(`time from API:${dimension.time.value}`)
      }
    }
    this.props.saveLayerInfo(layerInfo)
  }
  /**
   * Called when a zoomTo has ended
   */
  handleEndCenterTo = () => {
    // subscribe to navigation events
    this.mizar.getActivatedContext().subscribe(this.Mizar.EVENT_MSG.NAVIGATION_MODIFIED, this.handleNavigationModified)
    this.props.handleEndCenterTo()
  }


  generateFeature = (lon, lat, scenarioId) => ({
    type: 'FeatureCollection',
    features: [
      {
        geometry: { type: 'Point', coordinates: [lon, lat] },
        type: 'Feature',
        properties: {
          scenarioId,
        },
      },
    ],
  })

  /**
   * Called when the Mizar library is loaded
   * Run mizar and save the instance
   */
  loadMizar = (Mizar) => {
    this.Mizar = Mizar
    this.props.onMizarLibraryLoaded()
    const mizarDiv = document.getElementById('MizarCanvas')

    const planetContext = {
      category: 'Planets',
      type: 'Planet',
      name: 'Earth',
      coordinateSystem: {
        geoideName: Mizar.CRS.WGS84,
      },
      visible: true,
    }

    // Create Mizar
    this.mizar = new Mizar({
      canvas: mizarDiv,
      configuration: {
        mizarBaseUrl: 'localhost/Mizar',
        debug: false,
        inertia: true,
        isMobile: this.isMobile(),
        positionTracker: false,
        elevationTracker: false,
        registry: false,
        proxyUse: false,
        proxyUrl: '',
      },
      planetContext,
    })

    // load base layers
    forEach(this.props.baseLayerList, (baseLayer) => {
      this.mizar.addLayer(baseLayer, this.handleBaseLayerAdded)
      if (baseLayer.type === Mizar.LAYER.WCSElevation) {
        this.mizar.setBaseElevation(baseLayer.name)
      }
    })
    // load every scenario
    forEach(this.props.scenarioList, (scenario) => {
      const currentThematic = find(this.props.thematicList, thematic => (
        thematic.id === scenario.thematic
      ))
      const options = {
        category: 'SCO',
        type: 'GeoJSON',
        pointMaxSize: 40,
        visible: scenario.initialVisibility,
        opacity: 100,
        pickable: true,
        name: currentThematic.name,
        color: currentThematic.color,
      }
      this.mizar.addLayer(options, (layerId) => { this.handleAddPoiInsideLayer(layerId, scenario) })
    })

    this.mizar.getActivatedContext().subscribe(Mizar.EVENT_MSG.BASE_LAYERS_READY, this.handleLoaded)
  }

  /**
   * Run some actions after Mizar successfully loaded
   */
  postMizarLoad = () => {
    this.mizar.getActivatedContext().navigation.zoomTo([116.217, 29.15], {
      callback: this.handleInitialZoomTo,
    })
  }

  /**
   * The reducer ask the map to center on that scenario
   */
  moveToScenario = (currentScenarioId) => {
    const scenario = find(this.props.scenarioList, s => (
      s.id === currentScenarioId
    ))
    if (scenario) {
      // unsubscribe to navigation event while centering to a point
      this.mizar.getActivatedContext().unsubscribe(this.Mizar.EVENT_MSG.NAVIGATION_MODIFIED, this.handleNavigationModified)
      this.mizar.getActivatedContext().navigation.zoomTo([scenario.poi.lon, scenario.poi.lat], {
        callback: this.handleEndCenterTo,
        // duration: 1000,
        distance: scenario.centerToDistance,
      })
    }
  }

  render() {
    return [
      this.props.listenUserEvent ? null :
        (
          <div
            key="prevent-event"
            style={MizarAdapter.preventEventToPassThroughStyle}
          />
        ),
      <div
        key="error-webgl"
        id="webGLNotAvailable"
        style={MizarAdapter.hiddenWrapperStyle}
      >
        <MizarError />
      </div>,
      <div
        key="tmp-01"
        id="posTracker"
        style={MizarAdapter.hiddenWrapperStyle}
      />,
      <div
        key="tmp-02"
        id="elevTracker"
        style={MizarAdapter.hiddenWrapperStyle}
      />,
      <canvas
        key="canvas"
        id="MizarCanvas"
        style={MizarAdapter.canvaStyle}
        onMouseUp={this.handleMouseUp}
        onTouchEnd={this.handleTouchEnd}
      />,
    ]
  }
}
