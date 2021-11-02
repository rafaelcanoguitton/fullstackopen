import React, { useState } from "react";
import { useQuery, gql } from "@apollo/client";
const Books = (props) => {
  const [genre, setGenre] = useState("");
  const [genres, setGenres] = useState([]);
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
  const books = useQuery(ALL_BOOKS);
  props.setBooks(books.data.allBooks);
  if (!props.show) {
    return null;
  }
  if (books.loading) {
    return <div>loading...</div>;
  }
  if(genre!==""){
    const booksByGenre = books.data.allBooks.filter(book => book.genres.includes(genre));
    return (
      <div>
        <h2>books</h2>
        <table>
          <tbody>
            <tr>
              <th></th>
              <th>author</th>
              <th>published</th>
            </tr>
            {booksByGenre.map(a =>
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  }
  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.data.allBooks.map((a) => {
            setGenres(genres.concat(a.genres));
            return (
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author}</td>
                <td>{a.published}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {genres.map((g) => (
        <button onClick={() => setGenre(g)}>{g}</button>
      ))}
    </div>
  );
};

export default Books;