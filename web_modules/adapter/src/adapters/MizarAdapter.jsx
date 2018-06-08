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
import get from 'lodash/get'
import forEach from 'lodash/forEach'
import debounce from 'lodash/debounce'
import find from 'lodash/find'
import some from 'lodash/some'
import findIndex from 'lodash/findIndex'
import size from 'lodash/size'
import has from 'lodash/has'
import orderBy from 'lodash/orderBy'
import isEmpty from 'lodash/isEmpty'
import isEqual from 'lodash/isEqual'
import isDate from 'lodash/isDate'
import { Shapes, PeriodUtils, TEMPORAL_TYPE_ENUM, LOCALES_ENUM_VALUES } from '@sco/domain'
import './MizarLoader'
import './rconfig'
import MizarError from './MizarError'
import './Mizar.css'
/**
 * Mizar Adapter
 */
export default class MizarAdapter extends React.Component {
  static propTypes = {
    currentLocale: PropTypes.oneOf(LOCALES_ENUM_VALUES),
    thematicList: Shapes.ThematicList.isRequired,
    baseLayerList: Shapes.LayerList.isRequired,
    scenarioList: Shapes.ScenarioList.isRequired,
    currentScenario: Shapes.Scenario,
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
    handleStartLoadingLayer: PropTypes.func.isRequired,
    handleStopLoadingLayer: PropTypes.func.isRequired,
  }

  static canvaStyle = {
    border: 'none',
    margin: 0,
    padding: 0,
  }

  static hiddenWrapperStyle = {
    display: 'none',
  }

  static compassStyle = {
    pointerEvents: 'auto',
    overflow: 'hidden',
    position: 'absolute',
    right: '18px',
    // top value is handled by CSS (media query)
  }

  static preventEventToPassThroughStyle = {
    position: 'absolute',
    width: '100%',
    height: '100%',
    // active event listener on that empty layer- Mizar can't receive event if this layer is active
    pointerEvents: 'auto',
  }
  static positionWrapperStyle = {
    position: 'absolute',
    right: '135px',
    top: '112px',
    backgroundColor: 'white',
    fontFamily: 'Roboto, sans-serif',
    color: 'rgba(0, 0, 0, 0.40)',
    lineHeight: '1.5em',
  }
  static elevationWrapperStyle = {
    position: 'absolute',
    right: '135px',
    top: '140px',
    backgroundColor: 'white',
    fontFamily: 'Roboto, sans-serif',
    color: 'rgba(0, 0, 0, 0.40)',
    lineHeight: '1.5em',
  }
  static elevationStyle = {
    margin: '0 10px',
  }
  state = {
    showCompass: false,
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
    // ignore local changes
    if (this.props.currentLocale !== nextProps.currentLocale) {
      return
    }

    // center on the scenario when changed
    if (this.props.centerToScenarioId !== nextProps.centerToScenarioId
      && !isEmpty(nextProps.centerToScenarioId)) {
      this.moveToScenario(nextProps.centerToScenarioId)
    }

    // detect that we need to load / remove a scenario
    if (!isEqual(this.props.currentScenario, nextProps.currentScenario) ||
      !isEqual(this.props.showScenarioLayers, nextProps.showScenarioLayers)) {
      // Remove current scenario layers if there is
      if (!isEmpty(this.props.currentScenario)) {
        this.removeScenarioLayers(this.props.currentScenario, this.props.rasterList, this.props.layerList)
      }
      // load the next scenario layers
      if (!isEmpty(nextProps.currentScenario) && nextProps.showScenarioLayers) {
        this.loadScenario(nextProps.currentScenario)
      }
    }

    // detect if there is a change in temporal infos
    if (!isEqual(this.props.layerTemporalInfos, nextProps.layerTemporalInfos) && isDate(nextProps.layerTemporalInfos.currentDate) &&
      !isEqual(this.props.layerTemporalInfos.currentDate, nextProps.layerTemporalInfos.currentDate)) {
      this.changeTime(nextProps.layerTemporalInfos)
    }

    // detect if there is a change in a layer parameter
    if (!isEqual(this.props.layerParameters, nextProps.layerParameters) && !isEmpty(nextProps.layerParameters)) {
      this.changeParameter(nextProps.layerParameters)
    }

    // detect if there is a change in the list of layer (opacity/order)
    if (!isEqual(this.props.layerList, nextProps.layerList) && size(this.props.layerList) === size(nextProps.layerList)) {
      this.updateScenarioLayers(this.props.layerList, nextProps.layerList)
    }
  }

