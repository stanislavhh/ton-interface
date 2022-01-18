// Redux
import { combineReducers } from 'redux'

// Reducers
import { appReducer } from 'modules/layout'

// Reducer modules
export default combineReducers({
  app: appReducer,
})
