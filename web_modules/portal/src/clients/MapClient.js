
import { MapActions, getMapReducer, getMapSelectors } from '@sco/clients'

/**
 * contains all actions related to the map
 * @author Léo Mieulet
 */
const ENTITIES_STORE_PATH = ['portal', 'map']

const mapReducer = getMapReducer()
const mapActions = new MapActions()
const mapSelectors = getMapSelectors(ENTITIES_STORE_PATH)

module.exports = {
  mapReducer,
  mapActions,
  mapSelectors,
}
