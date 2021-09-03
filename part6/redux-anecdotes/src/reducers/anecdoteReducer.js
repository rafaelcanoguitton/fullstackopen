const getId = () => (100000 * Math.random()).toFixed(0);
export const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  };
};

//Utils
export const createAnecdote = (content) => {
  return { type: "NEW_ANECDOTE", data: content };
};
export const voteAnecdote = (id) => {
  return { type: "VOTE", id: id };
};
export const initiateAnecdotes =(anecdotes)=>{
  return{
    type:'INIT_ANECDOTES',
    data:anecdotes,
  }
};
const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case "VOTE":
      const id = action.id;
      const anecdote = state.find((a) => a.id === id);
      const updatedAnecdote = {
        ...anecdote,
        votes: anecdote.votes + 1,
      };
      return state.map((a) => (a.id === id ? updatedAnecdote : a));
    default:
      return state;
    case "NEW_ANECDOTE":
      return [...state, action.data];
    case "INIT_ANECDOTES":
      return action.data
  }
};

export default anecdoteReducer;
