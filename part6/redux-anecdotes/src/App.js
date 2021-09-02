import React from "react";
import AnecdoteList from "./components/AnecdoteList";
import AnectodeForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
const App = () => {
  return (
    <div>
      <Notification/>
     <AnecdoteList/>
     <AnectodeForm/>
    </div>
  );
};

export default App;
