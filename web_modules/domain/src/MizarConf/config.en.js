import nigerLegendURL from './niger_legend.png'

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
      layers: [
        {
          category: 'MONT_BLANC',
          type: 'WMS',
          baseUrl: 'http://80.158.6.138/mapserv?map=WMS_MONT_BLANC',
          layers: 'Mont_Blanc_SHP',
          visible: true,
          background: false,
          transparent: true,
          format: 'image/png',
        },
        {
          type: 'WCSElevation',
          name: 'Elevation',
          baseUrl: 'http://80.158.6.138/mapserv?map=WMS_MONT_BLANC_ELEV',
          coverage: 'MNT_Mont_Blanc',
          version: '1.0.0',
          minElevation: -32000,
          scale: 1,
        },
      ],
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
          category: 'PALAVAS',
          type: 'WMS',
          baseUrl: 'http://80.158.6.138/mapserv?map=WMS_PALAVAS',
          layers: 'S2_PALAVAS',
          visible: true,
          background: false,
          transparent: true,
          format: 'image/png',
        },
        {
          category: 'PALAVAS',
          type: 'WMS',
          baseUrl: 'http://80.158.6.138/mapserv?map=WMS_PALAVAS',
          layers: 'DEM_PALAVAS',
          visible: true,
          background: false,
          transparent: true,
          format: 'image/png',
          hasParameter: true, //SCO - this layer receive slider parameter value
        },
      ],
      maps: [],
      parameter: {
        type: 'SLIDER',
        formatValue: value => `${parseFloat(value).toFixed(1)}m`,
        max: 3,
        step: 0.5,
        defaultValue: 0,
        attrName: 'styles',
      },
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
        {
          category: 'NIGER',
          type: 'WMS',
          baseUrl: 'http://80.158.6.138/mapserv?map=WMS_NIGER',
          layers: 'MEGHA_TRO_GRAY',
          visible: true,
          background: false,
          transparent: true,
          format: 'image/png',
        },
      ],
      maps: [],
      graph: {
        useScenarioDateToSplitData: true,
        splitColor: '#0082C2',
        data: [
          {
            x: ['2014-01-01', '2014-01-02', '2014-01-03', '2014-01-04', '2014-01-05', '2014-01-06', '2014-01-07', '2014-01-08', '2014-01-09', '2014-01-10', '2014-01-11', '2014-01-12', '2014-01-13', '2014-01-14', '2014-01-15', '2014-01-16', '2014-01-17', '2014-01-18', '2014-01-19', '2014-01-20', '2014-01-21', '2014-01-22', '2014-01-23', '2014-01-24', '2014-01-25', '2014-01-26', '2014-01-27', '2014-01-28', '2014-01-29', '2014-01-30', '2014-01-31', '2014-02-01', '2014-02-02', '2014-02-03', '2014-02-04', '2014-02-05', '2014-02-06', '2014-02-07', '2014-02-08', '2014-02-09', '2014-02-10', '2014-02-11', '2014-02-12', '2014-02-13', '2014-02-14', '2014-02-15', '2014-02-16', '2014-02-17', '2014-02-18', '2014-02-19', '2014-02-20', '2014-02-21', '2014-02-22', '2014-02-23', '2014-02-24', '2014-02-25', '2014-02-26', '2014-02-27', '2014-02-28', '2014-03-01', '2014-03-02', '2014-03-03', '2014-03-04', '2014-03-05', '2014-03-06', '2014-03-07', '2014-03-08', '2014-03-09', '2014-03-10', '2014-03-11', '2014-03-12', '2014-03-13', '2014-03-14', '2014-03-15', '2014-03-16', '2014-03-17', '2014-03-18', '2014-03-19', '2014-03-20', '2014-03-21', '2014-03-22', '2014-03-23', '2014-03-24', '2014-03-25', '2014-03-26', '2014-03-27', '2014-03-28', '2014-03-29', '2014-03-30', '2014-03-31', '2014-04-01', '2014-04-02', '2014-04-03', '2014-04-04', '2014-04-05', '2014-04-06', '2014-04-07', '2014-04-08', '2014-04-09', '2014-04-10', '2014-04-11', '2014-04-12', '2014-04-13', '2014-04-14', '2014-04-15', '2014-04-16', '2014-04-17', '2014-04-18', '2014-04-19', '2014-04-20', '2014-04-21', '2014-04-22', '2014-04-23', '2014-04-24', '2014-04-25', '2014-04-26', '2014-04-27', '2014-04-28', '2014-04-29', '2014-04-30', '2014-05-01', '2014-05-02', '2014-05-03', '2014-05-04', '2014-05-05', '2014-05-06', '2014-05-07', '2014-05-08', '2014-05-09', '2014-05-10', '2014-05-11', '2014-05-12', '2014-05-13', '2014-05-14', '2014-05-15', '2014-05-16', '2014-05-17', '2014-05-18', '2014-05-19', '2014-05-20', '2014-05-21', '2014-05-22', '2014-05-23', '2014-05-24', '2014-05-25', '2014-05-26', '2014-05-27', '2014-05-28', '2014-05-29', '2014-05-30', '2014-05-31', '2014-06-01', '2014-06-02', '2014-06-03', '2014-06-04', '2014-06-05', '2014-06-06', '2014-06-07', '2014-06-08', '2014-06-09', '2014-06-10', '2014-06-11', '2014-06-12', '2014-06-13', '2014-06-14', '2014-06-15', '2014-06-16', '2014-06-17', '2014-06-18', '2014-06-19', '2014-06-20', '2014-06-21', '2014-06-22', '2014-06-23', '2014-06-24', '2014-06-25', '2014-06-26', '2014-06-27', '2014-06-28', '2014-06-29', '2014-06-30', '2014-07-01', '2014-07-02', '2014-07-03', '2014-07-04', '2014-07-05', '2014-07-06', '2014-07-07', '2014-07-08', '2014-07-09', '2014-07-10', '2014-07-11', '2014-07-12', '2014-07-13', '2014-07-14', '2014-07-15', '2014-07-16', '2014-07-17', '2014-07-18', '2014-07-19', '2014-07-20', '2014-07-21', '2014-07-22', '2014-07-23', '2014-07-24', '2014-07-25', '2014-07-26', '2014-07-27', '2014-07-28', '2014-07-29', '2014-07-30', '2014-07-31', '2014-08-01', '2014-08-02', '2014-08-03', '2014-08-04', '2014-08-05', '2014-08-06', '2014-08-07', '2014-08-08', '2014-08-09', '2014-08-10', '2014-08-11', '2014-08-12', '2014-08-13', '2014-08-14', '2014-08-15', '2014-08-16', '2014-08-17', '2014-08-18', '2014-08-19', '2014-08-20', '2014-08-21', '2014-08-22', '2014-08-23', '2014-08-24', '2014-08-25', '2014-08-26', '2014-08-27', '2014-08-28', '2014-08-29', '2014-08-30', '2014-08-31', '2014-09-01', '2014-09-02', '2014-09-03', '2014-09-04', '2014-09-05', '2014-09-06', '2014-09-07', '2014-09-08', '2014-09-09', '2014-09-10', '2014-09-11', '2014-09-12', '2014-09-13', '2014-09-14', '2014-09-15', '2014-09-16', '2014-09-17', '2014-09-18', '2014-09-19', '2014-09-20', '2014-09-21', '2014-09-22', '2014-09-23', '2014-09-24', '2014-09-25', '2014-09-26', '2014-09-27', '2014-09-28', '2014-09-29', '2014-09-30', '2014-10-01', '2014-10-02', '2014-10-03', '2014-10-04', '2014-10-05', '2014-10-06', '2014-10-07', '2014-10-08', '2014-10-09', '2014-10-10', '2014-10-11', '2014-10-12', '2014-10-13', '2014-10-14', '2014-10-15', '2014-10-16', '2014-10-17', '2014-10-18', '2014-10-19', '2014-10-20', '2014-10-21', '2014-10-22', '2014-10-23', '2014-10-24', '2014-10-25', '2014-10-26', '2014-10-27', '2014-10-28', '2014-10-29', '2014-10-30', '2014-10-31', '2014-11-01', '2014-11-02', '2014-11-03', '2014-11-04', '2014-11-05', '2014-11-06', '2014-11-07', '2014-11-08', '2014-11-09', '2014-11-10', '2014-11-11', '2014-11-12', '2014-11-13', '2014-11-14', '2014-11-15', '2014-11-16', '2014-11-17', '2014-11-18', '2014-11-19', '2014-11-20', '2014-11-21', '2014-11-22', '2014-11-23', '2014-11-24', '2014-11-25', '2014-11-26', '2014-11-27', '2014-11-28', '2014-11-29', '2014-11-30', '2014-12-01', '2014-12-02', '2014-12-03', '2014-12-04', '2014-12-05', '2014-12-06', '2014-12-07', '2014-12-08', '2014-12-09', '2014-12-10', '2014-12-11', '2014-12-12', '2014-12-13', '2014-12-14', '2014-12-15', '2014-12-16', '2014-12-17', '2014-12-18', '2014-12-19', '2014-12-20', '2014-12-21', '2014-12-22', '2014-12-23', '2014-12-24', '2014-12-25', '2014-12-26', '2014-12-27', '2014-12-28', '2014-12-29', '2014-12-30', '2014-12-31', '2015-01-01', '2015-01-02', '2015-01-03', '2015-01-04', '2015-01-05', '2015-01-06', '2015-01-07', '2015-01-08', '2015-01-09', '2015-01-10', '2015-01-11', '2015-01-12', '2015-01-13', '2015-01-14', '2015-01-15', '2015-01-16', '2015-01-17', '2015-01-18', '2015-01-19', '2015-01-20', '2015-01-21', '2015-01-22', '2015-01-23', '2015-01-24', '2015-01-25', '2015-01-26', '2015-01-27', '2015-01-28', '2015-01-29', '2015-01-30', '2015-01-31', '2015-02-01', '2015-02-02', '2015-02-03', '2015-02-04', '2015-02-05', '2015-02-06', '2015-02-07', '2015-02-08', '2015-02-09', '2015-02-10', '2015-02-11', '2015-02-12', '2015-02-13', '2015-02-14', '2015-02-15', '2015-02-16', '2015-02-17', '2015-02-18', '2015-02-19', '2015-02-20', '2015-02-21', '2015-02-22', '2015-02-23', '2015-02-24', '2015-02-25', '2015-02-26', '2015-02-27', '2015-02-28', '2015-03-01', '2015-03-02', '2015-03-03', '2015-03-04', '2015-03-05', '2015-03-06', '2015-03-07', '2015-03-08', '2015-03-09', '2015-03-10', '2015-03-11', '2015-03-12', '2015-03-13', '2015-03-14', '2015-03-15', '2015-03-16', '2015-03-17', '2015-03-18', '2015-03-19', '2015-03-20', '2015-03-21', '2015-03-22', '2015-03-23', '2015-03-24', '2015-03-25', '2015-03-26', '2015-03-27', '2015-03-28', '2015-03-29', '2015-03-30', '2015-03-31', '2015-04-01', '2015-04-02', '2015-04-03', '2015-04-04', '2015-04-05', '2015-04-06', '2015-04-07', '2015-04-08', '2015-04-09', '2015-04-10', '2015-04-11', '2015-04-12', '2015-04-13', '2015-04-14', '2015-04-15', '2015-04-16', '2015-04-17', '2015-04-18', '2015-04-19', '2015-04-20', '2015-04-21', '2015-04-22', '2015-04-23', '2015-04-24', '2015-04-25', '2015-04-26', '2015-04-27', '2015-04-28', '2015-04-29', '2015-04-30', '2015-05-01', '2015-05-02', '2015-05-03', '2015-05-04', '2015-05-05', '2015-05-06', '2015-05-07', '2015-05-08', '2015-05-09', '2015-05-10', '2015-05-11', '2015-05-12', '2015-05-13', '2015-05-14', '2015-05-15', '2015-05-16', '2015-05-17', '2015-05-18', '2015-05-19', '2015-05-20', '2015-05-21', '2015-05-22', '2015-05-23', '2015-05-24', '2015-05-25', '2015-05-26', '2015-05-27', '2015-05-28', '2015-05-29', '2015-05-30', '2015-05-31', '2015-06-01', '2015-06-02', '2015-06-03', '2015-06-04', '2015-06-05', '2015-06-06', '2015-06-07', '2015-06-08', '2015-06-09', '2015-06-10', '2015-06-11', '2015-06-12', '2015-06-13', '2015-06-14', '2015-06-15', '2015-06-16', '2015-06-17', '2015-06-18', '2015-06-19', '2015-06-20', '2015-06-21', '2015-06-22', '2015-06-23', '2015-06-24', '2015-06-25', '2015-06-26', '2015-06-27', '2015-06-28', '2015-06-29', '2015-06-30', '2015-07-01', '2015-07-02', '2015-07-03', '2015-07-04', '2015-07-05', '2015-07-06', '2015-07-07', '2015-07-08', '2015-07-09', '2015-07-10', '2015-07-11', '2015-07-12', '2015-07-13', '2015-07-14', '2015-07-15', '2015-07-16', '2015-07-17', '2015-07-18', '2015-07-19', '2015-07-20', '2015-07-21', '2015-07-22', '2015-07-23', '2015-07-24', '2015-07-25', '2015-07-26', '2015-07-27', '2015-07-28', '2015-07-29', '2015-07-30', '2015-07-31', '2015-08-01', '2015-08-02', '2015-08-03', '2015-08-04', '2015-08-05', '2015-08-06', '2015-08-07', '2015-08-08', '2015-08-09', '2015-08-10', '2015-08-11', '2015-08-12', '2015-08-13', '2015-08-14', '2015-08-15', '2015-08-16', '2015-08-17', '2015-08-18', '2015-08-19', '2015-08-20', '2015-08-21', '2015-08-22', '2015-08-23', '2015-08-24', '2015-08-25', '2015-08-26', '2015-08-27', '2015-08-28', '2015-08-29', '2015-08-30', '2015-08-31', '2015-09-01', '2015-09-02', '2015-09-03', '2015-09-04', '2015-09-05', '2015-09-06', '2015-09-07', '2015-09-08', '2015-09-09', '2015-09-10', '2015-09-11', '2015-09-12', '2015-09-13', '2015-09-14', '2015-09-15', '2015-09-16', '2015-09-17', '2015-09-18', '2015-09-19', '2015-09-20', '2015-09-21', '2015-09-22', '2015-09-23', '2015-09-24', '2015-09-25', '2015-09-26', '2015-09-27', '2015-09-28', '2015-09-29', '2015-09-30', '2015-10-01', '2015-10-02', '2015-10-03', '2015-10-04', '2015-10-05', '2015-10-06', '2015-10-07', '2015-10-08', '2015-10-09', '2015-10-10', '2015-10-11', '2015-10-12', '2015-10-13', '2015-10-14', '2015-10-15', '2015-10-16', '2015-10-17', '2015-10-18', '2015-10-19', '2015-10-20', '2015-10-21', '2015-10-22', '2015-10-23', '2015-10-24', '2015-10-25', '2015-10-26', '2015-10-27', '2015-10-28', '2015-10-29', '2015-10-30', '2015-10-31', '2015-11-01', '2015-11-02', '2015-11-03', '2015-11-04', '2015-11-05', '2015-11-06', '2015-11-07', '2015-11-08', '2015-11-09', '2015-11-10', '2015-11-11', '2015-11-12', '2015-11-13', '2015-11-14', '2015-11-15', '2015-11-16', '2015-11-17', '2015-11-18', '2015-11-19', '2015-11-20', '2015-11-21', '2015-11-22', '2015-11-23', '2015-11-24', '2015-11-25', '2015-11-26', '2015-11-27', '2015-11-28', '2015-11-29', '2015-11-30', '2015-12-01', '2015-12-02', '2015-12-03', '2015-12-04', '2015-12-05', '2015-12-06', '2015-12-07', '2015-12-08', '2015-12-09', '2015-12-10', '2015-12-11', '2015-12-12', '2015-12-13', '2015-12-14', '2015-12-15', '2015-12-16', '2015-12-17', '2015-12-18', '2015-12-19', '2015-12-20', '2015-12-21', '2015-12-22', '2015-12-23', '2015-12-24', '2015-12-25', '2015-12-26', '2015-12-27', '2015-12-28', '2015-12-29', '2015-12-30', '2015-12-31', '2016-01-01', '2016-01-02', '2016-01-03', '2016-01-04', '2016-01-05', '2016-01-06', '2016-01-07', '2016-01-08', '2016-01-09', '2016-01-10', '2016-01-11', '2016-01-12', '2016-01-13', '2016-01-14', '2016-01-15', '2016-01-16', '2016-01-17', '2016-01-18', '2016-01-19', '2016-01-20', '2016-01-21', '2016-01-22', '2016-01-23', '2016-01-24', '2016-01-25', '2016-01-26', '2016-01-27', '2016-01-28', '2016-01-29', '2016-01-30', '2016-01-31', '2016-02-01', '2016-02-02', '2016-02-03', '2016-02-04', '2016-02-05', '2016-02-06', '2016-02-07', '2016-02-08', '2016-02-09', '2016-02-10', '2016-02-11', '2016-02-12', '2016-02-13', '2016-02-14', '2016-02-15', '2016-02-16', '2016-02-17', '2016-02-18', '2016-02-19', '2016-02-20', '2016-02-21', '2016-02-22', '2016-02-23', '2016-02-24', '2016-02-25', '2016-02-26', '2016-02-27', '2016-02-28', '2016-02-29', '2016-03-01', '2016-03-02', '2016-03-03', '2016-03-04', '2016-03-05', '2016-03-06', '2016-03-07', '2016-03-08', '2016-03-09', '2016-03-10', '2016-03-11', '2016-03-12', '2016-03-13', '2016-03-14', '2016-03-15', '2016-03-16', '2016-03-17', '2016-03-18', '2016-03-19', '2016-03-20', '2016-03-21', '2016-03-22', '2016-03-23', '2016-03-24', '2016-03-25', '2016-03-26', '2016-03-27', '2016-03-28', '2016-03-29', '2016-03-30', '2016-03-31', '2016-04-01', '2016-04-02', '2016-04-03', '2016-04-04', '2016-04-05', '2016-04-06', '2016-04-07', '2016-04-08', '2016-04-09', '2016-04-10', '2016-04-11', '2016-04-12', '2016-04-13', '2016-04-14', '2016-04-15', '2016-04-16', '2016-04-17', '2016-04-18', '2016-04-19', '2016-04-20', '2016-04-21', '2016-04-22', '2016-04-23', '2016-04-24', '2016-04-25', '2016-04-26', '2016-04-27', '2016-04-28', '2016-04-29', '2016-04-30', '2016-05-01', '2016-05-02', '2016-05-03', '2016-05-04', '2016-05-05', '2016-05-06', '2016-05-07', '2016-05-08', '2016-05-09', '2016-05-10', '2016-05-11', '2016-05-12', '2016-05-13', '2016-05-14', '2016-05-15', '2016-05-16', '2016-05-17', '2016-05-18', '2016-05-19', '2016-05-20', '2016-05-21', '2016-05-22', '2016-05-23', '2016-05-24', '2016-05-25', '2016-05-26', '2016-05-27', '2016-05-28', '2016-05-29', '2016-05-30', '2016-05-31', '2016-06-01', '2016-06-02', '2016-06-03', '2016-06-04', '2016-06-05', '2016-06-06', '2016-06-07', '2016-06-08', '2016-06-09', '2016-06-10', '2016-06-11', '2016-06-12', '2016-06-13', '2016-06-14', '2016-06-15', '2016-06-16', '2016-06-17', '2016-06-18', '2016-06-19', '2016-06-20', '2016-06-21', '2016-06-22', '2016-06-23', '2016-06-24', '2016-06-25', '2016-06-26', '2016-06-27', '2016-06-28', '2016-06-29', '2016-06-30', '2016-07-01', '2016-07-02', '2016-07-03', '2016-07-04', '2016-07-05', '2016-07-06', '2016-07-07', '2016-07-08', '2016-07-09', '2016-07-10', '2016-07-11', '2016-07-12', '2016-07-13', '2016-07-14', '2016-07-15', '2016-07-16', '2016-07-17', '2016-07-18', '2016-07-19', '2016-07-20', '2016-07-21', '2016-07-22', '2016-07-23', '2016-07-24', '2016-07-25', '2016-07-26', '2016-07-27', '2016-07-28', '2016-07-29', '2016-07-30', '2016-07-31', '2016-08-01', '2016-08-02', '2016-08-03', '2016-08-04', '2016-08-05', '2016-08-06', '2016-08-07', '2016-08-08', '2016-08-09', '2016-08-10', '2016-08-11', '2016-08-12', '2016-08-13', '2016-08-14', '2016-08-15', '2016-08-16', '2016-08-17', '2016-08-18', '2016-08-19', '2016-08-20', '2016-08-21', '2016-08-22', '2016-08-23', '2016-08-24', '2016-08-25', '2016-08-26', '2016-08-27', '2016-08-28', '2016-08-29', '2016-08-30', '2016-08-31', '2016-09-01', '2016-09-02', '2016-09-03', '2016-09-04', '2016-09-05', '2016-09-06', '2016-09-07', '2016-09-08', '2016-09-09', '2016-09-10', '2016-09-11', '2016-09-12', '2016-09-13', '2016-09-14', '2016-09-15', '2016-09-16', '2016-09-17', '2016-09-18', '2016-09-19', '2016-09-20', '2016-09-21', '2016-09-22', '2016-09-23', '2016-09-24', '2016-09-25', '2016-09-26', '2016-09-27', '2016-09-28', '2016-09-29', '2016-09-30', '2016-10-01', '2016-10-02', '2016-10-03', '2016-10-04', '2016-10-05', '2016-10-06', '2016-10-07', '2016-10-08', '2016-10-09', '2016-10-10', '2016-10-11', '2016-10-12', '2016-10-13', '2016-10-14', '2016-10-15', '2016-10-16', '2016-10-17', '2016-10-18', '2016-10-19', '2016-10-20', '2016-10-21', '2016-10-22', '2016-10-23', '2016-10-24', '2016-10-25', '2016-10-26', '2016-10-27', '2016-10-28', '2016-10-29', '2016-10-30', '2016-10-31', '2016-11-01', '2016-11-02', '2016-11-03', '2016-11-04', '2016-11-05', '2016-11-06', '2016-11-07', '2016-11-08', '2016-11-09', '2016-11-10', '2016-11-11', '2016-11-12', '2016-11-13', '2016-11-14', '2016-11-15', '2016-11-16', '2016-11-17', '2016-11-18', '2016-11-19', '2016-11-20', '2016-11-21', '2016-11-22', '2016-11-23', '2016-11-24', '2016-11-25', '2016-11-26', '2016-11-27', '2016-11-28', '2016-11-29', '2016-11-30', '2016-12-01', '2016-12-02', '2016-12-03', '2016-12-04', '2016-12-05', '2016-12-06', '2016-12-07', '2016-12-08', '2016-12-09', '2016-12-10', '2016-12-11', '2016-12-12', '2016-12-13', '2016-12-14', '2016-12-15', '2016-12-16', '2016-12-17', '2016-12-18', '2016-12-19', '2016-12-20', '2016-12-21', '2016-12-22', '2016-12-23', '2016-12-24', '2016-12-25', '2016-12-26', '2016-12-27', '2016-12-28', '2016-12-29', '2016-12-30', '2016-12-31'],
            y: [3410.997314, 3849.085205, 4122.474609, 4218.62207, 4083.506104, 3833.136475, 3554.896973, 3334.707764, 3181.011963, 3062.924316, 2957.603027, 2850.103271, 2716.19458, 2596.674072, 2486.172607, 2378.54126, 2274.932861, 2185.906006, 2109.569824, 2044.423706, 1973.964722, 1922.903564, 1881.748535, 1847.572266, 1818.036011, 1791.578613, 1767.672485, 1746.465576, 1727.627319, 1711.038452, 1696.184082, 1682.463989, 1669.674194, 1657.619629, 1645.998901, 1635.07373, 1624.618164, 1614.674072, 1605.053589, 1595.567993, 1586.220825, 1576.933228, 1567.555786, 1558.084473, 1548.549438, 1538.985229, 1529.431152, 1519.907227, 1510.405029, 1500.899048, 1491.366089, 1481.778076, 1472.117188, 1462.244995, 1452.131592, 1442.014526, 1431.841064, 1421.626831, 1411.405396, 1401.187256, 1390.507812, 1379.911987, 1369.37793, 1358.940308, 1348.561279, 1333.438721, 1322.201416, 1311.661987, 1301.070801, 1290.476074, 1279.846558, 1269.017578, 1258.241211, 1247.915039, 1237.69458, 1227.262695, 1216.808838, 1206.784668, 1196.374146, 1185.855103, 1175.526367, 1165.323853, 1155.196533, 1145.095337, 1134.981445, 1124.897583, 1114.783081, 1104.513306, 1094.327026, 1084.24353, 1074.360962, 1064.031982, 1053.881348, 1044.113525, 1034.454468, 1024.639771, 1014.576904, 1004.357727, 994.047791, 983.937012, 974.445557, 964.863831, 955.315552, 945.753113, 936.187622, 926.649414, 916.988708, 907.409424, 897.815674, 888.075012, 878.402954, 868.599731, 858.807373, 848.978455, 839.140137, 829.351135, 819.177307, 809.194824, 799.409973, 789.857056, 781.25061, 772.928772, 761.01001, 751.997192, 743.309082, 734.812683, 725.807861, 719.571472, 710.511841, 700.535095, 692.29187, 686.950562, 681.274109, 674.367859, 666.09137, 657.918091, 650.443726, 648.926819, 645.897278, 640.48407, 633.611877, 625.982422, 618.08606, 612.876465, 606.868347, 599.317444, 591.952087, 584.748535, 577.674805, 571.620483, 564.515015, 557.28302, 551.711426, 546.058899, 540.188599, 533.80896, 527.063721, 520.275757, 512.311157, 505.567627, 501.295166, 498.189606, 496.146667, 493.80246, 487.962555, 481.829071, 476.751862, 474.80365, 469.801117, 462.59964, 455.947845, 454.506317, 459.860077, 463.649872, 463.713623, 462.032135, 464.279907, 463.012238, 455.464508, 448.805481, 443.291779, 437.449707, 431.646057, 432.868591, 432.970612, 431.911316, 431.223816, 434.864227, 434.878967, 441.942261, 448.408691, 448.591248, 446.940826, 456.028992, 460.963959, 457.854523, 455.794983, 464.126251, 467.594482, 462.823853, 457.467346, 455.4841, 460.825287, 462.620026, 462.193756, 463.734558, 473.573639, 481.181427, 482.675018, 484.040771, 486.815155, 493.798706, 500.681427, 531.319214, 557.308044, 563.516113, 578.792358, 588.977478, 596.756653, 603.380432, 605.148315, 599.206604, 587.982483, 599.482849, 607.188416, 612.77063, 614.04895, 627.797546, 640.331909, 654.355347, 666.120789, 670.439453, 673.725525, 687.541504, 691.916931, 689.322327, 678.332397, 665.833923, 655.385132, 647.670227, 640.396912, 631.310913, 622.799255, 614.77655, 606.833435, 601.79187, 602.279114, 602.738037, 608.582458, 636.733093, 675.711304, 688.060547, 695.37561, 694.182983, 687.487305, 680.701965, 684.747925, 687.241577, 697.831238, 704.137512, 703.930115, 703.93512, 707.949402, 714.34021, 715.854065, 712.479675, 708.542175, 703.457031, 699.04248, 696.865906, 696.926697, 699.722046, 703.002808, 705.562073, 707.824463, 708.572815, 708.69104, 709.314636, 710.183899, 711.626526, 713.415527, 714.619141, 714.880798, 714.659546, 714.344238, 714.254761, 714.481873, 715.070251, 716.00354, 717.238953, 718.772095, 720.22406, 722.465271, 724.006714, 725.566467, 727.119568, 728.334167, 729.283264, 730.101501, 730.851196, 731.570618, 732.330994, 733.165894, 734.004944, 734.479797, 735.186951, 736.077332, 737.138916, 738.305603, 739.473938, 740.533264, 741.385132, 741.986328, 742.359619, 742.479004, 742.367798, 742.049805, 741.529053, 740.805908, 739.917969, 738.7901, 737.415344, 735.786011, 733.875793, 731.664001, 729.138367, 726.355042, 723.134033, 719.62915, 715.901245, 711.792542, 707.391479, 702.61554, 697.652832, 692.580933, 687.408752, 682.221924, 676.996155, 671.686523, 666.291321, 660.851562, 655.380432, 649.693481, 643.715027, 637.644775, 631.496155, 625.393433, 619.459412, 613.554565, 607.86969, 602.920959, 597.803711, 592.440674, 586.947998, 581.348083, 575.66217, 569.894592, 564.063232, 558.186401, 552.37561, 546.645081, 540.935425, 535.228149, 529.432556, 523.462219, 517.330078, 511.255341, 505.390717, 499.927399, 494.958588, 490.231964, 485.408112, 480.494904, 475.627686, 470.859222, 466.179962, 461.52243, 456.76123, 451.837341, 446.815826, 441.705414, 436.450378, 431.0578, 425.603912, 420.244598, 415.056122, 410.029266, 405.158142, 400.503082, 396.153839, 392.036102, 387.902405, 383.561401, 378.952881, 374.099884, 369.117523, 364.106506, 359.053436, 354.069092, 349.241119, 344.560059, 339.967712, 335.468628, 331.111969, 326.894592, 322.784027, 318.772797, 314.851837, 311.008911, 307.293396, 303.737061, 300.285431, 296.885284, 293.526733, 290.217743, 286.969818, 283.850037, 280.782593, 277.760986, 274.765656, 271.824158, 268.918579, 266.01828, 263.125519, 260.27356, 257.4133, 254.583862, 251.766388, 248.95668, 246.151398, 243.347549, 240.526367, 237.691635, 234.951065, 232.284378, 229.617401, 226.97702, 224.385727, 221.850052, 219.367081, 216.928268, 214.528305, 212.163208, 209.830093, 207.52951, 205.267212, 203.212723, 201.236267, 199.082321, 196.872696, 194.720276, 192.652603, 190.647842, 188.685196, 186.746384, 184.847794, 182.92543, 181.012924, 179.115402, 177.239075, 175.38739, 173.562073, 171.762299, 169.984863, 168.236008, 166.518539, 164.830841, 163.174728, 161.54805, 159.948196, 158.37616, 156.829041, 155.306366, 153.809555, 152.342834, 150.913284, 149.520676, 148.152771, 146.796555, 145.451141, 144.120819, 142.802368, 141.488724, 140.172653, 138.852325, 137.57605, 136.298981, 135.00589, 133.704376, 132.401001, 131.088821, 129.7724, 128.456772, 127.14032, 125.816566, 124.478645, 123.129189, 121.815445, 120.596649, 119.409477, 118.231239, 117.071861, 115.837242, 114.503136, 113.074722, 111.606171, 110.127625, 108.824791, 108.002365, 107.911102, 107.50766, 106.302994, 104.684425, 102.995041, 101.520676, 100.597031, 100.288063, 104.54644, 115.923508, 130.411499, 145.706131, 150.697449, 150.850662, 151.679016, 154.317276, 156.125977, 153.413498, 149.639084, 146.188705, 141.88591, 137.420197, 134.368393, 131.120148, 127.737778, 124.527786, 121.76976, 119.409317, 116.867172, 113.858902, 116.586739, 119.964874, 119.434738, 117.251434, 116.952347, 126.815468, 140.670227, 142.336472, 141.584396, 139.519714, 147.587784, 164.2314, 178.026718, 191.266586, 207.366867, 238.242493, 288.506958, 329.376007, 384.028534, 434.223145, 462.471008, 509.920929, 558.46936, 602.358398, 625.925415, 625.951904, 668.572327, 712.918823, 770.210327, 793.783386, 805.361755, 809.623047, 834.083496, 883.618958, 937.352722, 995.683472, 1073.033203, 1140.667725, 1181.30542, 1255.172241, 1281.411133, 1305.810181, 1301.558594, 1290.2146, 1302.355835, 1294.789673, 1271.171265, 1247.508911, 1215.180664, 1242.345825, 1258.012451, 1303.762085, 1321.100464, 1280.193604, 1328.560791, 1359.927368, 1361.335571, 1354.374268, 1346.746338, 1339.283813, 1348.514404, 1385.026245, 1420.383667, 1471.088379, 1534.804565, 1592.026489, 1648.973999, 1695.962524, 1708.973389, 1708.064941, 1691.669678, 1697.310303, 1707.224854, 1707.22168, 1687.810669, 1669.279053, 1666.625854, 1655.630493, 1632.542236, 1589.244019, 1539.869385, 1493.84436, 1454.622803, 1430.169556, 1418.177612, 1430.181152, 1473.059692, 1545.852661, 1656.472656, 1748.456299, 1814.357544, 1853.890503, 1862.895996, 1853.119873, 1897.947632, 1942.429932, 1963.974121, 1977.876221, 1972.243042, 1951.38147, 1916.11084, 1866.060913, 1814.851929, 1756.703491, 1691.54187, 1631.496338, 1583.996338, 1553.255981, 1534.825562, 1520.675171, 1506.62561, 1495.133057, 1488.348022, 1485.775879, 1487.69458, 1495.914429, 1524.303223, 1549.988525, 1571.766846, 1588.229858, 1598.786377, 1610.768555, 1621.432495, 1623.456909, 1616.193115, 1604.091675, 1587.588013, 1571.198364, 1557.616943, 1547.561523, 1540.45459, 1536.838989, 1537.527832, 1541.332764, 1544.98999, 1547.276855, 1548.555542, 1549.46106, 1550.428345, 1551.588989, 1553.236206, 1555.428223, 1558.074585, 1561.074585, 1564.329224, 1567.724365, 1571.179077, 1574.580688, 1578.065186, 1581.614624, 1585.171265, 1588.661987, 1591.990601, 1595.278076, 1598.586182, 1601.907715, 1605.221069, 1608.498291, 1611.702515, 1614.822998, 1617.55542, 1620.348999, 1623.184814, 1626.092285, 1629.005615, 1631.869629, 1634.589844, 1637.14502, 1639.684692, 1642.188232, 1644.623047, 1646.964722, 1649.19812, 1651.31604, 1653.315186, 1655.199707, 1656.973999, 1658.6427, 1660.205811, 1661.662231, 1663.009644, 1664.244263, 1665.359375, 1666.346436, 1667.194824, 1667.892456, 1668.430542, 1668.807373, 1669.021606, 1669.072754, 1668.962646, 1668.572144, 1667.973511, 1667.235474, 1666.373657, 1665.393921, 1664.305176, 1663.121216, 1661.872803, 1660.921875, 1660.090698, 1658.932861, 1657.596924, 1656.186523, 1654.745239, 1653.2677, 1651.71228, 1650.030518, 1648.185791, 1646.156616, 1643.932007, 1641.507446, 1638.879883, 1636.053101, 1633.108765, 1629.957275, 1626.587769, 1622.721436, 1618.511719, 1614.071289, 1609.5354, 1605.020874, 1600.448608, 1595.601074, 1590.65918, 1585.672485, 1580.601318, 1575.314575, 1569.809692, 1564.169434, 1558.410522, 1552.669556, 1546.875854, 1540.973877, 1534.986572, 1528.927368, 1522.776001, 1517.069702, 1512.392212, 1506.724609, 1499.529663, 1491.849365, 1484.195312, 1476.734131, 1469.558228, 1462.507568, 1455.424683, 1448.157593, 1440.190674, 1432.067993, 1424.12085, 1416.240723, 1408.064819, 1399.556519, 1390.969727, 1382.162964, 1373.266724, 1364.392334, 1355.476196, 1346.371094, 1332.211426, 1321.92627, 1312.001709, 1302.074951, 1290.055054, 1277.889771, 1266.643921, 1255.296997, 1243.965454, 1232.953735, 1222.100952, 1210.925171, 1199.273193, 1187.627075, 1175.342773, 1163.038452, 1150.824585, 1137.78772, 1125.076538, 1112.706299, 1100.397949, 1088.202759, 1076.449463, 1062.635986, 1048.619141, 1034.357544, 1020.281677, 1005.867126, 991.485596, 979.227478, 965.946167, 952.921387, 939.970032, 926.984558, 913.391174, 899.808899, 885.648315, 870.938599, 855.887207, 840.700378, 825.715942, 811.466675, 797.122742, 782.699707, 768.217346, 748.605713, 734.207397, 721.006226, 707.951904, 695.260925, 683.678955, 671.139465, 658.475586, 644.82373, 631.018982, 617.832886, 605.650024, 593.785706, 581.372009, 569.136536, 557.021606, 545.808044, 534.175598, 523.13916, 520.461182, 515.090393, 505.959778, 497.772827, 494.024506, 492.844482, 493.228973, 499.887512, 505.344818, 516.230103, 522.641174, 511.471283, 504.645386, 502.584137, 499.200226, 507.279236, 508.727295, 503.423004, 486.448792, 462.743042, 440.976929, 425.896881, 415.478882, 407.091492, 396.353119, 394.847443, 394.256866, 395.590942, 398.697327, 391.508881, 380.803162, 370.936646, 412.089081, 486.245392, 543.809509, 620.101257, 651.782532, 669.91272, 675.956055, 666.024963, 643.135803, 601.961792, 566.953247, 543.292114, 577.139648, 589.358032, 588.078979, 596.208191, 586.481018, 564.79071, 544.506836, 530.97821, 520.718872, 522.764099, 523.565491, 521.160156, 526.482971, 531.040283, 537.570618, 542.469666, 555.360535, 576.453552, 579.429993, 572.148804, 579.245178, 600.677307, 607.035767, 663.88269, 696.829041, 720.571167, 773.545349, 845.995544, 939.266541, 1036.352905, 1072.478271, 1084.815308, 1109.104004, 1157.458008, 1232.588013, 1266.568726, 1254.140747, 1233.066895, 1205.655151, 1164.393188, 1115.991455, 1074.338013, 1043.114746, 1034.360229, 1027.006836, 1015.283508, 1017.88678, 1094.276733, 1178.083252, 1276.51062, 1317.002075, 1327.199951, 1352.505493, 1386.529541, 1412.616699, 1412.099487, 1397.377319, 1373.728027, 1336.333496, 1295.091553, 1302.204712, 1295.934692, 1314.78772, 1344.723999, 1344.830566, 1351.324463, 1366.218628, 1411.361206, 1513.803833, 1582.089355, 1612.258667, 1620.633057, 1617.978882, 1623.993774, 1658.357788, 1688.790649, 1740.527466, 1768.352173, 1763.978882, 1801.290405, 1826.540283, 1832.04834, 1814.233398, 1786.727905, 1761.393433, 1729.878296, 1691.143433, 1682.773193, 1663.741333, 1641.493286, 1630.959351, 1623.326294, 1617.667358, 1606.263794, 1588.143188, 1571.247803, 1559.081909, 1551.751465, 1542.772827, 1527.871582, 1506.5354, 1479.907593, 1452.008057, 1428.328247, 1410.541016, 1398.477783, 1391.133911, 1387.029907, 1385.097778, 1384.648071, 1385.766846, 1387.06189, 1389.160156, 1393.076172, 1399.992554, 1408.620361, 1418.917725, 1432.203857, 1443.39624, 1449.53479, 1452.753052, 1454.837646, 1456.65686, 1458.720825, 1461.272583, 1464.213379, 1467.682495, 1471.324219, 1474.75293, 1478.647583, 1483.063354, 1487.847168, 1492.799561, 1497.686523, 1502.546875, 1507.502563, 1512.526489, 1517.560425, 1522.458252, 1527.420044, 1532.465576, 1537.530273, 1542.575806, 1547.566284, 1552.4552, 1557.247681, 1561.955078, 1566.464478, 1570.907349, 1575.263428, 1579.400879, 1583.304565, 1587.081909, 1590.75415, 1594.307007, 1597.731934, 1601.017578, 1604.155029, 1606.813965, 1609.465088, 1612.110474, 1614.672119, 1617.03479, 1619.262451, 1621.374756, 1623.353271, 1625.18811, 1626.872925, 1628.405151, 1629.775757, 1630.960938, 1631.973999, 1632.837036, 1633.549316, 1634.094971, 1634.501831, 1635.18103, 1635.654907, 1635.599976, 1635.891235, 1636.647217, 1637.412354, 1637.866333, 1637.904175, 1637.533081, 1636.811523, 1635.808228, 1634.551392, 1633.08374],
            type: 'scatter',
            mode: 'lines',
            marker: {
              color: '#9E9E9E',
            },
          },
        ],
        layout: {
          showlegend: false,
          margin: {
            t: 40, r: 20, l: 60, b: 60,
          },
          height: '300',
          title: 'River flow in m³ / seconde',
          autosize: true,
          paper_bgcolor: 'rgba(255,255,255,0.9)',
          plot_bgcolor: 'rgba(255,255,255,0)',
          xaxis: {
            title: 'Date',
          },
          yaxis: {
            title: 'Flow',
          },
        },
        config: {
          staticPlot: true,
          displayModeBar: false,
        },
      },
      legend: {
        type: 'VERTICAL',
        url: nigerLegendURL,
      },
    },
  ],
  baseLayers: [
    {
      type: 'WCSElevation',
      name: 'Elevation',
      baseUrl: 'http://80.158.6.138/mapserv?map=WMS_SRTM',
      coverage: 'SRTM',
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
      exposure: 2.0,
      wavelength: [0.650, 0.570, 0.475],
      kr: 0.0025,
      km: 0.0015,
      sunBrightness: 15.0,
      name: 'Atmosphere',
      visible: true,
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
