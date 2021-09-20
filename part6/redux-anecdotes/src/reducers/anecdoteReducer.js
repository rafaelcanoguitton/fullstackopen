import anecdoteService from "../services/anecdoteService";
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
  return async dispatch=>{
    await anecdoteService.createNew(content);
    return dispatch({type:'NEW_ANECDOTE',data:content});
  }
};
export const voteAnecdote = (anecdote) => {
  return async dispatch=>{
    const updatedAnecdote={
      ...anecdote,
      votes:anecdote.votes+1
    }
    await anecdoteService.updateAnecdote(anecdote);
    return dispatch({type:'VOTE',data:updatedAnecdote})
  }
};
export const initiateAnecdotes =()=>{
  return async dispatch=>{
    const anecdotes= await anecdoteService.getAll();
    return dispatch({type:'INIT_ANECDOTES',data:anecdotes})
  }
};
const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case "VOTE":
      const id = action.data.id;
      return state.map((a) => (a.id === id ? action.data : a));
    default:
      return state;
    case "NEW_ANECDOTE":
      return [...state, action.data];
    case "INIT_ANECDOTES":
      return action.data
  }
};

export default anecdoteReducer;
