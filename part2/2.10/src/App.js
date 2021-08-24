import React, { useState } from "react";
//Components
const Filter = ({ filter, filterChange }) => {
  return (
    <form>
      <div>
        Filter shown with<input value={filter} onChange={filterChange} />
      </div>
    </form>
  );
};
const PersonForm = ({
  name,
  number,
  nameHandler,
  numberHandler,
  addPerson,
}) => {
  return (
    <form onSubmit={addPerson}>
      <div>
        Name: <input value={name} onChange={nameHandler} />
      </div>
      <div>
        Number: <input value={number} onChange={numberHandler} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};
const Persons = ({ people }) => {
  return (
    <ul>
      {people.map((person) => (
        <li key={people.indexOf(person)}>
          {person.name} {person.number}
        </li>
      ))}
    </ul>
  );
};
const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456" },
    { name: "Ada Lovelace", number: "39-44-5323523" },
    { name: "Dan Abramov", number: "12-43-234345" },
    { name: "Mary Poppendieck", number: "39-23-6423122" },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");

  //Function to add people
  const addPerson = (event) => {
    event.preventDefault();
    const newPerson = {
      name: newName,
      number: newNumber,
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
    setNewNumber("");
  };
  const handleFilterChange = (event) => {
    setNewFilter(event.target.value);
  };
  //Function to handle the input changing
  const handlePersonChange = (event) => {
    setNewName(event.target.value);
  };
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };
  const namesToShow = persons.filter((person) =>
    person.name.toLowerCase().includes(newFilter.toLowerCase())
  );
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={newFilter} filterChange={handleFilterChange} />
      <h3>Add a new</h3>
      <PersonForm
        name={newName}
        number={newNumber}
        nameHandler={handlePersonChange}
        numberHandler={handleNumberChange}
        addPerson={addPerson}
      />
      <h3>Numbers</h3>
      <Persons people={namesToShow} />
    </div>
  );
};

export default App;
