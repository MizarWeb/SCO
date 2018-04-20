export default {
  language: 'en',
  thematics: [
    {
      id: 'CLIMATE',
      name: 'Climate',
      color: '#008777',
    },
    {
      id: 'WATER',
      name: 'Water',
      color: '#0082C2',
    },
    {
      id: 'OCEAN',
      name: 'Ocean',
      color: '#004D7E',
    },
    {
      id: 'AIR',
      name: 'Air',
      color: '#8BB7E2',
    },
    {
      id: 'LAND',
      name: 'Land',
      color: '#94C11F',
    },
    {
      id: 'HEALTH',
      name: 'Health',
      color: '#009D45',
    },
    {
      id: 'DISASTER',
      name: 'Natural Disasters',
      color: '#E9483F',
    },
    {
      id: 'FOOD',
      name: 'Food',
      color: '#E0E622',
    },
    {
      id: 'COSTAL',
      name: 'Costal',
      color: '#009679',
    },
  ],
  scenarios: [
    {
      id: 'DISAPPEAR_LAKES',
      thematic: 'FOOD',
      title: 'Disappearance of freshwater lakes',
      abstract: 'The drying up of large lakes is a process of diminishing the surface, volume and water level of large lakes. This drying causes an increase in salinity, which in turn plays a decisive role in the deterioration of fauna and flora. Thses different elements result from problems that directly affect local populations',
      image: 'http://lorempicsum.com/futurama/350/200/1',
      initialVisibility: true,
      poi: {
        lat: 29.15,
        lon: 116.217,
      },
      centerToDistance: 218000,
      attributes: [
        {
          name: 'Country',
          value: 'China',
        },
        {
          name: 'Description',
          value: 'level water evolution',
        },
        {
          name: 'Surface area',
          value: '5100 Km²',
        },
        {
          name: 'Max length',
          value: '170 km',
        },
        {
          name: 'Avertage depth',
          value: '8.4 m',
        },
        {
          name: 'Max width',
          value: '17 km',
        },
        {
          name: 'Max depth',
          value: '25.1 m',
        },
      ],
      layers: [
        {
          id: 'POYANG:GEOJSON',
          type: 'GeoJSON',
          name: 'Poyang lake',
          data: {
            url: 'gisdata/poyang.json',
          },
          opacity: 100,
          color: 'blue',
        },
        {
          ref_id: 'BACKGROUND:BLUE_MARBLE:WMS',
        },
      ],
      maps: [
        {
          name: 'First map',
          layers: [
            {
              ref_id: 'BACKGROUND:BLUE_MARBLE:WMS',
              opacity: 40,
              name: 'Satellite',
            },
            {
              ref_id: 'POYANG:GEOJSON',
              color: 'lightblue',
            },
          ],
        },
      ],
    },
    {
      id: 'MONT_BLANC',
      thematic: 'CLIMATE',
      title: 'Melting glaciers of Mont Blanc',
      abstract: 'Swiss police say hundreds of bodies of mountaineers who have gone missing in the Alps in the past century could emerge in coming years as global warming forces the country’s glaciers to retreat. Alpine authorities have registered a significant increase in the number of human remains discovered last month, with the body of a man missing for 30 years the most recent to be uncovered. Rescue teams in Saas Valley in the Valais canton were called last Tuesday after two climbers retreating from an aborted ascent spotted a hand and two shoes protruding from the Hohlaub glacier.',
      image: 'http://lorempicsum.com/rio/350/200/1',
      initialVisibility: true,
      poi: {
        lat: 45.8053,
        lon: 7.0848,
      },
      centerToDistance: 75000,
      attributes: [],
      layers: [],
      maps: [],
    },
    {
      id: 'PALAVAS_COASTLINE',
      thematic: 'COSTAL',
      title: 'Palavas coastline',
      abstract: 'Swiss police say hundreds of bodies of mountaineers who have gone missing in the Alps in the past century could emerge in coming years as global warming forces the country’s glaciers to retreat. Alpine authorities have registered a significant increase in the number of human remains discovered last month, with the body of a man missing for 30 years the most recent to be uncovered. Rescue teams in Saas Valley in the Valais canton were called last Tuesday after two climbers retreating from an aborted ascent spotted a hand and two shoes protruding from the Hohlaub glacier.',
      image: 'http://lorempicsum.com/simpsons/350/200/1',
      initialVisibility: true,
      poi: {
        lat: 43.4739,
        lon: 4.3698,
      },
      centerToDistance: 39000,
      attributes: [],
      layers: [
        {
          name: 'Palavas stuff',
          type: 'WMS',
          baseUrl: 'http://80.158.6.138/mapserv?map=WMS_PALAVAS',
          layers: 'PALAVAS',
          visible: true,
          transparent: true,
          format: 'image/png',
        },
      ],
      maps: [],
    },
    {
      id: 'TROPICAL',
      thematic: 'FOOD',
      title: 'The Niger river basin',
      abstract: 'With a length of 4,200 km, the Niger river is the third longest river in Africa. The active basin is shared by nine African states (Benin, Burkina Faso, Cameroon, Ivory Coast, Guinee, Mali, Niger, Nigeria and Chad) and the river plays a key role in the region in terms of food production. 130 million people live within the Niger Basin and this number must be doubled in the next 50 years.<p> Over the last 15 years, global changes and strong rainfall are causing extreme flooding in Sahel. Niamey the capital city of Niger is suffering repeated damages that are threatening the population’s resilience. The problem is expected to increase with climate change and  population growth.<p><figure><img style="max-width: 100%" src="https://www.dropbox.com/s/topfcw050uqnq9e/niger_discharge.png?raw=1" alt="Niger Discharge"><figcaption>Increase in the Niger river  water levels in Niamey over the years 2010s</figcaption></figure>',
      image: 'https://www.dropbox.com/s/1ksqubc7tznleum/niger_scenario.png?raw=1',
      initialVisibility: true,
      poi: {
        lat: 13.4551,
        lon: 2.5214,
      },
      centerToDistance: 3000000,
      attributes: [],
      layers: [
        {
          name: 'Niger',
          type: 'WMS',
          baseUrl: 'http://80.158.6.138/mapserv?map=WMS_NIGER',
          layers: 'NIGER_SCENE',
          visible: true,
          transparent: true,
          format: 'image/png',
        },
      ],
      maps: [],
    },
  ],
  baseLayers: [
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
      baseUrl: 'http://80.158.6.138/mapserv?map=WMS_BLUEMARBLE',
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
