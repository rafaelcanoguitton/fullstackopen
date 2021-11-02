import React, { useState, useEffect } from "react";
import { useLazyQuery, gql } from "@apollo/client";
const Recommendations = (props) => {
  const [books, setBooks] = useState([]);
  const GET_BOOKS = gql`
    query allBooks($genre: String!) {
      allBooks(genre: $genre) {
        title
        author {
          name
        }
        published
        genres
        id
      }
    }
  `;

  useEffect(() => {
    const [getBooks, { loading, data }] = useLazyQuery(GET_BOOKS);

    if (props.show) {
      getBooks({ variables: { genre: props.genre } });
    }
    if (!loading && data) {
      setBooks(data.allBooks);
    }
  }, [props.show, props.genre]);

  if (!props.show) {
    return null;
  }
  return (
    <div>
      <h2>Recommendations</h2>
      <p>books in your favorite genre {props.recommendations}</p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => {
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
    </div>
  );
};
export default Recommendations;
