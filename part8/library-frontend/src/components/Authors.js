import React from "react";
import { useQuery, gql } from "@apollo/client";
const Authors = (props) => {
  const ALL_AUTHORS = gql`
    query {
      allAuthors {
        name
        born
        id
        bookCount
      }
    }
  `;
  const authors = useQuery(ALL_AUTHORS);
  if (!props.show) {
    return null;
  }
  if (authors.loading) {
    return <div>loading...</div>;
  } else {
    console.log(authors);
    return (
      <div>
        <h2>authors</h2>
        <table>
          <tbody>
            <tr>
              <th></th>
              <th>born</th>
              <th>books</th>
            </tr>
            {authors.data.allAuthors.map((a) => (
              <tr key={a.name}>
                <td>{a.name}</td>
                <td>{a.born}</td>
                <td>{a.bookCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
};

export default Authors;
