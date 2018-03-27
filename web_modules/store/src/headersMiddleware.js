/*
 * Copyright 2018 SCO - Space Climate Observatory
 *
 * This file is part of CSO.
 *
 * CSO is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * CSO is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with CSO. If not, see <http://www.gnu.org/licenses/>.
 *
 * This file is a work derived from Regards OSS
 *
 * Copyright 2017 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
 *
 * This file is part of REGARDS.
 *
 * REGARDS is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * REGARDS is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with REGARDS. If not, see <http://www.gnu.org/licenses/>.
 **/
import isString from 'lodash/isString'
// Redux middleware provides a third-party extension point
// between dispatching an action, and the moment it reaches the reducer
const { CALL_API } = require('redux-api-middleware')


/**
 * Builds default types headers, to be used when not overriden by the action
 */
const getDefaultTypesHeaders = (callAPI) => {
  const defaultTypeHeaders = {
    Accept: 'application/json, text/plain',
  }
  // String body: json, otherwise: none (multi part form, each part specifies its type)
  if (isString(callAPI.body)) {
    defaultTypeHeaders['Content-type'] = 'application/json'
  }
  return defaultTypeHeaders
}

// Intercept actions
// If the action is formated as [CALL_API]: {...}, inject the headers
const headersMiddleware = () => next => (action) => {
  const callAPI = action[CALL_API]
  if (callAPI) {
    const specificHeaders = callAPI.headers || {}
    callAPI.headers = callStore =>
      // merge the specified headers with automatically added ones
      ({
        // lower preference: locally added headers
        ...getDefaultTypesHeaders(callAPI),
        // higher preference: action specific headers
        ...specificHeaders,
      })
  }
  return next(action)
}

export default headersMiddleware
