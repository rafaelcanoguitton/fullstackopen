import {
  ApolloProvider,
  useApolloClient,
  useSubscription,
} from "@apollo/client";
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
  const client = useApolloClient();
  const updateCacheWith = (addedBook) => {
    const includedIn = (set, object) =>
      set.map((p) => p.id).includes(object.id);
    const dataInStore = client.readQuery({ query: ALL_BOOKS });
    if (!includedIn(dataInStore.allBooks, addedBook)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks: dataInStore.allBooks.concat(addedBook) },
      });
    }
  };
  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded;
      window.alert(`${addedBook.title} added`);
      updateCacheWith(addedBook);
    },
  });
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

        <NewBook show={page === "add"} updateCacheWith={updateCacheWith}/>
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
