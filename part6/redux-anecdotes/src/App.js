import React, { useEffect } from "react";
import AnecdoteList from "./components/AnecdoteList";
import AnectodeForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import FilterForm from "./components/FilterForm";
import { useDispatch } from "react-redux";
import { initiateAnecdotes } from "./reducers/anecdoteReducer";
const App = () => {
  const dispatch = useDispatch();
  useEffect(async () => {
    dispatch(initiateAnecdotes());
  }, [dispatch]);
  return (
    <div>
      <Notification />
      <FilterForm />
      <AnecdoteList />
      <AnectodeForm />
    </div>
  );
};

export default App;
