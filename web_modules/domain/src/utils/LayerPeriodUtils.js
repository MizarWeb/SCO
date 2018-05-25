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
import filter from 'lodash/filter'
import has from 'lodash/has'
import map from 'lodash/map'
import invokeMap from 'lodash/invokeMap'
import minBy from 'lodash/minBy'
import maxBy from 'lodash/maxBy'
import size from 'lodash/size'
import without from 'lodash/without'
import find from 'lodash/find'
import forEach from 'lodash/forEach'
import sortBy from 'lodash/sortBy'
import { TEMPORAL_STEP_ENUM, TEMPORAL_STEP_ENUM_VALUES, TEMPORAL_STEP_ENUM_TO_SECONDS } from '../TemporalStepEnum'
import { TEMPORAL_TYPE_ENUM } from '../TemporalTypeEnum'
import PeriodUtils from './PeriodUtils'

/**
 * > Time Extents can be declared with the following syntax for the wms_timeextent metadata (see Annex C.3 in the WMS 1.1.1 specification document for a full description):
 *
 *     value - a single value. This is not directly supported in MapServer but there is an easy workwound by specifying the same value as min and max.
 *     value1,value2,value3,... - a list of multiple values.
 *     min/max/resolution - an interval defined by its lower and upper bounds and its resolution.
 *     min1/max1/resolution1,min2/max2/resolution2,... - a list of multiple intervals.
 *
 * This regex only supports the 3rd case - min/max/resolution
 */
const iso8601PeriodRegex = /^(.+)\/(.+)\/(.+)$/


/**
 * @source https://stackoverflow.com/a/29153059/2294168
 */
const iso8601DurationRegex = /(-)?P(?:([.,\d]+)Y)?(?:([.,\d]+)M)?(?:([.,\d]+)W)?(?:([.,\d]+)D)?(?:T(?:([.,\d]+)H)?(?:([.,\d]+)M)?(?:([.,\d]+)S)?)?$/

/**
 * Converts an ISO 8601 Duration into an object
 */
const parseISO8601Duration = function (iso8601Duration) {
  const matches = iso8601Duration.match(iso8601DurationRegex)

  let days = matches[5] === undefined ? 0 : parseInt(matches[5], 10)
  // Do not use weeks, days are good
  days += (matches[4] === undefined ? 0 : parseInt(matches[4], 10)) * 7

  return {
    sign: matches[1] === undefined ? '+' : '-',
    years: matches[2] === undefined ? 0 : parseInt(matches[2], 10),
    months: matches[3] === undefined ? 0 : parseInt(matches[3], 10),
    days,
    hours: matches[6] === undefined ? 0 : parseInt(matches[6], 10),
    minutes: matches[7] === undefined ? 0 : parseInt(matches[7], 10),
    seconds: matches[8] === undefined ? 0 : parseFloat(matches[8]),
  }
}

const transformDurationIntoSeconds = duration => ((((((((duration.years * 365) + duration.days) * 24) + duration.hours) * 60) + duration.minutes) * 60) + duration.seconds)


