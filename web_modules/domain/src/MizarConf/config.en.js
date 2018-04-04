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
  collections: [
    {
      id: 'DISAPPEAR_LAKES',
      thematic: 'WATER',
      title: 'Disappearance of freshwater lakes',
      abstract: 'The drying up of large lakes is a process of diminishing the surface, volume and water level of large lakes. This drying causes an increase in salinity, which in turn plays a decisive role in the deterioration of fauna and flora. Thses different elements result from problems that directly affect local populations',
      image: 'images/collections/DISAPPEAR_LAKES.png',
      scenarios: [
        {
          id: 'POYANGLAKE',
          title: 'Poyang lake',
          image: 'images/scenarios/POYANGLAKE.png',
          poi: {
            lat: '29.15',
            lon: '116.217',
          },
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
              value: '5100 Km^2',
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
      ],
    },
  ],
  layers: [
    {
      id: 'BACKGROUND:BLUE_MARBLE:WMS',
      name: 'Blue marble',
      type: 'WMS',
      baseUrl: 'http://demonstrator.telespazio.com/wmspub',
      layers: 'bdf,BlueMarble',
      opacity: 100,
    },
    {
      id: 'EUROPE:GEOJSON',
      type: 'GeoJSON',
      name: 'Europe',
      data: {
        type: 'crater',
        url: 'gisdata/europe.json',
      },
      pointMaxSize: 15,
      opacity: 20,
      color: 'white',
    },
  ],
}
