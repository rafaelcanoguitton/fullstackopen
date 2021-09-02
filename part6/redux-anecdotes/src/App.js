import React from "react";
import AnecdoteList from "./components/AnecdoteList";
import AnectodeForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import FilterForm from "./components/FilterForm";
const App = () => {
  return (
    <div>
      <Notification/>
      <FilterForm/>
     <AnecdoteList/>
     <AnectodeForm/>
    </div>
  );
};

export default App;