const LayerPeriodUtils = {
  /**
   * Return the biggest step among all layers
   * @param {Object} layerPeriods temporal info per layer
   */
  getCommonStep(layerPeriods) {
    const stepList = map(layerPeriods, layerPeriod => layerPeriod.step)
    if (stepList.includes(TEMPORAL_STEP_ENUM.YEAR)) {
      return TEMPORAL_STEP_ENUM.YEAR
    }
    if (stepList.includes(TEMPORAL_STEP_ENUM.MONTH)) {
      return TEMPORAL_STEP_ENUM.MONTH
    }
    if (stepList.includes(TEMPORAL_STEP_ENUM.DAY)) {
      return TEMPORAL_STEP_ENUM.DAY
    }
    if (stepList.includes(TEMPORAL_STEP_ENUM.SIX_HOURS)) {
      return TEMPORAL_STEP_ENUM.SIX_HOURS
    }
    throw new Error(`Missing one TEMPORAL_STEP for the value (${JSON.stringify(stepList)}) ?`)
  },
  /**
   * Return the list of unavailable step that the user can't ask for
   * @param {TEMPORAL_STEP_ENUM} step current step
   */
  getUnavailableSteps(step) {
    // collect all step the user can ask for
    const availableSteps = []
    switch (step) {
      case TEMPORAL_STEP_ENUM.SIX_HOURS:
        availableSteps.push(TEMPORAL_STEP_ENUM.SIX_HOURS)
      // falls through
      case TEMPORAL_STEP_ENUM.DAY:
        availableSteps.push(TEMPORAL_STEP_ENUM.DAY)
      // falls through
      case TEMPORAL_STEP_ENUM.MONTH:
        availableSteps.push(TEMPORAL_STEP_ENUM.MONTH)
      // falls through
      case TEMPORAL_STEP_ENUM.YEAR:
        availableSteps.push(TEMPORAL_STEP_ENUM.YEAR)
        break
      default:
        throw new Error(`Missing one TEMPORAL_STEP for the value (${step}) ?`)
    }
    // using the list of all this enum values, keep only steps not available
    return without(TEMPORAL_STEP_ENUM_VALUES, ...availableSteps)
  },

  /**
   * Return the corresponding TEMPORAL_STEP_ENUM value
   * @param {Number} duration in seconds
   */
  reconizeDuration(duration) {
    switch (duration) {
      case TEMPORAL_STEP_ENUM_TO_SECONDS.YEAR:
        return TEMPORAL_STEP_ENUM.YEAR
      case TEMPORAL_STEP_ENUM_TO_SECONDS.MONTH:
        return TEMPORAL_STEP_ENUM.MONTH
      case TEMPORAL_STEP_ENUM_TO_SECONDS.DAY:
        return TEMPORAL_STEP_ENUM.DAY
      case TEMPORAL_STEP_ENUM_TO_SECONDS.SIX_HOURS:
        return TEMPORAL_STEP_ENUM.SIX_HOURS
      default:
        throw new Error(`Unsupported period duration (${duration}) provided by a layer in the current scenario`)
    }
  },
  /**
   * Parse layer info and return the type of period
   * @param {*} layerInfo
   */
  extractPeriodTypeFromLayersInfos(layerInfos) {
    const periodTypes = map(layerInfos, (layerInfo) => {
      const { period } = layerInfo
      if (period.indexOf(',') > 0) {
        const partOfPeriodDefinition = period.split(',')
        // get an array of `true` if they are all period, false if they are all values
        const areSubValuesPeriods = invokeMap(partOfPeriodDefinition, 'match', iso8601PeriodRegex)
        // check if there are period AND value on the same time in the array
        const insupportedPeriodDefinition = find(areSubValuesPeriods, isSubValuesPeriod => (isSubValuesPeriod !== areSubValuesPeriods[0]))
        if (insupportedPeriodDefinition) {
          throw new Error("Unsupported type of period: this application doesn't provide a support for layers that contains values and period on the same time")
        }
        // can be multiple period or multiples values
        if (partOfPeriodDefinition[0].match(iso8601PeriodRegex)) {
          return TEMPORAL_TYPE_ENUM.MULTIPLE_PERIOD
        }
        return TEMPORAL_TYPE_ENUM.MULTIPLE_VALUES
      }
      // either Period or Single value
      if (period.match(iso8601PeriodRegex)) {
        return TEMPORAL_TYPE_ENUM.PERIOD
      }
      return TEMPORAL_TYPE_ENUM.SINGLE_VALUE
    })
    // check we don't collect two different types of period not compatible
    // first let's ignore SINGLE_VALUE as they are compatible with others
    const constrainingPeriodsDefinition = find(periodTypes, periodType => (periodType !== TEMPORAL_TYPE_ENUM.SINGLE_VALUE))
    if (!constrainingPeriodsDefinition) {
      // return that SINGLE_VALUE if there is only that
      return constrainingPeriodsDefinition
    }
    const insupportedPeriodsDefinition = find(periodTypes, periodType => (periodType !== TEMPORAL_TYPE_ENUM.SINGLE_VALUE && periodType !== constrainingPeriodsDefinition))
    if (insupportedPeriodsDefinition) {
      throw new Error("Unsupported types of period: this application doesn't provide a support for several layers having different types of period each one")
    }
    return periodTypes[0]
  },
  extractPeriodFromLayerInfo(layerInfo) {
    const { period } = layerInfo
    if (period.indexOf(',') > 0) {
      throw new Error("Unsupported discontinuous period: this application doesn't provide a support for such period definition")
    }
    const parsingResult = period.match(iso8601PeriodRegex)
    if (parsingResult) {
      const periodStep = parseISO8601Duration(parsingResult[3])
      const periodStepInSeconds = transformDurationIntoSeconds(periodStep)
      // expect the period having at least one key different of 0
      if (periodStepInSeconds <= 0) {
        throw new Error('The period must represent an amount of time that pass')
      }
      const step = LayerPeriodUtils.reconizeDuration(periodStepInSeconds)
      return {
        beginDate: new Date(parsingResult[1]),
        endDate: new Date(parsingResult[2]),
        step,
      }
    }
    throw new Error(`Failed to parse the period "${period}"`)
  },
  extractDatesFromLayerInfo(layerDates) {
    const { period } = layerDates
    const dateISOList = period.split(',')
    return map(dateISOList, dateISO => (
      new Date(dateISO)
    ))
  },
  computeLayerTemporalInfoForPeriod(layerInfosWithPeriod) {
    // transform this array of layers infos into array of period info
    const layerPeriods = map(layerInfosWithPeriod, layerInfoWithPeriod => LayerPeriodUtils.extractPeriodFromLayerInfo(layerInfoWithPeriod))
    // retrieve the min date on the attribute endDate
    const layerEndDate = minBy(layerPeriods, lP => (lP.endDate))
    // retrive the max date on the attribute beginDate
    const layerBeginDate = maxBy(layerPeriods, lP => (lP.beginDate))
    // retrive the biggest step in common
    const step = LayerPeriodUtils.getCommonStep(layerPeriods)
    const unavailableSteps = LayerPeriodUtils.getUnavailableSteps(step)
    const nbStep = PeriodUtils.extractNumberOfStep(layerBeginDate.beginDate, layerEndDate.endDate, step)
    return {
      type: TEMPORAL_TYPE_ENUM.PERIOD,
      dateList: [],
      beginDate: layerBeginDate.beginDate,
      endDate: layerEndDate.endDate,
      step,
      nbStep,
      currentDate: layerBeginDate.beginDate,
      currentStep: 0,
      unavailableSteps,
    }
  },
  computeLayerTemporalInfoForMultipleValues(layerInfosWithPeriod) {
    // transform this array of layers infos into array of period info
    const layersDates = map(layerInfosWithPeriod, layerInfoWithPeriod => LayerPeriodUtils.extractDatesFromLayerInfo(layerInfoWithPeriod))
    // merge all dates
    const dateSet = new Set()
    forEach(layersDates, (layerDates) => {
      forEach(layerDates, (date) => {
        const dateAsTime = date.getTime()
        if (!dateSet.has(dateAsTime)) {
          dateSet.add(dateAsTime)
        }
      })
    })
    // Recreate the date array with Date and not timestamp, sorted
    const dateList = map(sortBy(Array.from(dateSet), date => (date)), dateAsInt => new Date(dateAsInt))
    return {
      type: TEMPORAL_TYPE_ENUM.MULTIPLE_VALUES,
      dateList,
      beginDate: dateList[0],
      endDate: dateList[dateList.length - 1],
      step: TEMPORAL_STEP_ENUM.UNSPECIFIED,
      nbStep: dateList.length - 1,
      currentDate: dateList[0],
      currentStep: 0,
      unavailableSteps: [],
    }
  },
  /**
   * Usign layer infos retrieve from Mizar on runtime, we compute here the intersection between all period and step time.
   * It also return inside the object the first date the app should show
   * @param {*} layerInfos
   */
  parseLayers(layerInfos) {
    const layerPeriod = {
      type: TEMPORAL_TYPE_ENUM.UNSPECIFIED,
      dateList: [],
      beginDate: null,
      endDate: null,
      step: null,
      nbStep: 0,
      currentDate: null,
      currentStep: 0,
      unavailableSteps: [],
    }
    // keep only layers with the attribute period
    const layerInfosWithPeriod = filter(layerInfos, layerInfo => has(layerInfo, 'period'))
    if (size(layerInfosWithPeriod) === 0) {
      return layerPeriod
    }

    const periodType = LayerPeriodUtils.extractPeriodTypeFromLayersInfos(layerInfosWithPeriod)
    switch (periodType) {
      case TEMPORAL_TYPE_ENUM.PERIOD:
        return this.computeLayerTemporalInfoForPeriod(layerInfosWithPeriod)
      case TEMPORAL_TYPE_ENUM.MULTIPLE_VALUES:
        return this.computeLayerTemporalInfoForMultipleValues(layerInfosWithPeriod)
      default:
        throw new Error(`Unexpected period type "${periodType}"`)
    }
  },
}

export default LayerPeriodUtils
