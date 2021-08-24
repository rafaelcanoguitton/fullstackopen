import React, { useState, useEffect } from "react";
import axios from "axios";
//Components
const App = () => {
  const [countries, setCountry] = useState([]);
  const [newFilter, setFilter] = useState("");
  useEffect(() => {
    console.log("effect");
    axios.get("https://restcountries.eu/rest/v2/all").then((response) => {
      setCountry(response.data);
    });
  }, []);
  const countriesToShow = countries.filter((country) =>
    country.name.toLowerCase().includes(newFilter.toLowerCase())
  );
  const filterChange = (event) => {
    setFilter(event.target.value);
  };
  const showSpecific = (country) => {
    setFilter(country.name);
  };
  console.log(process.env.REACT_APP_API_KEY);
  return (
    <>
      <h1>Fetching countries from server</h1>
      <form>
        <div>
          Find countries
          <input value={newFilter} onChange={filterChange} />
        </div>
      </form>
      {newFilter !== "" ? (
        countriesToShow.length > 10 ? (
          <h2>Too many matches, specify another filter</h2>
        ) : countriesToShow.length !== 1 ? (
          <ul>
            {countriesToShow.map((country) => (
              <>
                <li>{country.name}</li>
                <button onClick={() => showSpecific(country)}> show </button>
              </>
            ))}
          </ul>
        ) : (
          <>
            <h2>{countriesToShow[0].name}</h2>
            <div>capital {countriesToShow[0].capital}</div>
            <div>population {countriesToShow[0].population}</div>
            <h3>languages</h3>
            <ul>
              {countriesToShow[0].languages.map((language) => (
                <li>{language.name}</li>
              ))}
            </ul>
            <img src={countriesToShow[0].flag}></img>
          </>
        )
      ) : (
        <h2>Please type a country</h2>
      )}
    </>
  );
};

export default App;
