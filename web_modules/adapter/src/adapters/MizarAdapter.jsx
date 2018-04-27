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
        id="posTracker"
        style={MizarAdapter.hiddenWrapperStyle}
      />,
      <div
        key="tmp-02"
        id="elevTracker"
        style={MizarAdapter.hiddenWrapperStyle}
      />,
      <div
        key="tmp-03"
        id="compassDiv"
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
