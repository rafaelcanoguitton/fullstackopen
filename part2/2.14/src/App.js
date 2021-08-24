import React, { useState, useEffect } from "react";
import axios from "axios";
//Components
const App = () => {
  const [countries, setCountry] = useState([]);
  const [newFilter, setFilter] = useState("");
  const [weather, setWeather] = useState([]);
  useEffect(() => {
    axios.get("https://restcountries.eu/rest/v2/all").then((response) => {
      setCountry(response.data);
    });
  }, []);
  const countriesToShow = countries.filter((country) =>
    country.name.toLowerCase().includes(newFilter.toLowerCase())
  );
  useEffect(() => {
    if (countriesToShow.length === 1) {
      axios
        .get(
          `http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_API_KEY}&query=${countriesToShow[0].name}`
        )
        .then((response) => {
          setWeather(response.data);
        });
    }
  }, [newFilter]);
  const filterChange = (event) => {
    setFilter(event.target.value);
  };
  const showSpecific = (country) => {
    setFilter(country.name);
  };
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
            <img
              width="200"
              height="100"
              src={countriesToShow[0].flag}
              alt={countriesToShow[0].name}
            ></img>
            {weather.length > 0 ? (
              <>
                <h2>Weather in {countriesToShow[0].name}</h2>
                <b>Temperature:</b>
                <p> {weather.current.temperature}</p>
                <img
                  width="200"
                  height="100"
                  src={weather.current.weather_icons}
                  alt={countriesToShow[0].name}
                ></img>
                <b>Wind:</b>
                <p>
                  {" "}
                  {weather.current.wind_speed} mph direction{" "}
                  {weather.current.wind_dir}
                </p>
              </>
            ) : (
              <></>
            )}
          </>
        )
      ) : (
        <h2>Please type a country</h2>
      )}
    </>
  );
};

export default App;
