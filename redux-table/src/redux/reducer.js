import {combineReducers} from 'redux'

import tableReducer, {moduleName as tableModule} from "../ducks/table"

export default combineReducers({
  [tableModule]: tableReducer
})