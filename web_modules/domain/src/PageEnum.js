import values from 'lodash/values'

const PAGE_ENUM = {
  NONE: 'NONE',
  HELP: 'HELP',
  LIST_SCENARIO: 'LIST_SCENARIO',
  TEMPORAL_FORM: 'TEMPORAL_FORM',
  SEARCH_RESULTS: 'SEARCH_RESULTS',
}
const PAGE_ENUM_VALUES = values(PAGE_ENUM)

module.exports = {
  PAGE_ENUM,
  PAGE_ENUM_VALUES,
}
