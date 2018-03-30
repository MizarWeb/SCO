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

/**
 * Store the location of the selector in the redux tree, and provides a function to only retrieve the subset of the redux tree
 * @author Léo Mieulet
 */
class BasicSelector {
  /**
   * @param {string[]} rootStore an array of key of the redux tree
   */
  constructor(rootStore) {
    /**
     * @property {string[]} rootStore the keys we need to go over
     * @type {string[]}
     */
    this.rootStore = rootStore
  }

  /**
   * Returns the subset of the store that your reducer is based on
   * @param {object} store the store
   * @returns {object} subset of the store
   */
  uncombineStore(store) {
    let partialStore = store
    try {
      for (let i = 0; i < this.rootStore.length; i += 1) {
        partialStore = partialStore[this.rootStore[i]]
      }
    } catch (e) {
      console.error('this.rootStore = ', this.rootStore)
      console.error('store = ', store)
      throw new Error('Failed to uncombine the store to be able to extract data from the store')
    }
    return partialStore
  }
}

export default BasicSelector
