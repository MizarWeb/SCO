import { UIActions, getUIReducer, getUISelectors } from '@sco/clients'

/**
 * Contains all actions the user can do with our HMI
 * @author Léo Mieulet
 */
const ENTITIES_STORE_PATH = ['portal', 'ui']

const uiReducer = getUIReducer()
const uiActions = new UIActions()
const uiSelectors = getUISelectors(ENTITIES_STORE_PATH)

module.exports = {
  uiReducer,
  uiActions,
  uiSelectors,
}
