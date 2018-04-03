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

import './MizarLoader'
import './rconfig'

/**
 * Mizar Adapter
 */
export default class zarMiAdapter extends React.Component {
  static propTypes = {
    // all properties are reported to measure
    thematics: PropTypes.arrayOf(PropTypes.object),
  }

  static canvaStyle = {
    border: 'none',
    margin: 0,
    padding: 0,
  }

  state = {
  }


  componentWillMount() {
    if (process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'coverage') {
      // Do nothing
    } else {
      // load required elements
      window.requirejs(['Mizar'], this.loadMizar)
    }
  }

  loadMizar = (Mizar) => {
    const mizarDiv = document.getElementById('MizarCanvas')
    const context = {
      layers: [
        {
          type: 'WCSElevation',
          name: 'Elevation',
          baseUrl: 'http://demonstrator.telespazio.com/wcspub',
          coverage: 'GTOPO',
          version: '1.0.0',
          minElevation: -32000,
          scale: 15,
        },
        {
          name: 'Blue Marble',
          type: 'WMS',
          baseUrl: 'http://demonstrator.telespazio.com/wmspub',
          getCapabilities: 'http://demonstrator.telespazio.com/wmspub',
          layers: 'BlueMarble',
          byPass: true,
          visible: true,
          background: true,
        },
        {
          category: 'Other',
          type: 'Atmosphere',
          exposure: 1.4,
          wavelength: [0.56, 0.66, 0.78],
          name: 'Atmosphere',
          lightDir: [0, 1, 0],
          visible: false,
        },
        {
          category: 'Other',
          type: 'TileWireframe',
          name: 'Coordinates Grid',
          outline: true,
          visible: true,
        },
      ],
    }


    // Create Mizar
    const mizar = new Mizar({
      canvas: mizarDiv,
      configuration: {
        mizarBaseUrl: 'localhost/Mizar',
        debug: false,
        isMobile: false,
        positionTracker: false,
        elevationTracker: false,
        registry: false,
        proxyUse: false,
        proxyUrl: '',
      },
      planetContext: {
        category: 'Planets',
        type: 'Planet',
        name: 'Earth',
        coordinateSystem: {
          geoideName: 'EPSG:4326',
        },
        visible: true,
      },
    })


    // Layers load
    for (let i = 0; i < context.layers.length; i++) {
      const layer = context.layers[i]
      const layerID = mizar.addLayer(layer)
      if (layer.type === Mizar.LAYER.WCSElevation) {
        mizar.setBaseElevation(layer.name)
      }
    }
    const options = {
      category: 'SCO',
      type: 'GeoJSON',
      pointMaxSize: 40,
      visible: true,
      opacity: 100,
      pickable: true,
    }
    const climateData = [
      {
        thematicId: 'WATER',
        type: 'FeatureCollection',
        features: [
          {
            geometry: { type: 'Point', coordinates: [116.217, 29.15] },
            type: 'Feature',
            properties: { name: 'Poyang lake', title: 'Poyang lake', description: 'Poyang lake' },
          },
        ],
      },
      {
        thematicId: 'HEALTH',
        type: 'FeatureCollection',
        features: [
          {
            geometry: { type: 'Point', coordinates: [114.217, 28.15] },
            type: 'Feature',
            properties: { name: 'Poyang lake', title: 'Poyang lake', description: 'Poyang lake' },
          },
        ],
      },
      {
        thematicId: 'LAND',
        type: 'FeatureCollection',
        features: [
          {
            geometry: { type: 'Point', coordinates: [112.217, 30.15] },
            type: 'Feature',
            properties: { name: 'Poyang lake', title: 'Poyang lake', description: 'Poyang lake' },
          },
        ],
      },
      {
        thematicId: 'DISASTER',
        type: 'FeatureCollection',
        features: [
          {
            geometry: { type: 'Point', coordinates: [117.217, 28.15] },
            type: 'Feature',
            properties: { name: 'Poyang lake', title: 'Poyang lake', description: 'Poyang lake' },
          },
        ],
      },

    ]

    for (let i = 0; i < climateData.length; i++) {
      const currentThematicId = climateData[i].thematicId
      let currentThematic = null
      for (let j = 0; j < this.props.thematics.length; j++) {
        if (this.props.thematics[j].id === currentThematicId) {
          currentThematic = this.props.thematics[j]
        }
      }
      options.name = currentThematic.name
      options.color = currentThematic.color

      const climateId = mizar.addLayer(options)
      const climateLayer = mizar.getLayerByID(climateId)
      climateLayer.addFeatureCollection(climateData[i])
    }
    mizar.activatedContext.navigation.zoomTo([116.217, 29.15])
  }
  render() {
    return (
      <canvas id="MizarCanvas" style={zarMiAdapter.canvaStyle} />
    )
  }
}
