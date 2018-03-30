import { UserActions, getUserReducer, getUserSelectors } from '@sco/clients'

/**
 * Todo : rename to UIClient,
 * contains all actions the user can do with our HMI
 * @author Léo Mieulet
 */
const ENTITIES_STORE_PATH = ['portal', 'user']

const userReducer = getUserReducer()
const userActions = new UserActions()
const userSelectors = getUserSelectors(ENTITIES_STORE_PATH)

module.exports = {
  userReducer,
  userActions,
  userSelectors,
}
