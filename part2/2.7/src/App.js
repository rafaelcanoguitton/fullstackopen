import React, { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");
  //Function to add people
  const addPerson = (event) => {
    event.preventDefault();
    const newPerson = {
      name: newName,
    };
    let found = false;
    for (var i = 0; i < persons.length; i++) {
      if (persons[i].name === newName) {
        found = true;
        break;
      }
    }
    if (!found) {
      setPersons(persons.concat(newPerson));
    } else {
      window.alert(`${newName} is already added to phonebook`);
    }
    setNewName("");
  };
  //Function to handle the input changing
  const handlePersonChange = (event) => {
    setNewName(event.target.value);
  };
  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handlePersonChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map((person) => (
          <li key={persons.indexOf(person, 0)}>{person.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
