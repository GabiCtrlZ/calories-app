import { combineReducers } from 'redux'

import ui from './ui-reducer'
import general from './general-reducer'
import calories from './calories-reducer'
import fav from './fav-reducer'
import logs from './logs-reducer'
import meals from './meals-reducer'

const allReducers = combineReducers({
  ui,
  general,
  calories,
  fav,
  logs,
  meals,
})

export default allReducers