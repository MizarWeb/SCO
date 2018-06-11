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
import { PAGE_ENUM, PAGE_ENUM_VALUES } from './PageEnum'
import { MAP_ENUM, MAP_ENUM_VALUES } from './MapEnum'
import { TEMPORAL_STEP_ENUM, TEMPORAL_STEP_ENUM_VALUES } from './TemporalStepEnum'
import { TEMPORAL_TYPE_ENUM, TEMPORAL_TYPE_ENUM_VALUES } from './TemporalTypeEnum'
import MizarConfEn from './MizarConf/config.en'
import MizarConfFr from './MizarConf/config.fr'
import { Collection, CollectionList } from './Shapes/Collection'
import { Scenario, ScenarioList } from './Shapes/Scenario'
import { Thematic, ThematicList } from './Shapes/Thematic'
import { Layer, LayerList } from './Shapes/Layer'
import { GlobalLayerList } from './Shapes/GlobalLayer'
import LayerTemporalInfos from './Shapes/LayerTemporalInfos'
import LayerParameters from './Shapes/LayerParameters'
import getCategoryIcon from './CategoryIcon/CategoryIcon'
import LayerPeriodUtils from './utils/LayerPeriodUtils'
import PeriodUtils from './utils/PeriodUtils'
import parseLanguageLocale from './LocaleUtils'
import { LOCALES_ENUM, LOCALES_ENUM_VALUES } from './LocaleEnum'

/**
 * This module shares constants
 * @author Léo Mieulet
 */
module.exports = {
  getCategoryIcon,

  LayerPeriodUtils,
  PeriodUtils,

  PAGE_ENUM,
  PAGE_ENUM_VALUES,
  MAP_ENUM,
  MAP_ENUM_VALUES,
  TEMPORAL_STEP_ENUM,
  TEMPORAL_STEP_ENUM_VALUES,
  TEMPORAL_TYPE_ENUM,
  TEMPORAL_TYPE_ENUM_VALUES,

  parseLanguageLocale,
  LOCALES_ENUM,
  LOCALES_ENUM_VALUES,


  mizarConf: {
    en: MizarConfEn,
    fr: MizarConfFr,
  },

  Shapes: {
    Collection,
    CollectionList,
    Scenario,
    ScenarioList,
    Thematic,
    ThematicList,
    Layer,
    LayerList,
    GlobalLayerList,
    LayerTemporalInfos,
    LayerParameters,
  },
}
