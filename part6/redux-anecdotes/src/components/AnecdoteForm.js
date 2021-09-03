import React from "react";
import { createAnecdote, asObject } from "../reducers/anecdoteReducer";
import { connect } from "react-redux";
import { setNotification } from "../reducers/notificationReducer";
const AnectodeForm = (props) => {
  const newAnec = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    const anecdote = asObject(content);
    try {
      props.createAnecdote(anecdote);
      props.setNotification("¡New anecdote created!", 3);
      event.target.anecdote.value = "";
    } catch (e) {
      props.setNotification("there was an error on the server");
    }
  };
  return (
    <>
      <h2>create new</h2>
      <form onSubmit={newAnec}>
        <div>
          <input name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </>
  );
};
const mapDispatchToProps = {
  createAnecdote,
  asObject,
  setNotification,
};
export default connect(null, mapDispatchToProps)(AnectodeForm);
