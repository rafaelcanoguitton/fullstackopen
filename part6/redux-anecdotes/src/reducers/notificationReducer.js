export const setNotification = (content,time) => {
  return dispatch=>{
    clearTimeout();
    dispatch({type:'NEW_NOTIFICATION',data:content});
    setTimeout(() => {
      dispatch(dispatch({type:'NEW_NOTIFICATION',data:""}));
    }, time*1000);
  }
};
const notificationReducer = (state = "", action) => {
  switch (action.type) {
    case "NEW_NOTIFICATION":
      return action.data;
    default:
      return state;
  }
};
export default notificationReducer;
