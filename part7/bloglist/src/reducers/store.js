import { createStore, combineReducers } from 'redux'
import notificationReducer from './NotificationReducer'
const reducer=combineReducers({
  notification:notificationReducer,
})
const store=createStore(reducer)
export default store