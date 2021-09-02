//At first I didn't know but just about now realized that
//here we'll combine all reducers
import { createStore, combineReducers } from "redux";
import anectodeReducer from "./anecdoteReducer";
import notificationReducer from "./notificationReducer";
import filterReducer from "./filterReducer";
import {composeWithDevTools}from 'redux-devtools-extension'
const reducer = combineReducers({
  anecdotes: anectodeReducer,
  notification:notificationReducer,
  filter:filterReducer,
});
const store = createStore(reducer,composeWithDevTools());

export default store;
