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

/**
 * i18n messages english language
 * @type {*}
 */
const messages = {
  'map.search.hint': 'Search in scenarios',
  'map.scenario.layer-manager': 'Layer manager',
  'map.scenario.quit-scenario': 'Quit scenario',
  'map.scenario.active-data': 'Active data',
  'map.scenario.description.more': 'More',
  'map.scenario.description.less': 'Less',
  'map.scenario.copyright-infos': 'Copyrights',

  'page.actions.close': 'Close',
  'page.actions.save': 'Save',

  'page.graph.title': '{title} graph',

  'page.help.intro': 'The battle to curb global warming is well and truly engaged. On 12 December 2015, a historic event took place in Paris when 195 nations committed to limit their greenhouse gas emissions in order to restrict the rise in global temperatures to 1.5°C. We must now go further and seek to understand and gauge the impacts of climate change at global and local scales. And for that, satellites are set to play a key role, giving us the clear picture that only the vantage point of space can provide. Today, under the impetus of the world’s space agencies, the Space Climate Observatory (SCO) is being established to federate resources, data and energies. As an international cooperation initiative for humankind, the SCO intends to ready territories and populations for the challenges that lie ahead.',
  'page.help.title': 'Information & acknowledgement',
  'page.help.sco-copyright': 'This website is a free software release under the <a href="http://www.gnu.org/licenses/">GNU</a> license. The source code is available on the <a href="https://github.com/MizarWeb/SCO">Github platform</a>.',
  'page.help.scenario.title': 'Scenario:',
  'page.help.software.title': 'Softwares:',
  'page.help.scenario.palavas.title': 'Palavas-les-Flots under close watch',
  'page.help.scenario.palavas.text': 'The LEGOS space geophysics and oceanography research laboratory developed the procedure working with CNES (which supplied digital terrain models) and its AVISO altimetry data hub (which supplied sea level data), the French geological survey BRGM (which provided hydrodynamic storm models) and CLS (which processed sea level data). CLS also finalized matching of DTMs with sea levels using the geodetic reference system supplied by GRGS, the French space geodesy research centre. The method was validated with in-situ control point data from IGN, France’s national mapping and survey agency, and lidar data from its LITTO 3D programme developed with SHOM, the French naval hydrographic and oceanographic office. The project was completed with funding from CNES’s TOSCA Earth, oceanography, land surfaces and atmosphere programme.',
  'page.help.scenario.niger.title': 'Tous les chemins de l\'eau mènent à Niamey',
  'page.help.scenario.niger.text': 'En partenariat avec le CNES qui fournit les données satellite, ce projet est porté par l’IRD et l INSU/CNRS, via le laboratoire GET et le LEGOS, en coopération avec l’Autorité du Bassin du Niger. Utilisateur final, l’ABN apporte les données de terrain et son expertise pour la validation. L’IRD a organisé les campagnes de validation in situ  des données satellitaires de pluie à Niamey  et Ouagadougou, financées par le CNES dans le cadre de Megha-Tropiques. L’IRD a développé le modèle hydrologique MGB adapté au Niger avec l’institut de recherche hydrologique brésilien IPH. Les produits TAPEER sont diffusés sur le pôle de données Aeris. L’intégration des données spatiales et de la modélisation pour favoriser les applications est soutenue par le programme SWOT aval du CNES.',
  'page.help.scenario.mont-blanc.title': 'The altitude loss of Mont-Blanc',
  'page.help.scenario.mont-blanc.text': 'This space-based observation method was developed by research scientists at LEGOS from SPOT 5 and Pleiades imagery provided by CNES. The method was validated by field surveys by research scientists working on the GlacioClim programme at the IGE environmental geosciences institute, supported with funding from CNES’s TOSCA Earth, oceanography, land surfaces and atmosphere programme and from PNTS.',
  'page.help.scenario.poyang.title': 'TODO POYANG',
  'page.help.scenario.poyang.text': 'TODO',
  'page.help.scenario.inde.title': 'Anticiper la sécheresse agronomique de l\'Inde',
  'page.help.scenario.inde.text': 'Pilote du projet, le CESBIO a développé les algorithmes de traitement des données SMOS et Sentinel avec le support du laboratoire CEFIRSE-IRD, de l’INSU- CNRS et du CEFIRES NGRI BRGM. Les données satellite ont été fournies par le Centre Aval de Traitement des Données SMOS (CATDS) du CNES et par l’Ifremer, ainsi que par l’ESA dans le cadre des programmes Living planet et Copernicus. Les chercheurs ont été financés grâce au programme TOSCA du CNES et ESA Living Planet. Née de ces travaux, la start-up AAPAH Innovation s’est installée à Hyderabad, capitale de la région indienne de l’Andhra Pradesh.',


  'page.layer-manager.title': '{title} layers',
  'page.layer-manager.subtitle': 'Manage layers order and opacity',
  'page.layer-manager.rasters': '{size} Rasters',
  'page.layer-manager.layers': '{size} Layers',
  'page.layer-manager.opaque': 'Opaque',
  'page.layer-manager.transparent': 'Transparent',

  'page.legend.title': '{title} legend',
  'page.legend.scenario-notice.title': 'Scenario notice',

  'page.copyright.title': 'List of layers and copyrights',
  'page.copyright.copyright': 'Copyright',
  'page.copyright.layer-name': 'Layer name',

  'page.menu.scenario-list': 'Scenario list',
  'page.menu.search': 'Search',
  'page.menu.about': 'About',
  'page.menu.title': 'Menu',
  'page.menu.locale': 'English',

  'page.scenario-list.title': 'Climate changes effects',
  'page.scenario-list.subtitle': 'Select one of the following scenari to see its data',

  'page.search-results.title': 'Search results',
  'map.search.size': '{size, plural, =0 {No results} one {# result} other {# results}}',

  'page.temporal-form.stepTime.6hour': '6 hours',
  'page.temporal-form.stepTime.1day': '1 day',
  'page.temporal-form.stepTime.1month': '1 month',
  'page.temporal-form.stepTime.1year': '1 year',
  'page.temporal-form.stepTime.label': 'Step time',
  'page.temporal-form.startDate': 'Start date',
  'page.temporal-form.stopDate': 'Stop date',
  'page.temporal-form.title': 'Time configuration',

}

export default messages
