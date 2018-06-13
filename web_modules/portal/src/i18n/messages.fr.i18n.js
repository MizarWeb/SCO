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
 * i18n messages French language
 * @type {*}
 */
const messages = {
  'map.search.hint': 'Rechercher',
  'map.scenario.layer-manager': 'Gestion des calques',
  'map.scenario.quit-scenario': 'Quitter le scenario',
  'map.scenario.active-data': 'Activer les données',
  'map.scenario.description.more': 'Suite',
  'map.scenario.description.less': 'Réduire',
  'map.scenario.copyright-infos': 'Droits d\'auteur',

  'page.actions.close': 'Fermer',
  'page.actions.save': 'Sauvegarder',

  'page.graph.title': 'Graphe de {title}',
  'page.help.title': 'Mentions légales & crédits',
  'page.help.scenario.title': 'Scénario:',
  'page.help.software.title': 'Logiciels:',
  'page.help.scenario.palavas.title': 'Palavas-les-Flots sous surveillance',
  'page.help.scenario.palavas.text': 'Le LEGOS a développé la procédure en coopération avec le CNES (fourniture des Modèles numériques de terrain) et son pôle de données altimétriques AVISO (fourniture des données de niveau de la mer), le BRGM (modélisation hydrodynamique des tempêtes) et CLS (traitement des données du niveau de la mer). CLS a également finalisé le recalage des MNT avec les niveaux de la mer grâce au système de référence géodésique fourni par le GRGS. La méthode a été validée avec les données de nivellement in situ de l’IGN ainsi qu’avec les données lidar de son programme LITTO 3D développé avec le SHOM. Le projet a pu être mené à bien grâce au financement du programme TOSCA du CNES.',
  'page.help.scenario.niger.title': 'Tous les chemins de l\'eau mènent à Niamey',
  'page.help.scenario.niger.text': 'En partenariat avec le CNES qui fournit les données satellite, ce projet est porté par l’IRD et l INSU/CNRS, via le laboratoire GET et le LEGOS, en coopération avec l’Autorité du Bassin du Niger. Utilisateur final, l’ABN apporte les données de terrain et son expertise pour la validation. L’IRD a organisé les campagnes de validation in situ  des données satellitaires de pluie à Niamey  et Ouagadougou, financées par le CNES dans le cadre de Megha-Tropiques. L’IRD a développé le modèle hydrologique MGB adapté au Niger avec l’institut de recherche hydrologique brésilien IPH. Les produits TAPEER sont diffusés sur le pôle de données Aeris. L’intégration des données spatiales et de la modélisation pour favoriser les applications est soutenue par le programme SWOT aval du CNES.',
  'page.help.scenario.mont-blanc.title': 'La perte d\'altitude du Mont-Blanc',
  'page.help.scenario.mont-blanc.text': 'Cette méthode d’observation spatiale a été développée par les chercheurs du LEGOS à partir des images Spot 5 et Pléiades, fournies par le CNES. La méthode a été validée grâce aux mesures de terrain des chercheurs de l’IGE, au travers de leur programme GlacioClim. Les financements TOSCA (CNES) et PNTS ont soutenu tous ces chercheurs.',
  'page.help.scenario.poyang.title': 'TODO POYANG',
  'page.help.scenario.poyang.text': 'TODO',
  'page.help.scenario.inde.title': 'Anticiper la sécheresse agronomique de l\'Inde',
  'page.help.scenario.inde.text': 'Pilote du projet, le CESBIO a développé les algorithmes de traitement des données SMOS et Sentinel avec le support du laboratoire CEFIRSE-IRD, de l’INSU- CNRS et du CEFIRES NGRI BRGM. Les données satellite ont été fournies par le Centre Aval de Traitement des Données SMOS (CATDS) du CNES et par l’Ifremer, ainsi que par l’ESA dans le cadre des programmes Living planet et Copernicus. Les chercheurs ont été financés grâce au programme TOSCA du CNES et ESA Living Planet. Née de ces travaux, la start-up AAPAH Innovation s’est installée à Hyderabad, capitale de la région indienne de l’Andhra Pradesh.',


  'page.layer-manager.title': 'Calques de {title}',
  'page.layer-manager.subtitle': 'Gestion de l\'ordre des calques et leur opacité',
  'page.layer-manager.rasters': '{size} rasters',
  'page.layer-manager.layers': '{size} calques',
  'page.layer-manager.opaque': 'Opaque',
  'page.layer-manager.transparent': 'Transparent',

  'page.legend.title': 'Legende de {title}',
  'page.legend.scenario-notice.title': 'Informations du scenario',

  'page.copyright.title': 'Liste des calques et droits d\'auteur ',
  'page.copyright.copyright': 'Droits d\'auteurs',
  'page.copyright.layer-name': 'Nom du calque',

  'page.menu.scenario-list': 'Liste des scenario',
  'page.menu.search': 'Rechercher',
  'page.menu.about': 'Mentions légales',
  'page.menu.title': 'Menu',
  'page.menu.locale': 'Français',

  'page.scenario-list.title': 'Changements climatiques',
  'page.scenario-list.subtitle': 'Selectionner un des ces scénarios pour voir ses données',

  'page.search-results.title': 'Résultats de recherche',
  'map.search.size': '{size, plural, =0 {Pas de résultats} one {# résultat} other {# résultats}}',

  'page.temporal-form.stepTime.6hour': '6 heures',
  'page.temporal-form.stepTime.1day': '1 jour',
  'page.temporal-form.stepTime.1month': '1 mois',
  'page.temporal-form.stepTime.1year': '1 an',
  'page.temporal-form.stepTime.label': 'Pas temporel',
  'page.temporal-form.startDate': 'Date de début',
  'page.temporal-form.stopDate': 'Date de fin',
  'page.temporal-form.title': 'Gestion temporelle',
}

export default messages
