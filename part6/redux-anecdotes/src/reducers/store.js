//At first I didn't know but just about now realized that
//here we'll combine all reducers
import { createStore, combineReducers } from "redux";
import anectodeReducer from "./anecdoteReducer";

const reducer=combineReducers({
    anecdotes:anectodeReducer,
});
const store=createStore(reducer);

export default store;
