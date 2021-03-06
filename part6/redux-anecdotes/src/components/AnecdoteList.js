import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { voteAnecdote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";
const AnecdoteList = () => {
  const anecdotes = useSelector((state) => {
    return state.anecdotes;
  });
  const filter = useSelector((state) => {
    return state.filter;
  });
  const dispatch = useDispatch();
  const vote = (anecdote) => {
    dispatch(voteAnecdote(anecdote));
    dispatch(setNotification("You voted " + anecdote.content,3));
  };
  console.log(anecdotes);
  return (
    <>
      <h2>Anecdotes</h2>
      {anecdotes
        .filter((a) => a.content.includes(filter))
        .sort((a, b) => {
          if (a.votes > b.votes) return -1;
          else return 1;
        })
        .map((anecdote) => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote)}>
                vote
              </button>
            </div>
          </div>
        ))}
    </>
  );
};
export default AnecdoteList;
