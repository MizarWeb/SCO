import palavasGraph from './palavas.graph'
import palavasHooks from './palavas.hook'
import nigerGraph from './niger.graph'

export default {
  language: 'fr',
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
      id: 'MEDITERRANEAN_COASTLINE',
      thematic: 'COSTAL',
      title: 'Du changement global aux impacts locaux',
      abstract: 'Le réchauffement climatique provoque simultanément la dilatation des océans et la fonte des glaces continentales, dont les calottes polaires. Il en résulte une <b>hausse moyenne de 3,3 mm par an</b> du niveau des océans.<br/><br/>Cette crue inexorable a des conséquences immédiates sur les littoraux, comme <b>la submersion permanente des côtes basses, les submersions tempétueuses accrues, et la salinisation des aquifères</b>. À moyen et long terme, <b>l’érosion des côtes</b> s’accélère, en particulier sur les plages. Une autre conséquence à long terme est la <b>destruction d’écosystèmes</b> (mangroves, récifs coralliens, marais maritimes…) et de <b>tout le tissu socio-économique</b> qui en dépend.<br/><br/>Déjà soumises à l’influence de multiples phénomènes locaux d’origine naturelle ou anthropique, il est très difficile de prévoir la réaction de ces zones littorales à la hausse du niveau de la mer. Ce qui est sûr, c’est que l’eau monte. Les régions doivent aujourd’hui surveiller l’évolution du trait de côte afin d’anticiper les impacts associés et établir une stratégie de défense',
      notice: 'Fais varier le temps et l\'élévation du niveau de l\'eau en Méditerranée pour mesurer l\'impact sur la côte.',
      image: 'http://80.158.22.249/resources/sco/meditocean/meditSea.png',
      imgCopyright: 'Crédit Photo : CNES/LEGOS/CLS 2015 - produced by AVISO',
      initialPOILayerVisibility: false,
      poi: {
        lat: 38.535,
        lon: 14.517,
      },
      centerToDistance: 3045000,
      attributes: [
      ],
      layers: [
        {
          category: 'MEDITERRANEAN SEA',
          type: 'WMS',
          baseUrl: 'http://80.158.22.249/mapserv?map=WMS_MEDIT',
          layers: 'Mediterranean',
          visible: true,
          background: false,
          transparent: true,
          format: 'image/png',
        },
      ],
      maps: [],
      legend: {
        type: 'VERTICAL',
        url: 'http://80.158.22.249/mapserv?map=WMS_MEDIT&version=1.3.0&service=WMS&request=GetLegendGraphic&sld_version=1.1.0&layer=Mediterranean&format=image/png&STYLE=default',
        title: 'Variation du niveau de la mer',
      },
    },
    {
      id: 'PALAVAS_COASTLINE',
      thematic: 'COSTAL',
      title: 'Palavas-les-Flots sous surveillance',
      abstract: 'Développée par le Legos, une procédure spatiale permet d’évaluer un indice de la vulnérabilité des côtes. Combinant les données de satellites d’altimétrie et d’imagerie spatiale, il traduit la topographie locale d’une zone sur un modèle numérique de terrain (MNT) et compare cette topographie à la hausse du niveau de la mer. Cette approche permet d’<b>identifier les zones potentiellement soumises aux submersions permanentes ou occasionelles</b> (lors des tempetes) à cause de la hausse du niveau de la mer. <br/><br/>Cette méthode spatiale a été développée sur Palavas-les-Flots (sud-est de la France), choisie comme zone témoin en raison de ses nombreuses mesures de terrain. L\'Objectif premier est d\'évaluer le risque de la hausse des océans : les submersions ou tempéteuses.<br/><br/>La submersion dépend du niveau de l\'eau et du niveau du sol. Effectivement, tandis que le niveau de la mer varie, la forme de la côte change, modelée par les courants et l’ingénierie côtière. La menace de submersion s’accroît lorsqu’une tempête arrive. Tout entre alors en conjonction, avec force : dépression, vents, vagues, houle… S’il pleut beaucoup sur un bassin versant voisin, des crues locales sont à craindre : la zone est prise en tenaille entre débordements salés et non salés.',
      notice: 'Fait varier la hauteur de l\'eau et le temps pour visualiser l\'impact du niveau de la mer sur Palavas-les-Flots.',
      image: 'http://80.158.22.249/resources/sco/palavas/palavas.png',
      imgCopyright: 'Crédit Photo : CNES 2013, distribution Airbus DS',
      initialPOILayerVisibility: true,
      poi: {
        lat: 43.556,
        lon: 4.018,
      },
      centerToDistance: 35000,
      attributes: [
      ],
      layers: [
        {
          category: 'PALAVAS',
          type: 'WMS',
          baseUrl: 'http://80.158.22.249/mapserv?map=WMS_PALAVAS',
          layers: 'S2_PALAVAS',
          visible: true,
          background: false,
          transparent: true,
          format: 'image/png',
        },
        {
          category: 'PALAVAS',
          type: 'WMS',
          baseUrl: 'http://80.158.22.249/mapserv?map=WMS_PALAVAS',
          layers: 'DEM_PALAVAS',
          visible: true,
          background: false,
          transparent: true,
          format: 'image/png',
          hasParameter: true, //SCO - this layer receive slider parameter value
        },
        {
          category: 'PALAVAS',
          type: 'WMS',
          baseUrl: 'http://80.158.22.249/mapserv?map=WMS_MEDIT',
          visible: false,
          background: false,
          transparent: true,
          format: 'image/png',
          layers: 'Mediterranean',
        },
      ],
      graph: {
        useScenarioDateToSplitData: true,
        splitColor: '#0082C2',
        data: [
          {
            x: palavasGraph.x,
            y: palavasGraph.y,
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
          title: 'Variation du niveau de la mer',
          autosize: true,
          paper_bgcolor: 'rgba(255,255,255,0.9)',
          plot_bgcolor: 'rgba(255,255,255,0)',
          xaxis: {
            title: 'Date',
          },
          yaxis: {
            title: 'Élévation de l\'eau (mètre)',
          },
        },
        config: {
          staticPlot: true,
          displayModeBar: false,
        },
      },
      maps: [],
      parameter: {
        type: 'SLIDER',
        formatValue: value => `${parseFloat(value).toFixed(1)}m`,
        max: 3,
        step: 0.2,
        defaultValue: 0,
        title: 'Élévation de l\'eau additionnelle',
        attrName: 'styles',
      },
      legend: {
        type: 'VERTICAL',
        url: 'http://80.158.22.249/mapserv?map=WMS_PALAVAS&version=1.3.0&service=WMS&request=GetLegendGraphic&sld_version=1.1.0&layer=DEM_PALAVAS&format=image/png&STYLE=3.0m',
        title: 'Effet de l\'innondation sur Palavas',
      },
      hook: palavasHooks,
    },
    {
      id: 'TROPICAL',
      thematic: 'FOOD',
      title: 'Tous les chemins de l\'eau mènent à Niamey',
      abstract: 'Sec au nord et très arrosé au sud, le bassin versant du Niger est la source nourricière de 9 pays, une <b>population de 130 millions d’âmes</b>, appelée à <b>doubler dans les 50 prochaines années</b>. Niamey, qui n’est pas un cas isolé, subit les conséquences des <b>changements climatiques</b> : les <b>grandes sécheresses</b> des années 1970-80 et une pluviométrie erratique depuis 1990 ont modifié le comportement hydrologique de la région. Avec le changement climatique les <b>pluies pourraient s’intensifier</b> et aggraver encore ces phénomènes alors que la population urbaine croit. Désormais, à la moindre pluie dans la région de Niamey, le Niger entre en crue dans la capitale.',
      notice: 'Fais varier le temps pour visualiser les précipitations sur le bassin du Niger et l\'impact sur l\'onde de crue qui arrive sur Niamey.',
      image: 'http://80.158.22.249/resources/sco/niger/RCSA_08_35_Rue_inondee_voitures_Ouaga_Hubert_Bataille.png',
      imgCopyright: 'Crédit Photo : Hubert Bataille',
      initialPOILayerVisibility: true,
      poi: {
        lat: 15.261,
        lon: 4.245,
      },
      centerToDistance: 3940000,
      attributes: [
      ],
      layers: [
        {
          name: 'Niger',
          type: 'WMS',
          baseUrl: 'http://80.158.22.249/mapserv?map=WMS_NIGER',
          layers: 'NIGER_SCENE',
          visible: true,
          transparent: true,
          format: 'image/png',
        },
        {
          category: 'NIGER',
          type: 'WMS',
          baseUrl: 'http://80.158.22.249/mapserv?map=WMS_NIGER',
          layers: 'MEGHA_TRO_GRAY',
          visible: true,
          background: false,
          transparent: true,
          format: 'image/png',
        },
      ],
      //overrideTemporalDates: [new Date(2014, 6, 1), new Date(2015, 6, 1), new Date(2016, 6, 1), new Date(2017, 6, 1)],
      maps: [],
      graph: {
        useScenarioDateToSplitData: true,
        splitColor: '#0082C2',
        data: [
          {
            x: nigerGraph.x,
            y: nigerGraph.y,
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
          title: 'Débit de la rivière en m³ / seconde',
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
        url: 'http://80.158.22.249/mapserv?map=WMS_NIGER&version=1.3.0&service=WMS&request=GetLegendGraphic&sld_version=1.1.0&layer=MEGHA_TRO_GRAY&format=image/png&STYLE=default',
        title: 'Pluviométrie superficielle cumulée journalièrement en mm/jour',
      },
    },
    {
      id: 'MONT_BLANC',
      thematic: 'CLIMATE',
      title: 'La perte d\'altitude du Mont-Blanc',
      abstract: 'Dans la chaîne des Alpes, le massif du <b>Mont-Blanc a perdu au moins 40% de son volume glaciaire en 150 ans</b>. Grâce aux satellites, les mesures sont plus précises et concernent l’ensemble du massif. Bilan : avec une perte d’épaisseur moyenne de plus de 1 m par an, les glaciers du Mont-Blanc fondent 3 à 4 fois plus vite cette dernière décennie que durant les deux précédentes.',
      notice: 'Fais varier le temps et visualise les changements d\'altitude du Mont-Blanc entre 2003 et 2012.',
      image: 'http://80.158.22.249/resources/sco/montblanc/Mont-blanc.jpg',
      imgCopyright: 'Crédit Photo : E. Berthier',
      initialPOILayerVisibility: true,
      poi: {
        lat: 45.8053,
        lon: 7.0848,
      },
      centerToDistance: 75000,
      resetCameraRotation: {
        heading: 200,
        tilt: 45,
      },
      attributes: [
      ],
      layers: [
        {
          category: 'MONT_BLANC',
          type: 'WMS',
          baseUrl: 'http://80.158.22.249/mapserv?map=WMS_MONT_BLANC',
          layers: 'Mont_Blanc_SHP',
          visible: true,
          background: false,
          transparent: true,
          format: 'image/png',
        },
        {
          category: 'MONT_BLANC',
          type: 'WMS',
          baseUrl: 'http://80.158.22.249/mapserv?map=WMS_MONT_BLANC',
          layers: 'Mont_Blanc_dh',
          visible: true,
          background: false,
          transparent: true,
          format: 'image/png',
          zIndex: 11,
        },
        {
          type: 'WCSElevation',
          name: 'Elevation Mont Blanc',
          baseUrl: 'http://80.158.22.249/mapserv?map=WMS_MONT_BLANC_ELEV',
          coverage: 'MNT_Mont_Blanc',
          version: '1.0.0',
          scale: 2,
          attribution: '<img src="http://80.158.22.249/resources/sco/logos/logo-cnes.jpg" height="25px"/> &copy; Data: CNES 2003, 2012 / Distribution Airbus and Space / Processing E. Berthier, Legos / Web service: CNES</a>',
        },
      ],
      maps: [],
      legend: {
        type: 'VERTICAL',
        url: 'http://80.158.22.249/mapserv?map=WMS_MONT_BLANC&service=wms&version=1.1.1&request=getLegendGraphic&layer=Mont_Blanc_dh&format=image/png&STYLE=default&WIDTH=100&%20height=100',
        title: 'Les différences d\'élévation en mètre après 9 ans des deux modèles numériques de terrain',
      },
    },
    {
      id: 'DISAPPEAR_LAKES',
      thematic: 'FOOD',
      title: 'La dynamique des lacs géants',
      abstract: 'A mi-parcours du fleuve Yang-Tsé, le lac Poyang est une source de ressources naturelles et fossiles, dont une partie classée réserve naturelle. Modelé et perturbé par les activités anthropiques, il est sous monitoring spatial depuis plus de 16 ans. Récoltées pour étuder la dynamique complexe de Poyang, ces données sont aujourd\'hui disponibles pour évaluer le rôle du changement climatique dans un tel hydro-système.',
      image: 'http://80.158.22.249/resources/sco/poyang/poyang.png',
      imgCopyright: 'Crédit Photo : Deimos Imaging, an UrtheCast Company, Distribution Airbus DS, 2010',
      initialPOILayerVisibility: true,
      poi: {
        lat: 29.648,
        lon: 116.685,
      },
      centerToDistance: 667000,
      attributes: [
      ],
      layers: [
        {
          category: 'POYANG',
          type: 'WMS',
          baseUrl: 'http://80.158.22.249/mapserv?map=WMS_POYANG',
          visible: true,
          background: false,
          transparent: true,
          format: 'image/png',
          layers: 'SPOT4,SPOT5,LANDSAT2000',
        },
        {
          category: 'POYANG',
          type: 'WMS',
          baseUrl: 'http://80.158.22.249/mapserv?map=WMS_POYANG',
          visible: true,
          background: false,
          transparent: true,
          format: 'image/png',
          layers: 'SUBMERSION',
          zIndex: 11,
        },
      ],
      maps: [],
      legend: {
        type: 'VERTICAL',
        url: 'http://80.158.22.249/mapserv?map=WMS_POYANG&version=1.3.0&service=WMS&request=GetLegendGraphic&sld_version=1.1.0&layer=SUBMERSION&format=image/png&STYLE=default',
        title: 'Temps de submersion annuel',
      },
    },
    {
      id: 'INDIAN_MOISTURE',
      thematic: 'FOOD',
      title: 'Anticiper la sécheresse agronomique de l\'Inde',
      abstract: 'L’Inde : <b>1,3 milliards de citoyens sur 3,3 millions de km2</b>. Occupant environ <b>60% de la surface nationale</b>, l’agriculture réquisitionne <b>80% des ressources en eau du pays</b>, essentiellement souterraines. Alors que les sécheresses s’intensifient, la surconsommation hydrique est telle que les réserves ont dépassé le seuil de renouvellement dans plusieurs états. Source de discorde mais aussi gouffre financier pour les assurances, <b>le déficit d’eau est un véritable drame pour les agriculteurs</b>. Face au problème, le gouvernement indien crée des réservoirs supplémentaires et recherche des actions capables de minimiser le manque d’eau, ou de s’y adapter. Il renforce notamment sa coopération avec la France afin de développer des outils spatiaux capables d’éclairer ses choix et décisions.<br/>Le satellite SMOS (Soil moisture and ocean salinity) mesure l’humidité des 5 premiers centimètres du sol tous les 3 jours. Les algorithmes du CESBIO transforment cette donnée en humidité en zone racinaire. Observée à 40 km de résolution, cette variable permet de prédire, à l’échelle du subcontinent indien, une sécheresse agricole 1 à 2 mois à l’avance.',
      image: 'http://80.158.22.249/resources/sco/india/22040610056_fca942e9a4_o.jpg',
      imgCopyright: 'Crédit Photo : A. Al Bitar',
      initialPOILayerVisibility: false,
      poi: {
        lat: 22.696,
        lon: 81.160,
      },
      centerToDistance: 4035000,
      attributes: [
      ],
      layers: [
        {
          category: 'INDIA',
          type: 'WMS',
          baseUrl: 'http://80.158.22.249/mapserv?map=WMS_INDIA',
          layers: 'INDIA_ADMIN',
          visible: true,
          background: false,
          transparent: true,
          format: 'image/png',
          zIndex: 11,
        },
        {
          category: 'INDIA',
          type: 'WMS',
          baseUrl: 'http://80.158.22.249/mapserv?map=WMS_INDIA',
          layers: 'MoistureIndex',
          visible: true,
          background: false,
          transparent: true,
          format: 'image/png',
        },
      ],
      maps: [],
      legend: {
        type: 'VERTICAL',
        url: 'http://80.158.22.249/mapserv?map=WMS_INDIA&version=1.3.0&service=WMS&request=GetLegendGraphic&sld_version=1.1.0&layer=MoistureIndex&format=image/png&STYLE=default',
        title: 'Index d\'humidité des sols',
      },
    },
  ],
  baseLayers: [
    {
      type: 'WCSElevation',
      name: 'Elevation',
      baseUrl: 'http://80.158.22.249/mapserv?map=WMS_SRTM',
      coverage: 'SRTM',
      version: '1.0.0',
      minElevation: -32000,
      scale: 2,
      attribution: '<img src="https://visibleearth.nasa.gov/siteimages/nasa_logo.png" height="25px"/> <a href="https://lta.cr.usgs.gov/srtm/data_distribution_policy">&copy; Data: NASA-NGA partnership / Web service : CNES</a>',
    },
    {
      name: 'Blue Marble',
      type: 'WMS',
      baseUrl: 'http://80.158.22.249/mapserv?map=WMS_BLUEMARBLE',
      visible: true,
      background: true,
    },
    // {
    //   category: 'Other',
    //   type: 'Atmosphere',
    //   exposure: 2.0,
    //   wavelength: [0.650, 0.570, 0.475],
    //   kr: 0.0025,
    //   km: 0.0015,
    //   sunBrightness: 15.0,
    //   name: 'Atmosphere',
    //   visible: true,
    // },
    {
      category: 'Other',
      type: 'TileWireframe',
      name: 'Coordinates Grid',
      outline: true,
      visible: true,
      attribution: '<img src="http://80.158.22.249/resources/sco/logos/mizar.png" height="25px"/> <a href="https://github.com/MizarWeb/Mizar">&copy; MIZAR</a>',
    },
  ],
}
