import { ApolloProvider } from "@apollo/client";
import React, { useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import LoginForm from "./components/Login";
import Recommendations from "./components/Recommend";
const App = () => {
  const [page, setPage] = useState("authors");
  const [token, setToken] = useState(null);
  const [books, setBooks] = useState([]);
  return (
    <ApolloProvider>
      <div>
        <div>
          <button token={token} onClick={() => setPage("authors")}>
            authors
          </button>
          <button onClick={() => setPage("books")}>books</button>
          {token ? (
            <button onClick={() => setPage("add")}>add book</button>
          ) : null}
          <button onClick={() => setPage("login")}>login</button>
        </div>

        <Authors show={page === "authors"} />

        <Books show={page === "books"} setBooks={setBooks} />

        <NewBook show={page === "add"} />
        <Recommendations
          show={page === "recommend"}
          books={books}
          recommendations={token.recommendations}
        />
        <LoginForm show={page === "login"} setToken={setToken} />
      </div>
    </ApolloProvider>
  );
};

export default App;
