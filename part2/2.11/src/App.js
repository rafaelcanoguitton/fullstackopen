import React, { useState, useEffect } from "react";
import axios from "axios";
//Components
const App = () => {
  const [people, setPeople] = useState([]);

  useEffect(() => {
    console.log("effect");
    axios.get("http://localhost:3001/persons").then((response) => {
      setPeople(response.data);
    });
  }, []);
  return (
    <>
      <h1>Fetching from server</h1>
      <ul>
        {people.map((person) => (
          <li>
            {person.name} {person.number}
          </li>
        ))}
      </ul>
    </>
  );
};

export default App;
