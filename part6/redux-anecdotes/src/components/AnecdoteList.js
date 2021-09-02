import React from "react";
import { useSelector, useDispatch } from "react-redux";


const AnecdoteList = () => {
  const anecdotes = useSelector((state) => {
    return state.anecdotes;
  });
  const dispatch = useDispatch();
  const vote = (id) => {
    dispatch({
      type: "VOTE",
      id: id,
    });
    console.log(anecdotes);
  };
  return (
    <>
      <h2>Anecdotes</h2>
      {anecdotes
        .sort((a, b) => {
          if (a.votes > b.votes) return -1;
          else return 1;
        })
        .map((anecdote) => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote.id)}>vote</button>
            </div>
          </div>
        ))}
    </>
  );
};
export default AnecdoteList;
