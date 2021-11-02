import React from "react";
import { useQuery, useMutation, gql } from "@apollo/client";
import BirthForm from "./setBirthyear";
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
  const EDIT_AUTHOR = gql`
    mutation editAuthor($name: String!, $born: Int!) {
      editAuthor(name: $name, born: $born) {
        name
        born
      }
    }
  `;
  const [setBirthYearMutation] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  });
  if (!props.show) {
    return null;
  }
  if (authors.loading) {
    return <div>loading...</div>;
  } else {
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
        {props.token ? (
          <BirthForm
            setBirthYearMutation={setBirthYearMutation}
            authors={authors}
          />
        ) : null}
      </div>
    );
  }
};

export default Authors;
