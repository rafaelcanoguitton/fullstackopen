import React, { useState, useEffect } from "react";
import { useMutation, gql } from "@apollo/client";

const LoginForm = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const LOGIN = gql`
    mutation login($username: String!, $password: String!) {
      login(username: $username, password: $password) {
        value
      }
    }
  `;
  const [login, result] = useMutation(LOGIN, {
    onError: (error) => {
      console.log(error.graphQLErrors[0].message);
    },
  });
  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value;
      console.log(token);
      props.setToken(token);
      localStorage.setItem("library-user-token", token);
    }
  }, [result.data]);
  const submit = async (event) => {
    event.preventDefault();
    login({ variables: { username, password } });
  };
  if (!props.show){
    return null;
  }
  return (
    <>
      <form onSubmit={submit}>
        <div>
          <input
            type="text"
            placeholder="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </>
  );
};
export default LoginForm;