import React from "react";
import { useDispatch } from "react-redux";

const AnectodeForm=()=>{
    const dispatch = useDispatch();
    const newAnec = (event) => {
        event.preventDefault();
        dispatch({
          type: "NEW_ANECDOTE",
          data: event.target.anecdote.value,
        });
        event.target.anecdote.value = "";
      };
    return (<>
    <h2>create new</h2>
      <form onSubmit={newAnec}>
        <div>
          <input name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </>)
}
export default AnectodeForm;