  changeTime = (layerTemporalInfos) => {
    const {
      currentDate, endDate, type,
    } = layerTemporalInfos
    switch (type) {
      case TEMPORAL_TYPE_ENUM.PERIOD: {
        let nextDate = PeriodUtils.getNextDate(layerTemporalInfos)
        if (nextDate.getTime() > endDate.getTime()) {
          nextDate = endDate
        }
        // Remove 1 millisecond to the nextDate
        nextDate.setTime(nextDate.getTime() - 1)
        this.mizar.setTime({
          from: currentDate.toISOString(),
          to: nextDate.toISOString(),
        })
        break
      }
      case TEMPORAL_TYPE_ENUM.MULTIPLE_VALUES: {
        const periodAsString = `${currentDate.toISOString()}`
        this.mizar.setTime(periodAsString)
        break
      }
      default:
        throw new Error(`Unexpected temporal type "${type}"`)
    }
    // The scenario can receive events every times the time change
    if (has(this.props.currentScenario, 'hook.onTimeChange')) {
      this.props.currentScenario.hook.onTimeChange(this.mizar, currentDate, this.props)
    }
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
  updateScenarioLayers = (currentLayers, nextLayers) => {
    // detect if there is a change in the layer order
    const hasChangedOrder = some(nextLayers, (nextLayer) => {
      const previousConfLayer = find(currentLayers, currentLayer => (
        currentLayer.id === nextLayer.id
      ))
      return previousConfLayer.order !== nextLayer.order
    })
    if (hasChangedOrder) {
      const newLayersOrdered = orderBy(nextLayers, 'order')
      forEach(newLayersOrdered, (newLayersOrder) => {
        this.mizar.setLayerOnTheTop(newLayersOrder.id)
      })
    }

    // adapt layer opacity
    forEach(nextLayers, (nextLayer) => {
      const previousConfLayer = find(currentLayers, currentLayer => (
        currentLayer.id === nextLayer.id
      ))
      if (previousConfLayer.opacity !== nextLayer.opacity) {
        this.mizar.getLayerByID(nextLayer.id).setOpacity(nextLayer.opacity)
      }
    })
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
    // detect if the scenario has its own Elevation layer
    const scenarioElevationLayer = find(this.props.currentScenario.layers, scenarioLayer => (
      scenarioLayer.type === this.Mizar.LAYER.WCSElevation
    ))
    if (scenarioElevationLayer) {
      // find the name of the elevation layer and reactive it
      const elevationLayer = find(this.props.baseLayerList, baseLayer => (
        baseLayer.type === this.Mizar.LAYER.WCSElevation
      ))
      if (elevationLayer) {
        this.mizar.setBaseElevation(elevationLayer.name)
      }
    }
  }

  /**
   * Called after Mizar loaded base layers
   */
  handleLoaded = () => {
    this.mizar.getActivatedContext().unsubscribe(this.Mizar.EVENT_MSG.BASE_LAYERS_READY, this.handleLoaded)
    this.setState({
      showCompass: true,
    })
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
        if (scenario && scenario.id !== get(this.props.currentScenario, 'id')) {
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
    const baseLayer = this.mizar.getLayerByID(layerId)
    if (baseLayer.type === this.Mizar.LAYER.WCSElevation) {
      this.mizar.setBaseElevation(baseLayer.name)
    }
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
    const layer = this.mizar.getLayerByID(layerId)
    // A scenario can contain an elevation layer, so use it if that's the case
    if (layer.type === this.Mizar.LAYER.WCSElevation) {
      this.mizar.setBaseElevation(layer.name)
    }
    const order = findIndex(this.mizar.getAllLayers(), l => (l.getID() === layerId))
    const layerInfo = {
      order,
      id: layerId,
      name: layer.name,
      scenarioId: scenario.id,
      opacity: layer.style.opacity,
      type: 'LAYER',
      attribution: layer.getAttribution(),
      copyrightURL: layer.getCopyrightUrl(),
    }
    if (layer.hasDimension()) {
      const dimension = layer.getDimensions()
      if (dimension.time) {
        layerInfo.period = dimension.time.value
      }
    }
    // handle initial scenario parameter
    if (scenario.parameter && layer.options.hasParameter && !isEmpty(this.props.layerParameters)) {
      const value = scenario.parameter.formatValue(this.props.layerParameters.value)
      layer.setParameter(this.props.layerParameters.attrName, value)
      this.mizar.reloadLayer(layer)
    }
    this.props.saveLayerInfo(layerInfo)
  }

  /**
   * Called when a zoomTo has ended
   */
  handleEndCenterTo = () => {
    const scenario = find(this.props.scenarioList, s => (
      s.id === this.props.centerToScenarioId
    ))
    if (has(scenario, 'resetCameraRotation')) {
      //rotate the camera (heading, tilt)
      this.mizar.getActivatedContext().navigation.rotate(scenario.resetCameraRotation.heading, scenario.resetCameraRotation.tilt)
    }
    // subscribe to navigation events
    this.mizar.getActivatedContext().subscribe(this.Mizar.EVENT_MSG.NAVIGATION_MODIFIED, this.handleNavigationModified)
    this.props.handleEndCenterTo()
  }

  handleMapServerError = () => {
    throw new Error('Some base server is not working')
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
        isMobile: true, // connect Mizar to touch events whatever the platform
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
      this.mizar.addLayer(baseLayer, this.handleBaseLayerAdded, this.handleMapServerError)
    })
    // create a layer with a POI for every scenario
    forEach(this.props.scenarioList, (scenario) => {
      const currentThematic = find(this.props.thematicList, thematic => (
        thematic.id === scenario.thematic
      ))
      const options = {
        category: 'SCO',
        type: 'GeoJSON',
        pointMaxSize: 40,
        visible: scenario.initialPOILayerVisibility,
        opacity: 100,
        pickable: true,
        name: currentThematic.name,
        color: currentThematic.color,
        // this layer contains POI that we can click on, so provide option to not use DEM on that POI interpolation
        pickingNoDEM: true,
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
    this.mizar.getActivatedContext().subscribe(this.Mizar.EVENT_MSG.LAYER_START_LOAD, this.props.handleStartLoadingLayer)
    this.mizar.getActivatedContext().subscribe(this.Mizar.EVENT_MSG.LAYER_END_LOAD, this.props.handleStopLoadingLayer)
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
        className="hidden-xs"
        style={MizarAdapter.elevationWrapperStyle}
      >
        <div
          id="posTracker"
          style={MizarAdapter.elevationStyle}
        />
      </div>,
      <div
        key="tmp-02"
        className="hidden-xs"
        style={MizarAdapter.positionWrapperStyle}
      >
        <div
          id="elevTracker"
          style={MizarAdapter.elevationStyle}
        />
      </div>,
      <div
        key="tmp-04"
        style={MizarAdapter.hiddenWrapperStyle}
      >
        <div id="timeTravelDiv" />
      </div>,
      <div
        key="tmp-03"
        id="compassDiv"
        style={this.state.showCompass ? MizarAdapter.compassStyle : MizarAdapter.hiddenWrapperStyle}
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
