export const setU=(user) => {
  return dispatch => {
    return dispatch({ type:'SETUSER',data:user })
  }
}
const userReducer=(state=null,action) => {
  switch (action.type) {
  case 'SETUSER':
    return action.data
  default:
    return state
  }
}

export default userReducer