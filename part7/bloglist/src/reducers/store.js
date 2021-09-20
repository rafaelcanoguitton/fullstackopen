import { createStore, combineReducers,applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import notificationReducer from './NotificationReducer'
import blogReducer from './BlogReducer'
import userReducer from './UserReducer'
const reducer=combineReducers({
  notification:notificationReducer,
  blogs:blogReducer,
  user:userReducer
})
const store=createStore(reducer,applyMiddleware(thunk))
export default store