import values from 'lodash/values'

const MAP_ENUM = {
  INITIAL: 'INITIAL',
  INFO_SCENARIO: 'INFO_SCENARIO',
  SHOWING_SCENARIO: 'SHOWING_SCENARIO',
}
const MAP_ENUM_VALUES = values(MAP_ENUM)

module.exports = {
  MAP_ENUM,
  MAP_ENUM_VALUES,
}
