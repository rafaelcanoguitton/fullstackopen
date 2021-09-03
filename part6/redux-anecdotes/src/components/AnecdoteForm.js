import React from "react";
import { createAnecdote, asObject } from "../reducers/anecdoteReducer";
import { useDispatch } from "react-redux";
import { setNotification } from "../reducers/notificationReducer";
import anecdoteService from "../services/anecdoteService";
const AnectodeForm = () => {
  const dispatch = useDispatch();
  const newAnec = async(event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    const anecdote = asObject(content);
    try {
      await anecdoteService.createNew(anecdote);
      dispatch(createAnecdote(anecdote));
      dispatch(setNotification("¡New anecdote created!"));
      event.target.anecdote.value = "";
    } catch (e) {
      dispatch(setNotification("there was an error on the server"));
    } finally {
      setTimeout(() => {
        setNotification("");
      }, 3000);
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
export default AnectodeForm;
