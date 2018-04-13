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
import isEmpty from 'lodash/isEmpty'
import { Shapes } from '@sco/domain'
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
    centerToScenarioId: PropTypes.string.isRequired,
    listenUserEvent: PropTypes.bool.isRequired,

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

  state = {
    isZooming: false,
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
      this.moveToScenario(nextProps.centerToScenarioId)
    }
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
   * Called after Mizar loaded base layers
   */
  handleLoaded = () => {
    this.props.onMizarBaseLayersLoaded()
    this.postMizarLoad()
  }

  /**
   * Event listener (debounced) that catch Mizar.EVENT_MSG.NAVIGATION_MODIFIED
   */
  handleNavigationModified = () => {
    const { isZooming } = this.state
    // Don't send the event if we are zoomingTo
    if (isZooming) {
      this.setState({
        isZooming: false,
      })
    } else {
      this.props.handleRandomMovement()
    }
  }

  /**
   * Event listener that catch clicks on the mizar canva
   */
  handleMouseUp = (event) => {
    const mizarInternalLocation = this.mizar.getActivatedContext().getLonLatFromPixel(event.pageX, event.pageY)
    // Defined if we clicked inside the map
    if (mizarInternalLocation) {
      const scenario = find(this.props.scenarioList, s => (
        Math.round(s.poi.lat) === Math.round(mizarInternalLocation[1]) &&
        Math.round(s.poi.lon) === Math.round(mizarInternalLocation[0])
      ))
      // Defined if there is a feature where the user clicked
      if (scenario) {
        this.props.showScenarioInfo(scenario.id)
      }
    }
  }

  handleEndZoomTo = () => {
    console.error('End of zoomTo')
  }

  /**
   * Called every time a base layer is added
   */
  handleBaseLayerAdded = (layerName) => {
    console.error('handleBaseLayerAdded', layerName)
    // TODO : do not handle base layers, just scenario layers
    const fakeScenario = this.props.scenarioList[0]
    const layer = this.mizar.getLayerByID(layerName)
    const layerInfo = {
      name: layerName,
      scenarioId: fakeScenario.id,
      opacity: layer.opacity,
      type: 'LAYER',
    }
    this.props.saveLayerInfo(layerInfo)
    console.error('layer', this.mizar.getLayerByID(layerName))
    console.error('layerInfo', layerInfo)
  }

  /**
   * Called every time a scenario layer is added
   */
  handleNewScenarioLayer = (climateId, scenario) => {
    console.error('climateId', climateId)
    const climateLayer = this.mizar.getLayerByID(climateId)
    const feature = this.generateFeature(scenario.poi.lon, scenario.poi.lat)
    climateLayer.addFeatureCollection(feature)
  }

  generateFeature = (lon, lat) => ({
    type: 'FeatureCollection',
    features: [
      {
        geometry: { type: 'Point', coordinates: [lon, lat] },
        type: 'Feature',
      },
    ],
  })

  /**
   * Called when the Mizar library is loaded
   * Run mizar and save the instance
   */
  loadMizar = (Mizar) => {
    this.props.onMizarLibraryLoaded()
    const mizarDiv = document.getElementById('MizarCanvas')

    const planetContext = {
      category: 'Planets',
      type: 'Planet',
      name: 'Earth',
      coordinateSystem: {
        geoideName: 'EPSG:4326',
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
      this.mizar.addLayer(options, (layerInfo) => { this.handleNewScenarioLayer(layerInfo, scenario) })
    })

    this.mizar.getActivatedContext().subscribe(Mizar.EVENT_MSG.BASE_LAYERS_READY, this.handleLoaded)
    this.mizar.getActivatedContext().subscribe(Mizar.EVENT_MSG.NAVIGATION_MODIFIED, debounce(this.handleNavigationModified, 200))
  }

  /**
   * Run some actions after Mizar successfully loaded
   */
  postMizarLoad = () => {
    this.setState({
      isZooming: true,
    })
    this.mizar.getActivatedContext().navigation.zoomTo([116.217, 29.15], {
      callback: this.handleEndZoomTo,
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
      this.setState({
        isZooming: true,
      })
      this.mizar.getActivatedContext().navigation.zoomTo([scenario.poi.lon, scenario.poi.lat], {
        callback: this.props.handleEndCenterTo,
        // duration: 1000,
      })
    }
  }

  render() {
    return [
      this.props.listenUserEvent && !this.state.isZooming ? null :
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
      />,
    ]
  }
}
