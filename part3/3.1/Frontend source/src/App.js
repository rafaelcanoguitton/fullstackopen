import React, { useState, useEffect } from "react";
import peopleService from "./services/people";
//Components
const Filter = ({ filter, filterChange }) => {
  return (
    <form>
      <div>
        Filter shown with
        <input value={filter} onChange={filterChange} />
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
const Persons = ({ people, delPerson }) => {
  return (
    <ul>
      {people.map((person) => (
        <li key={people.indexOf(person)}>
          {person.name} {person.number}{" "}
          <button onClick={delPerson} value={person.id}>
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};
const Notification = ({ message,style }) => {
  if (message !== "") {
    return <div className={style}>{message}</div>;
  }
  return <></>
};
const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");
  const [newMessage, setMessage] = useState("");
  const [success,setSuc]=useState("");
  //Initially load people
  useEffect(() => {
    peopleService.getAll().then((response) => {
      setPersons(response);
    });
  }, []);
  //Function to add people
  const addPerson = (event) => {
    event.preventDefault();
    const newPerson = {
      name: newName,
      number: newNumber,
    };
    let found = false;
    let id;
    for (var i = 0; i < persons.length; i++) {
      if (persons[i].name === newName) {
        found = true;
        id = persons[i].id;
        break;
      }
    }
    if (!found) {
      peopleService.create(newPerson).then((res) => {
        setPersons(persons.concat(res));
        setSuc("success");
        setMessage(`The person '${newPerson.name}' was added`)
        setTimeout(() => {  setMessage(""); }, 3000);
      })
      .catch((error) => {
        setSuc("error");
        setMessage(JSON.stringify(error.response.data.error));
        setTimeout(() => {  setMessage(""); }, 3000);
      });
    } else {
      if (
        window.confirm(
          `${newPerson.name} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        peopleService
          .update(id, newPerson)
          .then((res) => {
            setPersons(persons.map((p) => (p.id != id ? p : res)));
            setSuc("success");
            setMessage(`${newPerson.name} was updated.`)
            setTimeout(() => {  setMessage(""); }, 3000);
          })
          .catch((error) => {
            setSuc("error");
            setMessage(JSON.stringify(error.response.data.error));
            setPersons(persons.filter((p) => p.id != id));
            setTimeout(() => {  setMessage(""); }, 3000);
          });
      }
    }
    setNewName("");
    setNewNumber("");
  };
  //Function to delete people
  const delPeople = (event) => {
    const id = event.target.value;
    const person = persons.find((p) => p.id == id);
    if (window.confirm(`Delete ${person.name} ?`)) {
      peopleService
        .del(id, person)
        .then((statusCode) => {
          if (statusCode === 200) {
            //if I use triple operator !== it doesn't work for some reason.
            setPersons(persons.filter((p) => p.id != id));
            setSuc("success");
            setMessage(`${person.name} was successfully deleted.`);
            setTimeout(() => {  setMessage(""); }, 3000);
          } else {
            setSuc("error");
            setMessage(`There was a problem in the server`);
            setTimeout(() => {  setMessage(""); }, 3000);
          }
        })
        .catch((error) => {
          setSuc("error");
          setMessage(`The person ${person.name} was already deleted from server`);
          //if I use triple operator !== it doesn't work for some reason.
          setPersons(persons.filter((p) => p.id != id));
          setTimeout(() => {  setMessage(""); }, 3000);
        });
    }
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
      <Notification message={newMessage} style={success}/>
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
      <Persons people={namesToShow} delPerson={delPeople} />
    </div>
  );
};

export default App;
