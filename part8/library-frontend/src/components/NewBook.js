import React, { useState } from "react";
import { useMutation, gql } from "@apollo/client";
const NewBook = (props) => {
  const [title, setTitle] = useState("");
  const [author, setAuhtor] = useState("");
  const [published, setPublished] = useState("");
  const [genre, setGenre] = useState("");
  const [genres, setGenres] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const ALL_BOOKS = gql`
    query {
      allBooks {
        title
        published
        author {
          name
        }
      }
    }
  `;
  const ADD_BOOK = gql`
    mutation createBook(
      $title: String!
      $author: String!
      $published: Int!
      $genres: [String!]!
    ) {
      addBook(
        title: $title
        author: $author
        published: $published
        genres: $genres
      ) {
        title
        author
        published
        genres
      }
    }
  `;
  const [addBook] = useMutation(ADD_BOOK, {
    onError: (error) => {
      setErrorMessage(error.graphQLErrors[0].message);
    },
    update: (store, response) => {
      props.updateCacheWith(response.data.addBook);
    },
  });
  if (!props.show) {
    return null;
  }

  const submit = async (event) => {
    event.preventDefault();
    addBook({
      variables: { title, author, published: parseInt(published), genres },
    });
    setTitle("");
    setPublished("");
    setAuhtor("");
    setGenres([]);
    setGenre("");
  };

  const addGenre = () => {
    setGenres(genres.concat(genre));
    setGenre("");
  };

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuhtor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type="number"
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>genres: {genres.join(" ")}</div>
        <button type="submit">create book</button>
      </form>
    </div>
  );
};

export default NewBook;
