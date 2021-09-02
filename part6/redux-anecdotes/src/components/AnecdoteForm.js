import React from "react";
import { createAnecdote } from "../reducers/anecdoteReducer";
import { useDispatch } from "react-redux";
import { setNotification } from "../reducers/notificationReducer";
const AnectodeForm = () => {
  const dispatch = useDispatch();
  const newAnec = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    dispatch(createAnecdote(content));
    dispatch(setNotification("¡New anecdote created!"));
    event.target.anecdote.value = "";
    setTimeout(() => {
      setNotification('');
    }, 3000);
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
export default AnectodeForm;
