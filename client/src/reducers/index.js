import { combineReducers } from 'redux'

import ui from './ui-reducer'
import general from './general-reducer'
import calories from './calories-reducer'
import fav from './fav-reducer'

const allReducers = combineReducers({
  ui,
  general,
  calories,
  fav,
})

export default allReducers